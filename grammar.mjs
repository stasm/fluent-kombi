import {
    and, char, either, eof, maybe, not, range, regex, repeat, repeat1,
    sequence, string, } from "./parsers.mjs";
import {
    intoAttribute, intoComment, intoGroupComment, intoIdentifier, intoJunk,
    intoMessage, intoResource, intoResourceComment }
    from "./process.mjs";

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
    range("\u0021-\uD7FF\uE000-\uFFFD");

var inlineChar =
    either(
        inlineSpace,
        otherChar);

var indentedChar = 
    sequence(
        breakIndent,
        and(
            not(char(".")),
            inlineChar)).str;

var text =
    repeat1(
        either(
            inlineChar,
            indentedChar)).str;

var pattern = text;

var identifier =
    sequence(
        range("a-zA-Z"),
        repeat(
            range("a-zA-Z0-9_-")).str).str
    .map(intoIdentifier);

var attribute =
    sequence(
        breakIndent.hidden,
        char(".").hidden,
        identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        pattern)
    .map(intoAttribute);

var message =
    sequence(
        identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        pattern,
        repeat(attribute),
        lineEnd.hidden)
    .map(intoMessage);

var anyCommentLine =
    sequence(
        inlineSpace,
        regex(/.*/))
    .map(([space, text]) => text);

var comment =
    repeat1(
        sequence(
            char("#").hidden,
            maybe(anyCommentLine),
            lineEnd).str).str
    .map(intoComment);

var groupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(anyCommentLine),
            lineEnd).str).str
    .map(intoGroupComment);

var resourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(anyCommentLine),
            lineEnd).str).str
    .map(intoResourceComment);

var entry =
    either(
        either(
            resourceComment,
            groupComment,
            comment),
        message);

var junk =
    repeat1(
        and(
            not(message),
            not(resourceComment),
            not(groupComment),
            not(comment),
            sequence(
                regex(/.*/),
                lineEnd).str)).str
    .map(intoJunk);

export default
    repeat(
        either(
            blankLine.hidden,
            entry,
            junk))
    .map(intoResource);
