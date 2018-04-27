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

    multiline: `
key=Value

    Continued \\{
    .title=

        Title`,

    expr: `
foo = Foo {msg} {"abc"} {-term} Bar
    {$ext} {1} {-3.14}
`,

    selexpr: `
new-messages = { BUILTIN() ->
        [0] Zero
       *[other] Other
    }
`,

    foo: "foo=FOO",

    comments: `
# Standalone Comment

# Message Comment
foo = Foo

# Another standalone
## Group Comment
### Resource Comment
`,

    junk: "ą = Żółw"
};

fluent.run(ftls.selexpr).fold(pretty, console.error);

function pretty(obj) {
    console.log(util.inspect(obj, {depth: null, colors: "auto"}));
}
