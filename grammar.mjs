import * as FTL from "./ast.mjs";
import {
    always, and, char, either, eof, maybe, not, regex, repeat, repeat1,
    sequence, string, } from "./parsers.mjs";

var lineEnd =
    either(
        string("\u000D\u000A"),
        char("\u000A"),
        char("\u000D"),
        eof());

var inlineSpace =
    repeat1(
        either(
            char("\u0020"),
            char("\u0009"))).str;

var blankLine =
    sequence(
        maybe(inlineSpace),
        lineEnd).str;

var breakIndent =
    sequence(
        lineEnd,
        repeat(blankLine).str,
        inlineSpace).str;

var otherChar =
    char("\u0021-\uD7FF\uE000-\uFFFD");

var backslash = char("\\");
var openBrace = char("{");
var doubleQuote = char("\"");

var inlineTextChar =
    either(
        inlineSpace,
        // XXX unescape?
        // regex(/\\u[0-9a-fA-F]{4}/),
        sequence(
            backslash.hidden,
            backslash).str,
        sequence(
            backslash.hidden,
            openBrace).str,
        and(
            not(backslash),
            not(openBrace),
            otherChar));

var indentedTextChar =
    sequence(
        breakIndent,
        and(
            not(char(".")),
            inlineTextChar)).str;

var text =
    repeat1(
        either(
            inlineTextChar,
            indentedTextChar)).str;

var quotedTextChar =
    either(
        and(
            not(doubleQuote),
            inlineTextChar),
        sequence(
            backslash.hidden,
            doubleQuote).str);

var quotedText =
    sequence(
        doubleQuote.hidden,
        repeat(quotedTextChar),
        doubleQuote.hidden).str

var Pattern = text;

var identifier =
    sequence(
        char("a-zA-Z"),
        repeat(
            char("a-zA-Z0-9_-")).str).str;

var Identifier =
    identifier.into(FTL.Identifier);

var TermIdentifier =
    sequence(
        char("-"),
        identifier).str
    .into(FTL.Identifier);

var Attribute =
    sequence(
        breakIndent.hidden,
        char(".").hidden,
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern)
    .spreadInto(FTL.Attribute);

var messageWithValue =
    sequence(
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern,
        repeat(Attribute),
        lineEnd.hidden)

var messageWithoutValue =
    sequence(
        Identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        always(null),
        repeat1(Attribute),
        lineEnd.hidden)

var Message =
    either(
        messageWithValue,
        messageWithoutValue)
    .spreadInto(FTL.Message);

var Term =
    sequence(
        TermIdentifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        Pattern,
        repeat(Attribute),
        lineEnd.hidden)
    .spreadInto(FTL.Term);

var commentLine =
    sequence(
        inlineSpace,
        regex(/.*/))
    .map(([space, text]) => text);

var Comment =
    repeat1(
        sequence(
            char("#").hidden,
            maybe(commentLine),
            lineEnd).str).str
    .into(FTL.Comment);

var GroupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(commentLine),
            lineEnd).str).str
    .into(FTL.GroupComment);

var ResourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(commentLine),
            lineEnd).str).str
    .into(FTL.ResourceComment);

var Entry =
    either(
        either(
            ResourceComment,
            GroupComment,
            Comment),
        Message,
        Term);

var Junk =
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
