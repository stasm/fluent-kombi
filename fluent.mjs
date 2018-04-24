import {
    and,
    char,
    either,
    maybe,
    not,
    range,
    regex,
    repeat,
    repeat1,
    sequence,
    string,
} from "./parsers.mjs";

function join(values) {
    return values.join("");
}

var lineBreak =
    repeat1(
        either(
            char("\u000A"),
            char("\u000D")))
    .map(join);

var inlineSpace =
    repeat1(
        either(
            char("\u0020"),
            char("\u0009")))
    .map(join);

var blankLine =
    sequence(
        maybe(inlineSpace),
        lineBreak)
    .map(join);

var breakIndent =
    sequence(
        lineBreak,
        inlineSpace)
    .map(join);

var identifier =
    sequence(
        range("a-zA-Z"),
        repeat(
            range("a-zA-Z0-9_-")))
    .map(([first, rest]) => ({
        type: "Identifier",
        name: `${first}${join(rest)}`,
    }));

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
    .map(parsed => ({
        type: "Attribute",
        id: parsed[2],
        value: parsed[6],
    }));

var message =
    sequence(
        identifier,
        maybe(inlineSpace),
        char("="),
        maybe(inlineSpace),
        pattern,
        repeat(attribute))
    .map(parsed => ({
        type: "Message",
        id: parsed[0],
        value: parsed[4],
        attributes: parsed[5],
    }));

var commentContent =
    sequence(
        inlineSpace,
        regex(/.*/))
    .map(([space, content]) => content);

var messageCommentLine =
    sequence(
        char("#"),
        maybe(commentContent))
    .map(([sigil,  content]) => content);

var messageComment =
    sequence(
        messageCommentLine,
        repeat(
            sequence(
                lineBreak,
                messageCommentLine)))
    .map(([first, rest]) => ({
        type: "MessageComment",
        content: join([first, ...rest.map(join)])
    }));

var comment =
    either(
        messageComment,
        //groupComment,
        //resourceComment
    )

var entry =
    either(
        comment,
        // term,
        message);

var junk =
    repeat1(
        and(
            not(identifier),
            sequence(
                regex(/.*/),
                lineBreak)))
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
                    lineBreak,
                    repeat(blankLine)),
                sequence(
                    junk))),
        maybe(entry))
    .map(([_, entries, finalEntry]) => ({
        type: "Resource",
        body: finalEntry
            ? [...entries.map(entrySeq => entrySeq[0]), finalEntry]
            : entries.map(entrySeq => entrySeq[0]),
    }));
