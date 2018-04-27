import * as FTL from "./ast.mjs";
import {
    always, and, char, charset, either, eof, lazy, maybe, not, regex, repeat,
    repeat1, sequence, string, } from "./parsers.mjs";
import {assign, join, flatten, print} from "./util.mjs";

const lineEnd =
    either(
        string("\u000D\u000A"),
        char("\u000A"),
        char("\u000D"),
        eof());

const inlineSpace =
    repeat1(
        either(
            char("\u0020"),
            char("\u0009")))
    .map(join);

const blankLine =
    sequence(
        maybe(inlineSpace),
        lineEnd)
    .map(join);

const breakIndent =
    sequence(
        lineEnd,
        repeat(blankLine),
        inlineSpace)
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

const otherChar =
    charset("\u0021-\uD7FF\uE000-\uFFFD");

const backslash = char("\\");
const quote = char("\"");

const textChar =
    either(
        inlineSpace,
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
            otherChar))

const textCont =
    sequence(
        breakIndent,
        and(
            not(char(".")),
            not(char("*")),
            not(char("[")),
            not(char("}"))))
    .map(join);

const TextElement =
    repeat1(
        either(
            textChar,
            textCont))
    .map(join)
    .into(FTL.TextElement);

const quotedTextChar =
    either(
        and(
            not(quote),
            textChar),
        sequence(
            backslash.hidden,
            quote).map(join));

const quotedText =
    sequence(
        quote.hidden,
        repeat(quotedTextChar),
        quote.hidden)
    .map(flatten(1))
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
    quotedText.into(FTL.StringExpression);

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
            otherChar))
    .map(join)
    .into(FTL.VariantName);

const VariantKey =
    either(
        // Meh. It's not really an expression.
        NumberExpression,
        VariantName);

const Variant =
    sequence(
        breakIndent.hidden,
        char("[").hidden,
        maybe(inlineSpace).hidden,
        VariantKey,
        maybe(inlineSpace).hidden,
        char("]").hidden,
        maybe(inlineSpace).hidden,
        lazy(() => Pattern))
    .spreadInto(FTL.Variant);

const DefaultVariant =
    sequence(
        breakIndent.hidden,
        char("*").hidden,
        char("[").hidden,
        maybe(inlineSpace).hidden,
        VariantKey,
        maybe(inlineSpace).hidden,
        char("]").hidden,
        maybe(inlineSpace).hidden,
        lazy(() => Pattern))
    .spreadInto(FTL.Variant)
    .map(assign({default: true}));

const variantList =
    sequence(
        repeat(Variant),
        DefaultVariant,
        repeat(Variant))
    .map(flatten(1));

const SelectExpression =
    sequence(
        InlineExpression,
        maybe(inlineSpace).hidden,
        string("->").hidden,
        maybe(inlineSpace).hidden,
        variantList,
        breakIndent.hidden)
    .spreadInto(FTL.SelectExpression);

const BlockExpression =
    SelectExpression;

const Placeable =
    sequence(
        char("{").hidden,
        maybe(inlineSpace).hidden,
        either(
            // Order matters!
            BlockExpression,
            InlineExpression),
        maybe(inlineSpace).hidden,
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
        breakIndent.hidden,
        char(".").hidden,
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern)
    .spreadInto(FTL.Attribute);

const messageWithValue =
    sequence(
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern,
        repeat(Attribute),
        lineEnd.hidden)

const messageWithoutValue =
    sequence(
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        always(null),
        repeat1(Attribute),
        lineEnd.hidden)

const Message =
    either(
        messageWithValue,
        messageWithoutValue)
    .spreadInto(FTL.Message);

const Term =
    sequence(
        TermIdentifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern,
        repeat(Attribute),
        lineEnd.hidden)
    .spreadInto(FTL.Term);

const commentLine =
    sequence(
        inlineSpace,
        regex(/.*/))
    .map(([space, text]) => text);

const Comment =
    repeat1(
        sequence(
            char("#").hidden,
            maybe(commentLine),
            lineEnd))
    .map(flatten(1))
    .map(join)
    .into(FTL.Comment);

const GroupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(commentLine),
            lineEnd))
    .map(flatten(1))
    .map(join)
    .into(FTL.GroupComment);

const ResourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(commentLine),
            lineEnd))
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
            not(ResourceComment),
            not(GroupComment),
            not(Comment),
            sequence(
                regex(/.*/),
                lineEnd)))
    .map(flatten(1))
    .map(join)
    .into(FTL.Junk);

export default
    repeat(
        either(
            blankLine.hidden,
            Entry,
            Junk))
    .spreadInto(Array)
    .into(FTL.Resource);
