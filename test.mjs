import util from "util";
import fluent from "./";

const ftls = {
    test: `


# Hello
#
# There
ą=Invalid identifier
ć=Another one
bar =
    .placeholder = ąćęłńóśźż
-brand-name = Aurora
    .gender = feminine
### Resource Comment

x Junk1
y Junk2
# Standalone

# Another standalone
## Group
## Comment
    .attr = c
foo = Foo

key=Value

    Continued \\{
    .title=

        Title`,
    expr: `
foo = Foo {msg} {"abc"} {-term} Bar
    {$ext}
`
};

fluent.run(ftls.expr).fold(pretty, console.error);

function pretty(obj) {
    console.log(util.inspect(obj, {depth: null, colors: "auto"}));
}
