import * as FTL from "./ast.mjs";
import {
    always, and, char, charset, either, eof, lazy, maybe, not, regex, repeat,
    repeat1, sequence, string, } from "./parsers.mjs";

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
            char("\u0009"))).str;

const blankLine =
    sequence(
        maybe(inlineSpace),
        lineEnd).str;

const breakIndent =
    sequence(
        lineEnd,
        repeat(blankLine).str,
        inlineSpace).str;

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
            backslash).str,
        sequence(
            backslash.hidden,
            char("{")).str,
        and(
            not(backslash),
            not(char("{")),
            otherChar));

const textCont =
    sequence(
        breakIndent,
        and(
            not(char(".")),
            not(char("*")),
            not(char("[")),
            not(char("}")))).str;

const TextElement =
    repeat1(
        either(
            textChar,
            textCont)).str
    .into(FTL.TextElement);

const quotedTextChar =
    either(
        and(
            not(quote),
            textChar),
        sequence(
            backslash.hidden,
            quote).str);

const quotedText =
    sequence(
        quote.hidden,
        repeat(quotedTextChar).str,
        quote.hidden).str

const identifier =
    sequence(
        charset("a-zA-Z"),
        repeat(
            charset("a-zA-Z0-9_-")).str).str;

const Identifier =
    identifier.into(FTL.Identifier);

const TermIdentifier =
    sequence(
        char("-"),
        identifier).str
    .into(FTL.Identifier);

const ExternalIdentifier =
    sequence(
        char("$").hidden,
        identifier).str
    .into(FTL.Identifier);

const InlineExpression =
    either(
        quotedText.into(FTL.StringExpression),
        Identifier.into(FTL.MessageReference),
        TermIdentifier.into(FTL.MessageReference),
        ExternalIdentifier.into(FTL.ExternalArgument));

const Variant =
    sequence(
        breakIndent.hidden,
        char("[").hidden,
        maybe(inlineSpace).hidden,
        repeat1(
            charset("a-z")).str,
        maybe(inlineSpace).hidden,
        char("]").hidden,
        maybe(inlineSpace).hidden,
        lazy(() => Pattern))
    .spreadInto(FTL.Variant);

// XXX Require one default variant.
const variantList =
    repeat1(
        Variant);

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
            lineEnd).str).str
    .into(FTL.Comment);

const GroupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(commentLine),
            lineEnd).str).str
    .into(FTL.GroupComment);

const ResourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(commentLine),
            lineEnd).str).str
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
                lineEnd).str)).str
    .into(FTL.Junk);

export default
    repeat(
        either(
            blankLine.hidden,
            Entry,
            Junk))
    .spreadInto(Array)
    .into(FTL.Resource);
