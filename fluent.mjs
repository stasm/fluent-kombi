import {
    char,
    either,
    maybe,
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
        string("key"),
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

var entry =
    either(
        // comment,
        // term,
        message);

export default
    sequence(
        repeat(blankLine),
        repeat(
            sequence(
                entry,
                lineBreak,
                repeat(blankLine))),
        maybe(entry))
    .map(([_, entries, finalEntry]) => ({
        type: "Resource",
        body: finalEntry
            ? [...entries.map(entrySeq => entrySeq[0]), finalEntry]
            : entries.map(entrySeq => entrySeq[0]),
    }));
