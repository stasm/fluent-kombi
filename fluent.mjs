import {
    char,
    either,
    maybe,
    repeat,
    repeat1,
    sequence,
    string,
} from "./parsers.mjs";

var lineBreak = repeat1(
    either(char("\u000A"), char("\u000D")));
var inlineSpace = repeat1(
    either(char("\u0020"), char("\u0009")));
var blankLine = sequence(
    maybe(inlineSpace), lineBreak);
var breakIndent = sequence(
    lineBreak,
    inlineSpace);

var inlineChar = either(
    char(" "),
    char("a"),
    char("b"),
    char("c"));

var text = repeat1(
    either(inlineChar, breakIndent));

var text = repeat1(
        either(
            inlineChar,
            sequence(
                breakIndent,
                inlineChar)));

var pattern = text;

var attribute = sequence(
    breakIndent,
    char("."), string("attr"),
    maybe(inlineSpace), char("="), maybe(inlineSpace),
    pattern);

var message = sequence(
    string("key"),
    maybe(inlineSpace), char("="), maybe(inlineSpace),
    pattern,
    repeat(attribute));

var entry = either(
    // comment,
    // term,
    message);

export default sequence(
    repeat(blankLine),
    repeat(
        sequence(
            entry,
            lineBreak,
            repeat(blankLine))),
    maybe(entry));
