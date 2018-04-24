#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 8
#define STATE_COUNT 81
#define SYMBOL_COUNT 29
#define ALIAS_COUNT 0
#define TOKEN_COUNT 13
#define EXTERNAL_TOKEN_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 0

enum {
  anon_sym_key = 1,
  anon_sym_EQ = 2,
  anon_sym_DOT = 3,
  anon_sym_attr = 4,
  anon_sym_1 = 5,
  anon_sym_a = 6,
  anon_sym_b = 7,
  anon_sym_c = 8,
  anon_sym_CR = 9,
  anon_sym_LF = 10,
  anon_sym_CR_LF = 11,
  anon_sym_TAB = 12,
  sym_body = 13,
  sym_entry = 14,
  sym_message = 15,
  sym_pattern = 16,
  sym_attribute = 17,
  sym__textChar = 18,
  sym__breakIndent = 19,
  sym__blankLine = 20,
  sym__letter = 21,
  sym__lineBreak = 22,
  sym__inlineSpace = 23,
  aux_sym_body_repeat1 = 24,
  aux_sym_body_repeat2 = 25,
  aux_sym_message_repeat1 = 26,
  aux_sym_pattern_repeat1 = 27,
  aux_sym__inlineSpace_repeat1 = 28,
};

static const char *ts_symbol_names[] = {
  [ts_builtin_sym_end] = "END",
  [anon_sym_key] = "key",
  [anon_sym_EQ] = "=",
  [anon_sym_DOT] = ".",
  [anon_sym_attr] = "attr",
  [anon_sym_1] = " ",
  [anon_sym_a] = "a",
  [anon_sym_b] = "b",
  [anon_sym_c] = "c",
  [anon_sym_CR] = "\r",
  [anon_sym_LF] = "\n",
  [anon_sym_CR_LF] = "\r\n",
  [anon_sym_TAB] = "	",
  [sym_body] = "body",
  [sym_entry] = "entry",
  [sym_message] = "message",
  [sym_pattern] = "pattern",
  [sym_attribute] = "attribute",
  [sym__textChar] = "_textChar",
  [sym__breakIndent] = "_breakIndent",
  [sym__blankLine] = "_blankLine",
  [sym__letter] = "_letter",
  [sym__lineBreak] = "_lineBreak",
  [sym__inlineSpace] = "_inlineSpace",
  [aux_sym_body_repeat1] = "body_repeat1",
  [aux_sym_body_repeat2] = "body_repeat2",
  [aux_sym_message_repeat1] = "message_repeat1",
  [aux_sym_pattern_repeat1] = "pattern_repeat1",
  [aux_sym__inlineSpace_repeat1] = "_inlineSpace_repeat1",
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_key] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_attr] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_1] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_a] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_b] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_c] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CR] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LF] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CR_LF] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_TAB] = {
    .visible = true,
    .named = false,
  },
  [sym_body] = {
    .visible = true,
    .named = true,
  },
  [sym_entry] = {
    .visible = true,
    .named = true,
  },
  [sym_message] = {
    .visible = true,
    .named = true,
  },
  [sym_pattern] = {
    .visible = true,
    .named = true,
  },
  [sym_attribute] = {
    .visible = true,
    .named = true,
  },
  [sym__textChar] = {
    .visible = false,
    .named = true,
  },
  [sym__breakIndent] = {
    .visible = false,
    .named = true,
  },
  [sym__blankLine] = {
    .visible = false,
    .named = true,
  },
  [sym__letter] = {
    .visible = false,
    .named = true,
  },
  [sym__lineBreak] = {
    .visible = false,
    .named = true,
  },
  [sym__inlineSpace] = {
    .visible = false,
    .named = true,
  },
  [aux_sym_body_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_body_repeat2] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_message_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_pattern_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__inlineSpace_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  switch (state) {
    case 0:
      if (lookahead == 0)
        ADVANCE(1);
      if (lookahead == '\t')
        ADVANCE(2);
      if (lookahead == '\n')
        ADVANCE(3);
      if (lookahead == '\r')
        ADVANCE(4);
      if (lookahead == ' ')
        ADVANCE(6);
      if (lookahead == '.')
        ADVANCE(7);
      if (lookahead == '=')
        ADVANCE(8);
      if (lookahead == 'a')
        ADVANCE(9);
      if (lookahead == 'b')
        ADVANCE(13);
      if (lookahead == 'c')
        ADVANCE(14);
      if (lookahead == 'k')
        ADVANCE(15);
      END_STATE();
    case 1:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 2:
      ACCEPT_TOKEN(anon_sym_TAB);
      END_STATE();
    case 3:
      ACCEPT_TOKEN(anon_sym_LF);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(anon_sym_CR);
      if (lookahead == '\n')
        ADVANCE(5);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(anon_sym_CR_LF);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_1);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_a);
      if (lookahead == 't')
        ADVANCE(10);
      END_STATE();
    case 10:
      if (lookahead == 't')
        ADVANCE(11);
      END_STATE();
    case 11:
      if (lookahead == 'r')
        ADVANCE(12);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_attr);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_b);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_c);
      END_STATE();
    case 15:
      if (lookahead == 'e')
        ADVANCE(16);
      END_STATE();
    case 16:
      if (lookahead == 'y')
        ADVANCE(17);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_key);
      END_STATE();
    default:
      return false;
  }
}

static TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 0},
  [31] = {.lex_state = 0},
  [32] = {.lex_state = 0},
  [33] = {.lex_state = 0},
  [34] = {.lex_state = 0},
  [35] = {.lex_state = 0},
  [36] = {.lex_state = 0},
  [37] = {.lex_state = 0},
  [38] = {.lex_state = 0},
  [39] = {.lex_state = 0},
  [40] = {.lex_state = 0},
  [41] = {.lex_state = 0},
  [42] = {.lex_state = 0},
  [43] = {.lex_state = 0},
  [44] = {.lex_state = 0},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 0},
  [47] = {.lex_state = 0},
  [48] = {.lex_state = 0},
  [49] = {.lex_state = 0},
  [50] = {.lex_state = 0},
  [51] = {.lex_state = 0},
  [52] = {.lex_state = 0},
  [53] = {.lex_state = 0},
  [54] = {.lex_state = 0},
  [55] = {.lex_state = 0},
  [56] = {.lex_state = 0},
  [57] = {.lex_state = 0},
  [58] = {.lex_state = 0},
  [59] = {.lex_state = 0},
  [60] = {.lex_state = 0},
  [61] = {.lex_state = 0},
  [62] = {.lex_state = 0},
  [63] = {.lex_state = 0},
  [64] = {.lex_state = 0},
  [65] = {.lex_state = 0},
  [66] = {.lex_state = 0},
  [67] = {.lex_state = 0},
  [68] = {.lex_state = 0},
  [69] = {.lex_state = 0},
  [70] = {.lex_state = 0},
  [71] = {.lex_state = 0},
  [72] = {.lex_state = 0},
  [73] = {.lex_state = 0},
  [74] = {.lex_state = 0},
  [75] = {.lex_state = 0},
  [76] = {.lex_state = 0},
  [77] = {.lex_state = 0},
  [78] = {.lex_state = 0},
  [79] = {.lex_state = 0},
  [80] = {.lex_state = 0},
};

