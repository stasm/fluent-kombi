import {
    and, char, either, eof, maybe, not, range, regex, repeat, repeat1,
    sequence, string, } from "./parsers.mjs";
import {
    intoAttribute, intoComment, intoIdentifier, intoMessage, join }
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
    either(
        anyComment,
        // term,
        message);

var junk =
    repeat1(
        and(
            not(identifier),
            sequence(
                regex(/.*/),
                lineEnd)))
    .map(parsed => ({
        type: "Junk",
        content: join(parsed.map(join))
    }));

export default
    sequence(
        repeat(blankLine),
        repeat(
            either(
                sequence(
                    entry,
                    lineEnd,
                    repeat(blankLine)),
                sequence(
                    junk))))
    .map(([_, entries, finalEntry]) => ({
        type: "Resource",
        body: finalEntry
            ? [...entries.map(entrySeq => entrySeq[0]), finalEntry]
            : entries.map(entrySeq => entrySeq[0]),
    }));
