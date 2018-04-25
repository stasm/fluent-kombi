import util from "util";
import fluent from "./grammar.mjs";

var ftl = `

# Hello
#
# There
ą=Invalid identifier
ć=Another one
foo=Value
    b
    .attr = c
### Resource Comment

x Junk1
y Junk2
# Standalone

# Another standalone
## Group
## Comment
    .attr = c`;

var ftl = `
foo=Value
    b
    .yo = c`;

fluent.run(ftl).fold(pretty, console.error);

function pretty(obj) {
    console.log(
        util.inspect(obj, {depth: null, colors: "auto"}));
}
