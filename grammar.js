module.exports = grammar({
  name: 'fluent',

  extras: $ => [],

  rules: {
    body: $ => seq(
      repeat($._blankLine),
      repeat(
        seq(
          $.entry,
          $._lineBreak,
          repeat($._blankLine)
        )
      ),
      optional($.entry)
    ),
    entry: $ => choice(
      $.message
    ),
    message: $ => prec.left(seq(
      "key",
      optional($._inlineSpace),
      "=",
      optional($._inlineSpace),
      $.pattern,
      repeat($.attribute)
    )),
    pattern: $ => prec.left(seq($._letter, repeat($._textChar))),
    attribute: $ => seq(
      $._breakIndent,
      ".",
      "attr",
      optional($._inlineSpace),
      "=",
      optional($._inlineSpace),
      $.pattern
    ),
    _textChar: $ => choice(
      $._letter,
      " ",
      seq($._breakIndent, $._letter)
    ),
    _breakIndent: $ => seq(
      $._lineBreak,
      $._inlineSpace
    ),
    _blankLine: $ => seq(
      optional($._inlineSpace),
      $._lineBreak
    ),
    _letter: $ => choice("a", "b", "c"),
    _lineBreak: $ => choice("\r", "\n", "\r\n"),
    _inlineSpace: $ => prec.left(repeat1(choice(" ", "\t")))
  }
});
