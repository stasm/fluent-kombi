module.exports = grammar({
  name: 'fluent',

  extras: $ => [],

  rules: {
    body: $ => seq(
      repeat($.blankLine),
      repeat(
        seq(
          $.entry,
          $.lineBreak,
          repeat($.blankLine)
        )
      ),
      optional($.entry)
    ),
    entry: $ => choice(
      $.message
    ),
    message: $ => seq(
      "key",
      optional($.inlineSpace),
      "=",
      optional($.inlineSpace),
      $.pattern,
      repeat($.attribute)
    ),
    pattern: $ => $.text,
    attribute: $ => seq(
      $.breakIndent,
      ".",
      "attr",
      optional($.inlineSpace),
      "=",
      optional($.inlineSpace),
      $.pattern
    ),
    text: $ => repeat1(
      choice(
        $.inlineChar,
        seq($.breakIndent, $.inlineChar)
      )
    ),
    breakIndent: $ => seq(
      $.lineBreak,
      $.inlineSpace
    ),
    blankLine: $ => seq(
      optional($.inlineSpace),
      $.lineBreak
    ),
    inlineChar: $ => choice(" ", "a", "b", "c"),
    lineBreak: $ => choice("\r", "\n", "\r\n"),
    inlineSpace: $ => repeat1(choice(" ", "\t"))
  }
});
