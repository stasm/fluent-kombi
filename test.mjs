import util from "util";
import fluent from "./";

const ftls = {
    test: `
bar =
    .placeholder = ąćęłńóśźż
ą=Invalid identifier
ć=Another one
-brand-name = Aurora
    .gender = feminine
### Resource Comment

    .attr = c
`,

    // Escape backslashes twice: once for JS, once for Fluent.
    multiline: `
key=Value with \\\\ (an escaped backslash)

    Continued \\{
    .title=

        Title`,

    expr: `
foo = Foo {msg} {"abc"} {-term} Bar
    {$ext} {1} {-3.14} {-term[case]}
`,

    selexpr: `
new-messages = { BUILTIN() ->
        [0] Zero
       *[other] {""}Other
    }
`,

    foo: "foo=FOO",

    comments: `
# Standalone Comment

# Message Comment
foo = Foo

# Another standalone
#
#      with indent
## Group Comment
### Resource Comment
`,

    junk: "ą = Żółw",
    brand: `
# License Comment

-brand-name = Aurora
`
};

fluent.run(ftls.selexpr).fold(pretty, console.error);

function pretty(obj) {
    console.log(util.inspect(obj, {depth: null, colors: "auto"}));
}
