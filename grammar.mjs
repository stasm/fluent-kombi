import * as FTL from "./ast.mjs";
import {
    and, char, either, eof, maybe, not, range, regex, repeat, repeat1,
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
    .into(FTL.Identifier);

var attribute =
    sequence(
        breakIndent.hidden,
        char(".").hidden,
        identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        pattern)
    .spreadInto(FTL.Attribute);

var message =
    sequence(
        identifier,
        maybe(inlineSpace).hidden,
        char("=").hidden,
        maybe(inlineSpace).hidden,
        pattern,
        repeat(attribute),
        lineEnd.hidden)
    .spreadInto(FTL.Message);

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
    .into(FTL.Comment);

var groupComment =
    repeat1(
        sequence(
            string("##").hidden,
            maybe(anyCommentLine),
            lineEnd).str).str
    .into(FTL.GroupComment);

var resourceComment =
    repeat1(
        sequence(
            string("###").hidden,
            maybe(anyCommentLine),
            lineEnd).str).str
    .into(FTL.ResourceComment);

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
    .into(FTL.Junk);

export default
    repeat(
        either(
            blankLine.hidden,
            entry,
            junk))
    .into(FTL.Resource);