static uint16_t ts_parse_table[STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_key] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [anon_sym_attr] = ACTIONS(1),
    [anon_sym_1] = ACTIONS(1),
    [anon_sym_a] = ACTIONS(3),
    [anon_sym_b] = ACTIONS(1),
    [anon_sym_c] = ACTIONS(1),
    [anon_sym_CR] = ACTIONS(3),
    [anon_sym_LF] = ACTIONS(1),
    [anon_sym_CR_LF] = ACTIONS(1),
    [anon_sym_TAB] = ACTIONS(1),
  },
  [1] = {
    [sym_body] = STATE(3),
    [sym_entry] = STATE(4),
    [sym_message] = STATE(5),
    [sym__blankLine] = STATE(7),
    [sym__lineBreak] = STATE(7),
    [sym__inlineSpace] = STATE(6),
    [aux_sym_body_repeat1] = STATE(7),
    [aux_sym_body_repeat2] = STATE(8),
    [aux_sym__inlineSpace_repeat1] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(5),
    [anon_sym_key] = ACTIONS(7),
    [anon_sym_1] = ACTIONS(9),
    [anon_sym_CR] = ACTIONS(11),
    [anon_sym_LF] = ACTIONS(13),
    [anon_sym_CR_LF] = ACTIONS(13),
    [anon_sym_TAB] = ACTIONS(9),
  },
  [2] = {
    [sym__inlineSpace] = STATE(11),
    [aux_sym__inlineSpace_repeat1] = STATE(12),
    [anon_sym_EQ] = ACTIONS(15),
    [anon_sym_1] = ACTIONS(17),
    [anon_sym_TAB] = ACTIONS(17),
  },
  [3] = {
    [ts_builtin_sym_end] = ACTIONS(19),
  },
  [4] = {
    [sym__lineBreak] = STATE(13),
    [ts_builtin_sym_end] = ACTIONS(21),
    [anon_sym_CR] = ACTIONS(23),
    [anon_sym_LF] = ACTIONS(25),
    [anon_sym_CR_LF] = ACTIONS(25),
  },
  [5] = {
    [ts_builtin_sym_end] = ACTIONS(27),
    [anon_sym_CR] = ACTIONS(29),
    [anon_sym_LF] = ACTIONS(27),
    [anon_sym_CR_LF] = ACTIONS(27),
  },
  [6] = {
    [sym__lineBreak] = STATE(14),
    [anon_sym_CR] = ACTIONS(31),
    [anon_sym_LF] = ACTIONS(33),
    [anon_sym_CR_LF] = ACTIONS(33),
  },
  [7] = {
    [sym_entry] = STATE(15),
    [sym_message] = STATE(5),
    [sym__blankLine] = STATE(16),
    [sym__lineBreak] = STATE(16),
    [sym__inlineSpace] = STATE(6),
    [aux_sym_body_repeat1] = STATE(16),
    [aux_sym_body_repeat2] = STATE(17),
    [aux_sym__inlineSpace_repeat1] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(21),
    [anon_sym_key] = ACTIONS(7),
    [anon_sym_1] = ACTIONS(9),
    [anon_sym_CR] = ACTIONS(35),
    [anon_sym_LF] = ACTIONS(37),
    [anon_sym_CR_LF] = ACTIONS(37),
    [anon_sym_TAB] = ACTIONS(9),
  },
  [8] = {
    [sym_entry] = STATE(15),
    [sym_message] = STATE(5),
    [aux_sym_body_repeat2] = STATE(18),
    [ts_builtin_sym_end] = ACTIONS(21),
    [anon_sym_key] = ACTIONS(7),
  },
  [9] = {
    [aux_sym__inlineSpace_repeat1] = STATE(19),
    [anon_sym_1] = ACTIONS(39),
    [anon_sym_CR] = ACTIONS(41),
    [anon_sym_LF] = ACTIONS(43),
    [anon_sym_CR_LF] = ACTIONS(43),
    [anon_sym_TAB] = ACTIONS(39),
  },
  [10] = {
    [sym_pattern] = STATE(20),
    [sym__letter] = STATE(21),
    [sym__inlineSpace] = STATE(22),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [11] = {
    [anon_sym_EQ] = ACTIONS(49),
  },
  [12] = {
    [aux_sym__inlineSpace_repeat1] = STATE(25),
    [anon_sym_EQ] = ACTIONS(43),
    [anon_sym_1] = ACTIONS(51),
    [anon_sym_TAB] = ACTIONS(51),
  },
  [13] = {
    [sym__blankLine] = STATE(26),
    [sym__lineBreak] = STATE(26),
    [sym__inlineSpace] = STATE(6),
    [aux_sym_body_repeat1] = STATE(26),
    [aux_sym__inlineSpace_repeat1] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(53),
    [anon_sym_key] = ACTIONS(53),
    [anon_sym_1] = ACTIONS(9),
    [anon_sym_CR] = ACTIONS(55),
    [anon_sym_LF] = ACTIONS(57),
    [anon_sym_CR_LF] = ACTIONS(57),
    [anon_sym_TAB] = ACTIONS(9),
  },
  [14] = {
    [ts_builtin_sym_end] = ACTIONS(59),
    [anon_sym_key] = ACTIONS(59),
    [anon_sym_1] = ACTIONS(59),
    [anon_sym_CR] = ACTIONS(61),
    [anon_sym_LF] = ACTIONS(59),
    [anon_sym_CR_LF] = ACTIONS(59),
    [anon_sym_TAB] = ACTIONS(59),
  },
  [15] = {
    [sym__lineBreak] = STATE(13),
    [ts_builtin_sym_end] = ACTIONS(63),
    [anon_sym_CR] = ACTIONS(23),
    [anon_sym_LF] = ACTIONS(25),
    [anon_sym_CR_LF] = ACTIONS(25),
  },
  [16] = {
    [sym__blankLine] = STATE(16),
    [sym__lineBreak] = STATE(16),
    [sym__inlineSpace] = STATE(6),
    [aux_sym_body_repeat1] = STATE(16),
    [aux_sym__inlineSpace_repeat1] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(65),
    [anon_sym_key] = ACTIONS(65),
    [anon_sym_1] = ACTIONS(67),
    [anon_sym_CR] = ACTIONS(70),
    [anon_sym_LF] = ACTIONS(73),
    [anon_sym_CR_LF] = ACTIONS(73),
    [anon_sym_TAB] = ACTIONS(67),
  },
  [17] = {
    [sym_entry] = STATE(27),
    [sym_message] = STATE(5),
    [aux_sym_body_repeat2] = STATE(18),
    [ts_builtin_sym_end] = ACTIONS(63),
    [anon_sym_key] = ACTIONS(7),
  },
  [18] = {
    [sym_entry] = STATE(29),
    [sym_message] = STATE(5),
    [aux_sym_body_repeat2] = STATE(18),
    [ts_builtin_sym_end] = ACTIONS(53),
    [anon_sym_key] = ACTIONS(76),
  },
  [19] = {
    [aux_sym__inlineSpace_repeat1] = STATE(19),
    [anon_sym_1] = ACTIONS(79),
    [anon_sym_CR] = ACTIONS(82),
    [anon_sym_LF] = ACTIONS(84),
    [anon_sym_CR_LF] = ACTIONS(84),
    [anon_sym_TAB] = ACTIONS(79),
  },
  [20] = {
    [sym_attribute] = STATE(32),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(32),
    [ts_builtin_sym_end] = ACTIONS(86),
    [anon_sym_CR] = ACTIONS(88),
    [anon_sym_LF] = ACTIONS(86),
    [anon_sym_CR_LF] = ACTIONS(86),
  },
  [21] = {
    [sym__textChar] = STATE(35),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(35),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(35),
    [ts_builtin_sym_end] = ACTIONS(90),
    [anon_sym_1] = ACTIONS(92),
    [anon_sym_a] = ACTIONS(92),
    [anon_sym_b] = ACTIONS(92),
    [anon_sym_c] = ACTIONS(92),
    [anon_sym_CR] = ACTIONS(94),
    [anon_sym_LF] = ACTIONS(90),
    [anon_sym_CR_LF] = ACTIONS(90),
  },
  [22] = {
    [sym_pattern] = STATE(36),
    [sym__letter] = STATE(21),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
  },
  [23] = {
    [aux_sym__inlineSpace_repeat1] = STATE(37),
    [anon_sym_1] = ACTIONS(96),
    [anon_sym_a] = ACTIONS(43),
    [anon_sym_b] = ACTIONS(43),
    [anon_sym_c] = ACTIONS(43),
    [anon_sym_TAB] = ACTIONS(96),
  },
  [24] = {
    [sym_pattern] = STATE(36),
    [sym__letter] = STATE(21),
    [sym__inlineSpace] = STATE(38),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [25] = {
    [aux_sym__inlineSpace_repeat1] = STATE(25),
    [anon_sym_EQ] = ACTIONS(84),
    [anon_sym_1] = ACTIONS(98),
    [anon_sym_TAB] = ACTIONS(98),
  },
  [26] = {
    [sym__blankLine] = STATE(16),
    [sym__lineBreak] = STATE(16),
    [sym__inlineSpace] = STATE(6),
    [aux_sym_body_repeat1] = STATE(16),
    [aux_sym__inlineSpace_repeat1] = STATE(9),
    [ts_builtin_sym_end] = ACTIONS(101),
    [anon_sym_key] = ACTIONS(101),
    [anon_sym_1] = ACTIONS(9),
    [anon_sym_CR] = ACTIONS(35),
    [anon_sym_LF] = ACTIONS(37),
    [anon_sym_CR_LF] = ACTIONS(37),
    [anon_sym_TAB] = ACTIONS(9),
  },
  [27] = {
    [sym__lineBreak] = STATE(13),
    [ts_builtin_sym_end] = ACTIONS(103),
    [anon_sym_CR] = ACTIONS(23),
    [anon_sym_LF] = ACTIONS(25),
    [anon_sym_CR_LF] = ACTIONS(25),
  },
  [28] = {
    [sym__inlineSpace] = STATE(40),
    [aux_sym__inlineSpace_repeat1] = STATE(12),
    [anon_sym_EQ] = ACTIONS(105),
    [anon_sym_1] = ACTIONS(17),
    [anon_sym_TAB] = ACTIONS(17),
  },
  [29] = {
    [sym__lineBreak] = STATE(13),
    [anon_sym_CR] = ACTIONS(23),
    [anon_sym_LF] = ACTIONS(25),
    [anon_sym_CR_LF] = ACTIONS(25),
  },
  [30] = {
    [anon_sym_DOT] = ACTIONS(107),
  },
  [31] = {
    [sym__inlineSpace] = STATE(42),
    [aux_sym__inlineSpace_repeat1] = STATE(43),
    [anon_sym_1] = ACTIONS(109),
    [anon_sym_TAB] = ACTIONS(109),
  },
  [32] = {
    [sym_attribute] = STATE(44),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(44),
    [ts_builtin_sym_end] = ACTIONS(111),
    [anon_sym_CR] = ACTIONS(113),
    [anon_sym_LF] = ACTIONS(111),
    [anon_sym_CR_LF] = ACTIONS(111),
  },
  [33] = {
    [sym__letter] = STATE(45),
    [anon_sym_a] = ACTIONS(115),
    [anon_sym_b] = ACTIONS(115),
    [anon_sym_c] = ACTIONS(115),
  },
  [34] = {
    [sym__inlineSpace] = STATE(42),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [35] = {
    [sym__textChar] = STATE(46),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(46),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(46),
    [ts_builtin_sym_end] = ACTIONS(117),
    [anon_sym_1] = ACTIONS(119),
    [anon_sym_a] = ACTIONS(119),
    [anon_sym_b] = ACTIONS(119),
    [anon_sym_c] = ACTIONS(119),
    [anon_sym_CR] = ACTIONS(121),
    [anon_sym_LF] = ACTIONS(117),
    [anon_sym_CR_LF] = ACTIONS(117),
  },
  [36] = {
    [sym_attribute] = STATE(47),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(47),
    [ts_builtin_sym_end] = ACTIONS(111),
    [anon_sym_CR] = ACTIONS(113),
    [anon_sym_LF] = ACTIONS(111),
    [anon_sym_CR_LF] = ACTIONS(111),
  },
  [37] = {
    [aux_sym__inlineSpace_repeat1] = STATE(37),
    [anon_sym_1] = ACTIONS(123),
    [anon_sym_a] = ACTIONS(84),
    [anon_sym_b] = ACTIONS(84),
    [anon_sym_c] = ACTIONS(84),
    [anon_sym_TAB] = ACTIONS(123),
  },
  [38] = {
    [sym_pattern] = STATE(48),
    [sym__letter] = STATE(21),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
  },
  [39] = {
    [sym_pattern] = STATE(49),
    [sym__letter] = STATE(50),
    [sym__inlineSpace] = STATE(51),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [40] = {
    [anon_sym_EQ] = ACTIONS(128),
  },
  [41] = {
    [anon_sym_attr] = ACTIONS(130),
  },
  [42] = {
    [anon_sym_DOT] = ACTIONS(132),
    [anon_sym_a] = ACTIONS(132),
    [anon_sym_b] = ACTIONS(132),
    [anon_sym_c] = ACTIONS(132),
  },
  [43] = {
    [aux_sym__inlineSpace_repeat1] = STATE(54),
    [anon_sym_DOT] = ACTIONS(43),
    [anon_sym_1] = ACTIONS(134),
    [anon_sym_TAB] = ACTIONS(134),
  },
  [44] = {
    [sym_attribute] = STATE(44),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(44),
    [ts_builtin_sym_end] = ACTIONS(136),
    [anon_sym_CR] = ACTIONS(138),
    [anon_sym_LF] = ACTIONS(141),
    [anon_sym_CR_LF] = ACTIONS(141),
  },
  [45] = {
    [ts_builtin_sym_end] = ACTIONS(144),
    [anon_sym_1] = ACTIONS(144),
    [anon_sym_a] = ACTIONS(144),
    [anon_sym_b] = ACTIONS(144),
    [anon_sym_c] = ACTIONS(144),
    [anon_sym_CR] = ACTIONS(146),
    [anon_sym_LF] = ACTIONS(144),
    [anon_sym_CR_LF] = ACTIONS(144),
  },
  [46] = {
    [sym__textChar] = STATE(46),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(46),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(46),
    [ts_builtin_sym_end] = ACTIONS(148),
    [anon_sym_1] = ACTIONS(150),
    [anon_sym_a] = ACTIONS(150),
    [anon_sym_b] = ACTIONS(150),
    [anon_sym_c] = ACTIONS(150),
    [anon_sym_CR] = ACTIONS(153),
    [anon_sym_LF] = ACTIONS(156),
    [anon_sym_CR_LF] = ACTIONS(156),
  },
  [47] = {
    [sym_attribute] = STATE(44),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(44),
    [ts_builtin_sym_end] = ACTIONS(159),
    [anon_sym_CR] = ACTIONS(161),
    [anon_sym_LF] = ACTIONS(159),
    [anon_sym_CR_LF] = ACTIONS(159),
  },
  [48] = {
    [sym_attribute] = STATE(55),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(55),
    [ts_builtin_sym_end] = ACTIONS(159),
    [anon_sym_CR] = ACTIONS(161),
    [anon_sym_LF] = ACTIONS(159),
    [anon_sym_CR_LF] = ACTIONS(159),
  },
  [49] = {
    [sym_attribute] = STATE(57),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(57),
    [anon_sym_CR] = ACTIONS(88),
    [anon_sym_LF] = ACTIONS(86),
    [anon_sym_CR_LF] = ACTIONS(86),
  },
  [50] = {
    [sym__textChar] = STATE(58),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(58),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(58),
    [anon_sym_1] = ACTIONS(163),
    [anon_sym_a] = ACTIONS(163),
    [anon_sym_b] = ACTIONS(163),
    [anon_sym_c] = ACTIONS(163),
    [anon_sym_CR] = ACTIONS(94),
    [anon_sym_LF] = ACTIONS(90),
    [anon_sym_CR_LF] = ACTIONS(90),
  },
  [51] = {
    [sym_pattern] = STATE(59),
    [sym__letter] = STATE(50),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
  },
  [52] = {
    [sym_pattern] = STATE(59),
    [sym__letter] = STATE(50),
    [sym__inlineSpace] = STATE(60),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [53] = {
    [sym__inlineSpace] = STATE(62),
    [aux_sym__inlineSpace_repeat1] = STATE(12),
    [anon_sym_EQ] = ACTIONS(165),
    [anon_sym_1] = ACTIONS(17),
    [anon_sym_TAB] = ACTIONS(17),
  },
  [54] = {
    [aux_sym__inlineSpace_repeat1] = STATE(54),
    [anon_sym_DOT] = ACTIONS(84),
    [anon_sym_1] = ACTIONS(167),
    [anon_sym_TAB] = ACTIONS(167),
  },
  [55] = {
    [sym_attribute] = STATE(44),
    [sym__breakIndent] = STATE(30),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(44),
    [ts_builtin_sym_end] = ACTIONS(170),
    [anon_sym_CR] = ACTIONS(172),
    [anon_sym_LF] = ACTIONS(170),
    [anon_sym_CR_LF] = ACTIONS(170),
  },
  [56] = {
    [anon_sym_DOT] = ACTIONS(174),
  },
  [57] = {
    [sym_attribute] = STATE(64),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(64),
    [anon_sym_CR] = ACTIONS(113),
    [anon_sym_LF] = ACTIONS(111),
    [anon_sym_CR_LF] = ACTIONS(111),
  },
  [58] = {
    [sym__textChar] = STATE(65),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(65),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(65),
    [anon_sym_1] = ACTIONS(176),
    [anon_sym_a] = ACTIONS(176),
    [anon_sym_b] = ACTIONS(176),
    [anon_sym_c] = ACTIONS(176),
    [anon_sym_CR] = ACTIONS(121),
    [anon_sym_LF] = ACTIONS(117),
    [anon_sym_CR_LF] = ACTIONS(117),
  },
  [59] = {
    [sym_attribute] = STATE(66),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(66),
    [anon_sym_CR] = ACTIONS(113),
    [anon_sym_LF] = ACTIONS(111),
    [anon_sym_CR_LF] = ACTIONS(111),
  },
  [60] = {
    [sym_pattern] = STATE(67),
    [sym__letter] = STATE(50),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
  },
  [61] = {
    [sym_pattern] = STATE(68),
    [sym__letter] = STATE(21),
    [sym__inlineSpace] = STATE(69),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [62] = {
    [anon_sym_EQ] = ACTIONS(178),
  },
  [63] = {
    [anon_sym_attr] = ACTIONS(180),
  },
  [64] = {
    [sym_attribute] = STATE(64),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(64),
    [anon_sym_CR] = ACTIONS(138),
    [anon_sym_LF] = ACTIONS(141),
    [anon_sym_CR_LF] = ACTIONS(141),
  },
  [65] = {
    [sym__textChar] = STATE(65),
    [sym__breakIndent] = STATE(33),
    [sym__letter] = STATE(65),
    [sym__lineBreak] = STATE(34),
    [aux_sym_pattern_repeat1] = STATE(65),
    [anon_sym_1] = ACTIONS(182),
    [anon_sym_a] = ACTIONS(182),
    [anon_sym_b] = ACTIONS(182),
    [anon_sym_c] = ACTIONS(182),
    [anon_sym_CR] = ACTIONS(153),
    [anon_sym_LF] = ACTIONS(156),
    [anon_sym_CR_LF] = ACTIONS(156),
  },
  [66] = {
    [sym_attribute] = STATE(64),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(64),
    [anon_sym_CR] = ACTIONS(161),
    [anon_sym_LF] = ACTIONS(159),
    [anon_sym_CR_LF] = ACTIONS(159),
  },
  [67] = {
    [sym_attribute] = STATE(72),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(72),
    [anon_sym_CR] = ACTIONS(161),
    [anon_sym_LF] = ACTIONS(159),
    [anon_sym_CR_LF] = ACTIONS(159),
  },
  [68] = {
    [ts_builtin_sym_end] = ACTIONS(185),
    [anon_sym_CR] = ACTIONS(187),
    [anon_sym_LF] = ACTIONS(185),
    [anon_sym_CR_LF] = ACTIONS(185),
  },
  [69] = {
    [sym_pattern] = STATE(73),
    [sym__letter] = STATE(21),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
  },
  [70] = {
    [sym_pattern] = STATE(73),
    [sym__letter] = STATE(21),
    [sym__inlineSpace] = STATE(74),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [71] = {
    [sym__inlineSpace] = STATE(76),
    [aux_sym__inlineSpace_repeat1] = STATE(12),
    [anon_sym_EQ] = ACTIONS(189),
    [anon_sym_1] = ACTIONS(17),
    [anon_sym_TAB] = ACTIONS(17),
  },
  [72] = {
    [sym_attribute] = STATE(64),
    [sym__breakIndent] = STATE(56),
    [sym__lineBreak] = STATE(31),
    [aux_sym_message_repeat1] = STATE(64),
    [anon_sym_CR] = ACTIONS(172),
    [anon_sym_LF] = ACTIONS(170),
    [anon_sym_CR_LF] = ACTIONS(170),
  },
  [73] = {
    [ts_builtin_sym_end] = ACTIONS(191),
    [anon_sym_CR] = ACTIONS(193),
    [anon_sym_LF] = ACTIONS(191),
    [anon_sym_CR_LF] = ACTIONS(191),
  },
  [74] = {
    [sym_pattern] = STATE(77),
    [sym__letter] = STATE(21),
    [anon_sym_a] = ACTIONS(47),
    [anon_sym_b] = ACTIONS(47),
    [anon_sym_c] = ACTIONS(47),
  },
  [75] = {
    [sym_pattern] = STATE(68),
    [sym__letter] = STATE(50),
    [sym__inlineSpace] = STATE(78),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [76] = {
    [anon_sym_EQ] = ACTIONS(195),
  },
  [77] = {
    [ts_builtin_sym_end] = ACTIONS(197),
    [anon_sym_CR] = ACTIONS(199),
    [anon_sym_LF] = ACTIONS(197),
    [anon_sym_CR_LF] = ACTIONS(197),
  },
  [78] = {
    [sym_pattern] = STATE(73),
    [sym__letter] = STATE(50),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
  },
  [79] = {
    [sym_pattern] = STATE(73),
    [sym__letter] = STATE(50),
    [sym__inlineSpace] = STATE(80),
    [aux_sym__inlineSpace_repeat1] = STATE(23),
    [anon_sym_1] = ACTIONS(45),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
    [anon_sym_TAB] = ACTIONS(45),
  },
  [80] = {
    [sym_pattern] = STATE(77),
    [sym__letter] = STATE(50),
    [anon_sym_a] = ACTIONS(126),
    [anon_sym_b] = ACTIONS(126),
    [anon_sym_c] = ACTIONS(126),
  },
};

static TSParseActionEntry ts_parse_actions[] = {
  [0] = {.count = 0, .reusable = false},
  [1] = {.count = 1, .reusable = true}, RECOVER(),
  [3] = {.count = 1, .reusable = false}, RECOVER(),
  [5] = {.count = 1, .reusable = true}, REDUCE(sym_body, 0),
  [7] = {.count = 1, .reusable = true}, SHIFT(2),
  [9] = {.count = 1, .reusable = true}, SHIFT(9),
  [11] = {.count = 1, .reusable = false}, SHIFT(7),
  [13] = {.count = 1, .reusable = true}, SHIFT(7),
  [15] = {.count = 1, .reusable = true}, SHIFT(10),
  [17] = {.count = 1, .reusable = true}, SHIFT(12),
  [19] = {.count = 1, .reusable = true}, ACCEPT_INPUT(),
  [21] = {.count = 1, .reusable = true}, REDUCE(sym_body, 1),
  [23] = {.count = 1, .reusable = false}, SHIFT(13),
  [25] = {.count = 1, .reusable = true}, SHIFT(13),
  [27] = {.count = 1, .reusable = true}, REDUCE(sym_entry, 1),
  [29] = {.count = 1, .reusable = false}, REDUCE(sym_entry, 1),
  [31] = {.count = 1, .reusable = false}, SHIFT(14),
  [33] = {.count = 1, .reusable = true}, SHIFT(14),
  [35] = {.count = 1, .reusable = false}, SHIFT(16),
  [37] = {.count = 1, .reusable = true}, SHIFT(16),
  [39] = {.count = 1, .reusable = true}, SHIFT(19),
  [41] = {.count = 1, .reusable = false}, REDUCE(sym__inlineSpace, 1),
  [43] = {.count = 1, .reusable = true}, REDUCE(sym__inlineSpace, 1),
  [45] = {.count = 1, .reusable = true}, SHIFT(23),
  [47] = {.count = 1, .reusable = true}, SHIFT(21),
  [49] = {.count = 1, .reusable = true}, SHIFT(24),
  [51] = {.count = 1, .reusable = true}, SHIFT(25),
  [53] = {.count = 1, .reusable = true}, REDUCE(aux_sym_body_repeat2, 2),
  [55] = {.count = 1, .reusable = false}, SHIFT(26),
  [57] = {.count = 1, .reusable = true}, SHIFT(26),
  [59] = {.count = 1, .reusable = true}, REDUCE(sym__blankLine, 2),
  [61] = {.count = 1, .reusable = false}, REDUCE(sym__blankLine, 2),
  [63] = {.count = 1, .reusable = true}, REDUCE(sym_body, 2),
  [65] = {.count = 1, .reusable = true}, REDUCE(aux_sym_body_repeat1, 2),
  [67] = {.count = 2, .reusable = true}, REDUCE(aux_sym_body_repeat1, 2), SHIFT_REPEAT(9),
  [70] = {.count = 2, .reusable = false}, REDUCE(aux_sym_body_repeat1, 2), SHIFT_REPEAT(16),
  [73] = {.count = 2, .reusable = true}, REDUCE(aux_sym_body_repeat1, 2), SHIFT_REPEAT(16),
  [76] = {.count = 2, .reusable = true}, REDUCE(aux_sym_body_repeat2, 2), SHIFT_REPEAT(28),
  [79] = {.count = 2, .reusable = true}, REDUCE(aux_sym__inlineSpace_repeat1, 2), SHIFT_REPEAT(19),
  [82] = {.count = 1, .reusable = false}, REDUCE(aux_sym__inlineSpace_repeat1, 2),
  [84] = {.count = 1, .reusable = true}, REDUCE(aux_sym__inlineSpace_repeat1, 2),
  [86] = {.count = 1, .reusable = true}, REDUCE(sym_message, 3),
  [88] = {.count = 1, .reusable = false}, REDUCE(sym_message, 3),
  [90] = {.count = 1, .reusable = true}, REDUCE(sym_pattern, 1),
  [92] = {.count = 1, .reusable = true}, SHIFT(35),
  [94] = {.count = 1, .reusable = false}, REDUCE(sym_pattern, 1),
  [96] = {.count = 1, .reusable = true}, SHIFT(37),
  [98] = {.count = 2, .reusable = true}, REDUCE(aux_sym__inlineSpace_repeat1, 2), SHIFT_REPEAT(25),
  [101] = {.count = 1, .reusable = true}, REDUCE(aux_sym_body_repeat2, 3),
  [103] = {.count = 1, .reusable = true}, REDUCE(sym_body, 3),
  [105] = {.count = 1, .reusable = true}, SHIFT(39),
  [107] = {.count = 1, .reusable = true}, SHIFT(41),
  [109] = {.count = 1, .reusable = true}, SHIFT(43),
  [111] = {.count = 1, .reusable = true}, REDUCE(sym_message, 4),
  [113] = {.count = 1, .reusable = false}, REDUCE(sym_message, 4),
  [115] = {.count = 1, .reusable = true}, SHIFT(45),
  [117] = {.count = 1, .reusable = true}, REDUCE(sym_pattern, 2),
  [119] = {.count = 1, .reusable = true}, SHIFT(46),
  [121] = {.count = 1, .reusable = false}, REDUCE(sym_pattern, 2),
  [123] = {.count = 2, .reusable = true}, REDUCE(aux_sym__inlineSpace_repeat1, 2), SHIFT_REPEAT(37),
  [126] = {.count = 1, .reusable = true}, SHIFT(50),
  [128] = {.count = 1, .reusable = true}, SHIFT(52),
  [130] = {.count = 1, .reusable = true}, SHIFT(53),
  [132] = {.count = 1, .reusable = true}, REDUCE(sym__breakIndent, 2),
  [134] = {.count = 1, .reusable = true}, SHIFT(54),
  [136] = {.count = 1, .reusable = true}, REDUCE(aux_sym_message_repeat1, 2),
  [138] = {.count = 2, .reusable = false}, REDUCE(aux_sym_message_repeat1, 2), SHIFT_REPEAT(31),
  [141] = {.count = 2, .reusable = true}, REDUCE(aux_sym_message_repeat1, 2), SHIFT_REPEAT(31),
  [144] = {.count = 1, .reusable = true}, REDUCE(sym__textChar, 2),
  [146] = {.count = 1, .reusable = false}, REDUCE(sym__textChar, 2),
  [148] = {.count = 1, .reusable = true}, REDUCE(aux_sym_pattern_repeat1, 2),
  [150] = {.count = 2, .reusable = true}, REDUCE(aux_sym_pattern_repeat1, 2), SHIFT_REPEAT(46),
  [153] = {.count = 2, .reusable = false}, REDUCE(aux_sym_pattern_repeat1, 2), SHIFT_REPEAT(34),
  [156] = {.count = 2, .reusable = true}, REDUCE(aux_sym_pattern_repeat1, 2), SHIFT_REPEAT(34),
  [159] = {.count = 1, .reusable = true}, REDUCE(sym_message, 5),
  [161] = {.count = 1, .reusable = false}, REDUCE(sym_message, 5),
  [163] = {.count = 1, .reusable = true}, SHIFT(58),
  [165] = {.count = 1, .reusable = true}, SHIFT(61),
  [167] = {.count = 2, .reusable = true}, REDUCE(aux_sym__inlineSpace_repeat1, 2), SHIFT_REPEAT(54),
  [170] = {.count = 1, .reusable = true}, REDUCE(sym_message, 6),
  [172] = {.count = 1, .reusable = false}, REDUCE(sym_message, 6),
  [174] = {.count = 1, .reusable = true}, SHIFT(63),
  [176] = {.count = 1, .reusable = true}, SHIFT(65),
  [178] = {.count = 1, .reusable = true}, SHIFT(70),
  [180] = {.count = 1, .reusable = true}, SHIFT(71),
  [182] = {.count = 2, .reusable = true}, REDUCE(aux_sym_pattern_repeat1, 2), SHIFT_REPEAT(65),
  [185] = {.count = 1, .reusable = true}, REDUCE(sym_attribute, 5),
  [187] = {.count = 1, .reusable = false}, REDUCE(sym_attribute, 5),
  [189] = {.count = 1, .reusable = true}, SHIFT(75),
  [191] = {.count = 1, .reusable = true}, REDUCE(sym_attribute, 6),
  [193] = {.count = 1, .reusable = false}, REDUCE(sym_attribute, 6),
  [195] = {.count = 1, .reusable = true}, SHIFT(79),
  [197] = {.count = 1, .reusable = true}, REDUCE(sym_attribute, 7),
  [199] = {.count = 1, .reusable = false}, REDUCE(sym_attribute, 7),
};

#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_fluent() {
  static TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .symbol_metadata = ts_symbol_metadata,
    .parse_table = (const unsigned short *)ts_parse_table,
    .parse_actions = ts_parse_actions,
    .lex_modes = ts_lex_modes,
    .symbol_names = ts_symbol_names,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .lex_fn = ts_lex,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
  };
  return &language;
}
