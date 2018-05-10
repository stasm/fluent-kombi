string-expression = {"abc"}
number-expression = {123}
number-expression = {-3.14}

message-reference = {msg}
term-reference = {-term}
variable-reference = {$var}

variant-expression = {-term[case]}
attribute-expression = {msg.attr}

nested-placeable = {{{1}}}

call-expression ={FUN("a", msg, x: "X", y: 1)}
call-expression ={FUN(  "a"  , msg,   x: "X",   )}
call-expression ={FUN(  )}

## Invalid syntax
variant-expression = {msg[case]}
attribute-expression = {-term.attr}
