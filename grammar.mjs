import * as FTL from "./ast.mjs";
import {
    after, always, and, between, char, charset, either, eof, maybe, not, regex,
    repeat, repeat1, sequence, string } from "./combinators.mjs";
import {flatten, mutate, print, to_array, to_object, to_string} from "./util.mjs";
import into from "./abstract.mjs";

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
    .map(to_string);

const blank_line =
    sequence(
        maybe(inline_space),
        line_end)
    .map(to_string);

const break_indent =
    sequence(
        line_end,
        repeat(blank_line),
        inline_space)
    .map(flatten(1))
    .map(to_string)

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
    .map(to_string)

const other_char =
    charset("\u0021-\uD7FF\uE000-\uFFFD");

const backslash = char("\\");
const quote = char("\"");

const text_char =
    either(
        inline_space,
        // XXX unescape?
        // regex(/\\u[0-9a-fA-F]{4}/),
        after(
            backslash,
            backslash),
        after(
            backslash,
            char("{")),
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
    .map(to_string);

const TextElement =
    repeat1(
        either(
            text_char,
            text_cont))
    .map(to_string)
    .map(into(FTL.TextElement));

const quoted_text_char =
    either(
        and(
            not(quote),
            text_char),
        after(
            backslash,
            quote));

const quoted_text =
    between(
        quote,
        repeat(quoted_text_char))
    .map(to_string)

const identifier =
    sequence(
        charset("a-zA-Z"),
        repeat(
            charset("a-zA-Z0-9_-")))
    .map(flatten(1))
    .map(to_string)

const Identifier =
    identifier.map(into(FTL.Identifier));

const TermIdentifier =
    sequence(
        char("-"),
        identifier)
    .map(to_string)
    .map(into(FTL.Identifier));

const ExternalIdentifier =
    sequence(
        char("$"),
        identifier.as("name"))
    .map(to_object)
    .map(({name}) =>
        new FTL.Identifier(name));

const Function =
    sequence(
        charset("A-Z"),
        repeat(
            charset("A-Z_?-")))
    .map(flatten(1))
    .map(to_string)
    .map(into(FTL.Function));

const StringExpression =
    quoted_text.map(into(FTL.StringExpression));

const NumberExpression =
    number.map(into(FTL.NumberExpression));

const CallExpression =
    sequence(
        Function.as("callee"),
        char("("),
        // TODO Add arguments.
        char(")"))
    .map(to_object)
    .map(into(FTL.CallExpression));

const VariantExpression = () =>
    sequence(
        TermIdentifier.map(into(FTL.MessageReference)).as("ref"),
        char("["),
        VariantKey.as("key"),
        char("]"))
    .map(to_object)
    .map(into(FTL.VariantExpression));

const InlineExpression =
    either(
        StringExpression,
        NumberExpression,
        CallExpression, // Must be before MessageReference
        VariantExpression,
        Identifier.map(into(FTL.MessageReference)),
        TermIdentifier.map(into(FTL.MessageReference)),
        ExternalIdentifier.map(into(FTL.ExternalArgument)));

const VariantName =
    repeat(
        and(
            not(char("]")),
            other_char))
    .map(to_string)
    .map(into(FTL.VariantName));

const VariantKey =
    either(
        // Meh. It's not really an expression.
        NumberExpression,
        VariantName);

const Variant = () =>
    sequence(
        break_indent,
        char("["),
        between(
            maybe(inline_space),
            VariantKey.as("key")),
        char("]"),
        maybe(inline_space),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Variant));

const DefaultVariant = () =>
    sequence(
        break_indent,
        char("*"),
        char("["),
        between(
            maybe(inline_space),
            VariantKey.as("key")),
        char("]"),
        maybe(inline_space),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Variant))
    .map(mutate({default: true}));

const variant_list =
    sequence(
        repeat(Variant),
        DefaultVariant,
        repeat(Variant))
    .map(flatten(1));

const SelectExpression =
    sequence(
        InlineExpression.as("selector"),
        between(
            maybe(inline_space),
            string("->")),
        variant_list.as("variants"),
        break_indent)
    .map(to_object)
    .map(into(FTL.SelectExpression));

const BlockExpression =
    SelectExpression;

const Placeable =
    sequence(
        char("{"),
        between(
            maybe(inline_space),
            either(
                // Order matters!
                BlockExpression,
                InlineExpression).as("expression")),
        char("}"))
    .map(to_object)
    .map(into(FTL.Placeable));

const Pattern =
    repeat1(
        either(
            TextElement,
            Placeable))
    .map(into(FTL.Pattern));

const Attribute =
    sequence(
        break_indent,
        char("."),
        Identifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Attribute));

const Message =
    sequence(
        Identifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        either(
            sequence(
                Pattern.as("value"),
                repeat(Attribute).as("attributes")),
            repeat1(Attribute).as("attributes")),
        line_end)
    .map(flatten(1))
    .map(to_object)
    .map(into(FTL.Message));

const Term =
    sequence(
        TermIdentifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        Pattern.as("value"),
        repeat(Attribute).as("attributes"),
        line_end)
    .map(to_object)
    .map(into(FTL.Term));

const comment_line =
    either(
        sequence(
            line_end.as()),
        sequence(
            char(" "),
            regex(/.*/).as(),
            line_end.as()))
    .map(to_array)
    .map(to_string);

const Comment =
    repeat1(
        sequence(
            char("#"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.Comment));

const GroupComment =
    repeat1(
        sequence(
            string("##"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.GroupComment));

const ResourceComment =
    repeat1(
        sequence(
            string("###"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.ResourceComment));

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
    .map(to_string)
    .map(into(FTL.Junk));

export const Resource =
    repeat(
        either(
            blank_line,
            Entry.as("entry"),
            Junk.as("junk")))
    .map(to_array)
    .map(into(FTL.Resource));
