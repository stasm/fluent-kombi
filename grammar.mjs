import * as FTL from "./ast.mjs";
import {
    always, and, between, char, charset, either, eof, maybe, not, regex,
    repeat, repeat1, sequence, string } from "./parsers.mjs";
import {assign, join, flatten, print} from "./util.mjs";

const line_end =
    either(
        string("\u000D\u000A"),
        char("\u000A"),
        char("\u000D"),
        eof());

const inline_space =
    repeat1(
        either(
            char("\u0020"),
            char("\u0009")))
    .map(join);

const blank_line =
    sequence(
        maybe(inline_space),
        line_end)
    .map(join);

const break_indent =
    sequence(
        line_end,
        repeat(blank_line),
        inline_space)
    .map(flatten(1))
    .map(join)

const digit = charset("0-9");

const number =
    sequence(
        maybe(char("-")),
        repeat1(digit),
        maybe(
            sequence(
                char("."),
                repeat1(digit))))
    .map(flatten(2))
    .map(join)

const other_char =
    charset("\u0021-\uD7FF\uE000-\uFFFD");

const backslash = char("\\");
const quote = char("\"");

const text_char =
    either(
        inline_space,
        // XXX unescape?
        // regex(/\\u[0-9a-fA-F]{4}/),
        sequence(
            backslash.hidden,
            backslash).map(join),
        sequence(
            backslash.hidden,
            char("{")).map(join),
        and(
            not(backslash),
            not(char("{")),
            other_char))

const text_cont =
    sequence(
        break_indent,
        and(
            not(char(".")),
            not(char("*")),
            not(char("[")),
            not(char("}"))))
    .map(join);

const TextElement =
    repeat1(
        either(
            text_char,
            text_cont))
    .map(join)
    .into(FTL.TextElement);

const quoted_text_char =
    either(
        and(
            not(quote),
            text_char),
        sequence(
            backslash.hidden,
            quote).map(join));

const quoted_text =
    between(
        quote,
        repeat(quoted_text_char))
    .map(join)

const identifier =
    sequence(
        charset("a-zA-Z"),
        repeat(
            charset("a-zA-Z0-9_-")))
    .map(flatten(1))
    .map(join)

const Identifier =
    identifier.into(FTL.Identifier);

const TermIdentifier =
    sequence(
        char("-"),
        identifier)
    .map(join)
    .into(FTL.Identifier);

const ExternalIdentifier =
    sequence(
        char("$").hidden,
        identifier)
    .map(join)
    .into(FTL.Identifier);

const Function =
    sequence(
        charset("A-Z"),
        repeat(
            charset("A-Z_?-")))
    .map(flatten(1))
    .map(join)
    .into(FTL.Function);

const StringExpression =
    quoted_text.into(FTL.StringExpression);

const NumberExpression =
    number.into(FTL.NumberExpression);

const CallExpression =
    sequence(
        Function,
        char("(").hidden,
        // XXX Add arguments.
        char(")").hidden)
    .spreadInto(FTL.CallExpression);

const InlineExpression =
    either(
        StringExpression,
        NumberExpression,
        CallExpression, // Must be before MessageReference
        Identifier.into(FTL.MessageReference),
        TermIdentifier.into(FTL.MessageReference),
        ExternalIdentifier.into(FTL.ExternalArgument));

const VariantName =
    repeat(
        and(
            not(char("]")),
            other_char))
    .map(join)
    .into(FTL.VariantName);

const VariantKey =
    either(
        // Meh. It's not really an expression.
        NumberExpression,
        VariantName);

const Variant = () =>
    sequence(
        break_indent.hidden,
        char("[").hidden,
        between(
            maybe(inline_space),
            VariantKey),
        char("]").hidden,
        maybe(inline_space).hidden,
        Pattern)
    .spreadInto(FTL.Variant);

const DefaultVariant = () =>
    sequence(
        break_indent.hidden,
        char("*").hidden,
        char("[").hidden,
        between(
            maybe(inline_space),
            VariantKey),
        char("]").hidden,
        maybe(inline_space).hidden,
        Pattern)
    .spreadInto(FTL.Variant)
    .map(assign({default: true}));

const variant_list =
    sequence(
        repeat(Variant),
        DefaultVariant,
        repeat(Variant))
    .map(flatten(1));

const SelectExpression =
    sequence(
        InlineExpression,
        between(
            maybe(inline_space),
            string("->").hidden),
        variant_list,
        break_indent.hidden)
    .spreadInto(FTL.SelectExpression);

const BlockExpression =
    SelectExpression;

const Placeable =
    sequence(
        char("{").hidden,
        between(
            maybe(inline_space),
            either(
                // Order matters!
                BlockExpression,
                InlineExpression)),
        char("}").hidden)
    .spreadInto(FTL.Placeable);

const Pattern =
    repeat1(
        either(
            TextElement,
            Placeable))
    .into(FTL.Pattern);

const Attribute =
    sequence(
        break_indent.hidden,
        char(".").hidden,
        Identifier,
        between(
            maybe(inline_space),
            char("=").hidden),
        Pattern)
    .spreadInto(FTL.Attribute);

const Message =
    sequence(
        Identifier,
        between(
            maybe(inline_space),
            char("=").hidden),
        either(
            sequence(
                Pattern,
                repeat(Attribute)),
            sequence(
                always(null),
                repeat1(Attribute))),
        line_end.hidden)
    .map(flatten(1))
    .spreadInto(FTL.Message);

const Term =
    sequence(
        TermIdentifier,
        between(
            maybe(inline_space),
            char("=").hidden),
        Pattern,
        repeat(Attribute),
        line_end.hidden)
    .spreadInto(FTL.Term);

const comment_line =
    sequence(
        char(" "),
        regex(/.*/))
    .map(([space, text]) => text);

const Comment =
    repeat1(
        sequence(
            char("#").hidden,
            maybe(comment_line),
            line_end))
    .map(flatten(1))
    .map(join)
    .into(FTL.Comment);

const GroupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(comment_line),
            line_end))
    .map(flatten(1))
    .map(join)
    .into(FTL.GroupComment);

const ResourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(comment_line),
            line_end))
    .map(flatten(1))
    .map(join)
    .into(FTL.ResourceComment);

const Entry =
    either(
        either(
            ResourceComment,
            GroupComment,
            Comment),
        Message,
        Term);

const Junk =
    repeat1(
        and(
            not(Message),
            not(Term),
            not(ResourceComment),
            not(GroupComment),
            not(Comment),
            sequence(
                regex(/.*/),
                line_end)))
    .map(flatten(1))
    .map(join)
    .into(FTL.Junk);

export const Resource =
    repeat(
        either(
            blank_line.hidden,
            Entry,
            Junk))
    .spreadInto(Array)
    .into(FTL.Resource);
