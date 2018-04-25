import {
    and, char, either, eof, maybe, not, range, regex, repeat, repeat1,
    sequence, string, } from "./parsers.mjs";
import {
    intoAttribute, intoComment, intoIdentifier, intoJunk, intoMessage,
    intoResource, join } from "./process.mjs";

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
            char("\u0009")))
    .map(join);

var blankLine =
    sequence(
        maybe(inlineSpace),
        lineEnd)
    .map(join);

var breakIndent =
    sequence(
        lineEnd,
        inlineSpace)
    .map(join);

var identifier =
    sequence(
        range("a-zA-Z"),
        repeat(
            range("a-zA-Z0-9_-")))
    .map(intoIdentifier);

var inlineChar =
    either(
        char(" "),
        char("a"),
        char("b"),
        char("c"));

var indentedChar = 
    sequence(
        breakIndent,
        inlineChar)
    .map(join)

var text =
    repeat1(
        either(
            inlineChar,
            indentedChar))
    .map(join);

var pattern = text;

var attribute =
    sequence(
        breakIndent,
        char("."),
        string("attr"),
        maybe(inlineSpace),
        char("="),
        maybe(inlineSpace),
        pattern)
    .map(intoAttribute);

var message =
    sequence(
        identifier,
        maybe(inlineSpace),
        char("="),
        maybe(inlineSpace),
        pattern,
        repeat(attribute))
    .map(intoMessage);

var anyCommentContent =
    sequence(
        inlineSpace,
        regex(/.*/))
    .map(([space, content]) => content);

var commentLine =
    sequence(
        char("#"),
        maybe(anyCommentContent))
    .map(([sigil,  content]) => content);

var comment =
    sequence(
        commentLine,
        repeat(
            sequence(
                lineEnd,
                commentLine)))
    .map(intoComment);

var anyComment =
    either(
        comment,
        //groupComment,
        //resourceComment
    )

var entry =
    sequence(
        either(
            anyComment,
            // term,
            message),
        lineEnd)
    .map(seq => seq[0]);

var junk =
    repeat1(
        and(
            not(identifier),
            sequence(
                regex(/.*/),
                lineEnd)))
    .map(intoJunk);

export default
    repeat(
        either(
            blankLine,
            entry,
            junk))
    .map(intoResource);
