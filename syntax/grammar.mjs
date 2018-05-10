import * as FTL from "./ast.mjs";
import into from "./abstract.mjs";
import {
    after, always, and, between, char, charset, defer, either, eof, maybe, not,
    regex, repeat, repeat1, sequence, string
} from "../lib/combinators.mjs";
import {
    flatten, mutate, print, to_array, to_object, to_string
} from "../lib/util.mjs";

const line_end =
    either(
        string("\u000D\u000A"),
        char("\u000A"),
        char("\u000D"),
        eof());

const inline_space =
    repeat1(
        either(
            char("\u0020"),
            char("\u0009")))
    .map(to_string);

const blank_line =
    sequence(
        maybe(inline_space),
        line_end)
    .map(to_string);

const break_indent =
    sequence(
        line_end,
        repeat(blank_line),
        inline_space)
    .map(flatten(1))
    .map(to_string);

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
    .map(to_string);

// Any Unicode character from BMP excluding C0 control characters, space,
// surrogate blocks and non-characters (U+FFFE, U+FFFF).
// Cf. https://www.w3.org/TR/REC-xml/#NT-Char
// TODO Add characters from other planes: U+10000 to U+10FFFF.
const other_char =
    charset("\u0021-\uD7FF\uE000-\uFFFD");

const backslash = char("\\");
const quote = char("\"");

const text_char =
    either(
        inline_space,
        regex(/\\u[0-9a-fA-F]{4}/),
        after(
            backslash,
            backslash),
        after(
            backslash,
            char("{")),
        and(
            not(backslash),
            not(char("{")),
            other_char));

const text_cont =
    sequence(
        break_indent,
        and(
            not(char(".")),
            not(char("*")),
            not(char("[")),
            not(char("}"))))
    .map(to_string);

const TextElement =
    repeat1(
        either(
            text_char,
            text_cont))
    .map(to_string)
    .map(into(FTL.TextElement));

const quoted_text_char =
    either(
        and(
            not(quote),
            text_char),
        after(
            backslash,
            quote));

const quoted_text =
    between(
        quote,
        repeat(quoted_text_char))
    .map(to_string);

const identifier =
    sequence(
        charset("a-zA-Z"),
        repeat(
            charset("a-zA-Z0-9_-")))
    .map(flatten(1))
    .map(to_string);

const Identifier =
    identifier.map(into(FTL.Identifier));

const TermIdentifier =
    sequence(
        char("-"),
        identifier)
    .map(to_string)
    .map(into(FTL.Identifier));

const ExternalIdentifier =
    sequence(
        char("$"),
        identifier.as("name"))
    .map(to_object)
    .map(({name}) =>
        new FTL.Identifier(name));

const Function =
    sequence(
        charset("A-Z"),
        repeat(
            charset("A-Z_?-")))
    .map(flatten(1))
    .map(to_string)
    .map(into(FTL.Function));

const StringExpression =
    quoted_text.map(into(FTL.StringExpression));

const NumberExpression =
    number.map(into(FTL.NumberExpression));

const NamedArgument =
    sequence(
        Identifier.as("name"),
        between(
            maybe(inline_space),
            char(":")),
        either(
            StringExpression,
            NumberExpression).as("value"))
    .map(to_object)
    .map(into(FTL.NamedArgument));

const Argument = defer(() =>
    between(
        maybe(inline_space),
        either(
            NamedArgument,
            InlineExpression)));

const argument_list =
    sequence(
        Argument.as(),
        repeat(
            sequence(
                char(","),
                Argument.as())),
        maybe(char(",")))
    .map(flatten(2))
    .map(to_array);

const CallExpression =
    sequence(
        Function.as("callee"),
        char("("),
        between(
            maybe(inline_space),
            either(
                argument_list,
                always([])).as("args")),
        char(")"))
    .map(to_object)
    .map(into(FTL.CallExpression));

const MessageAttributeExpression =
    sequence(
        Identifier.as("id"),
        char("."),
        Identifier.as("name"))
    .map(to_object)
    .map(into(FTL.AttributeExpression));

const TermAttributeExpression =
    sequence(
        TermIdentifier.as("id"),
        char("."),
        Identifier.as("name"))
    .map(to_object)
    .map(into(FTL.AttributeExpression));

const TermVariantExpression = defer(() =>
    sequence(
        TermIdentifier.as("id"),
        char("["),
        VariantKey.as("key"),
        char("]"))
    .map(to_object)
    .map(into(FTL.VariantExpression)));

const InlineExpression = defer(() =>
    either(
        StringExpression,
        NumberExpression,
        CallExpression, // Must be before MessageReference
        MessageAttributeExpression,
        TermVariantExpression,
        Identifier.map(into(FTL.MessageReference)),
        TermIdentifier.map(into(FTL.MessageReference)),
        ExternalIdentifier.map(into(FTL.ExternalArgument)),
        Placeable));

const SelectorExpression =
    either(
        StringExpression,
        NumberExpression,
        CallExpression,
        TermAttributeExpression,
        ExternalIdentifier.map(into(FTL.ExternalArgument)));

const word =
    repeat1(
        and(
            not(char("[")),
            not(char("]")),
            not(char("{")),
            not(char("}")),
            not(backslash),
            other_char))
    .map(to_string);

const VariantName =
    sequence(
        word,
        repeat(
            sequence(
                inline_space,
                word)))
    .map(flatten(2))
    .map(to_string)
    .map(into(FTL.VariantName));

const VariantKey =
    either(
        // Meh. It's not really an expression.
        NumberExpression,
        VariantName);

const Variant = defer(() =>
    sequence(
        break_indent,
        char("["),
        between(
            maybe(inline_space),
            VariantKey.as("key")),
        char("]"),
        maybe(inline_space),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Variant)));

const DefaultVariant = defer(() =>
    sequence(
        break_indent,
        char("*"),
        char("["),
        between(
            maybe(inline_space),
            VariantKey.as("key")),
        char("]"),
        maybe(inline_space),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Variant))
    .map(mutate({default: true})));

const variant_list =
    sequence(
        repeat(Variant),
        DefaultVariant,
        repeat(Variant))
    .map(flatten(1));

const SelectExpression =
    sequence(
        SelectorExpression.as("selector"),
        between(
            maybe(inline_space),
            string("->")),
        variant_list.as("variants"),
        break_indent)
    .map(to_object)
    .map(into(FTL.SelectExpression));

const VariantList =
    sequence(
        always(null).as("selector"),
        variant_list.as("variants"),
        break_indent)
    .map(to_object)
    .map(into(FTL.SelectExpression));

const BlockExpression =
    either(
        SelectExpression,
        VariantList);

const Placeable =
    sequence(
        char("{"),
        between(
            maybe(inline_space),
            either(
                // Order matters!
                BlockExpression,
                InlineExpression).as("expression")),
        char("}"))
    .map(to_object)
    .map(into(FTL.Placeable));

const Pattern =
    sequence(
        // Trim leading whitespace.
        maybe(inline_space),
        maybe(text_cont),
        repeat1(
            either(
                TextElement,
                Placeable)).as("elements"))
    .map(to_object)
    .map(into(FTL.Pattern));

const Attribute =
    sequence(
        break_indent,
        char("."),
        Identifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        Pattern.as("value"))
    .map(to_object)
    .map(into(FTL.Attribute));

const Message = defer(() =>
    sequence(
        maybe(Comment).as("comment"),
        Identifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        either(
            sequence(
                Pattern.as("value"),
                repeat(Attribute).as("attributes")),
            sequence(
                always(null).as("value"),
                repeat1(Attribute).as("attributes"))),
        line_end)
    .map(flatten(1))
    .map(to_object)
    .map(into(FTL.Message)));

const Term = defer(() =>
    sequence(
        maybe(Comment).as("comment"),
        TermIdentifier.as("id"),
        between(
            maybe(inline_space),
            char("=")),
        Pattern.as("value"),
        repeat(Attribute).as("attributes"),
        line_end)
    .map(to_object)
    .map(into(FTL.Term)));

const comment_line =
    either(
        sequence(
            line_end.as()),
        sequence(
            char(" "),
            regex(/.*/).as(),
            line_end.as()))
    .map(to_array)
    .map(to_string);

const Comment =
    repeat1(
        sequence(
            char("#"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.Comment));

const GroupComment =
    repeat1(
        sequence(
            string("##"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.GroupComment));

const ResourceComment =
    repeat1(
        sequence(
            string("###"),
            comment_line.as("line")))
    .map(flatten(1))
    .map(to_array)
    .map(to_string)
    .map(into(FTL.ResourceComment));

const Junk =
    repeat1(
        and(
            not(Message),
            not(Term),
            not(ResourceComment),
            not(GroupComment),
            not(Comment),
            sequence(
                regex(/.*/),
                line_end)))
    .map(flatten(1))
    .map(to_string)
    .map(into(FTL.Junk));

const Entry =
    either(
        Message,
        Term,
        either(
            ResourceComment,
            GroupComment,
            Comment),
        Junk);


export const Resource =
    repeat(
        either(
            blank_line,
            Entry.as("entry")))
    .map(to_array)
    .map(into(FTL.Resource));
