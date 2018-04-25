import util from "util";
import fluent from "./grammar.mjs";

var ftl = `

# Hello
#
# There
ą=Invalid identifier
ź=Another one
foo=b
    b
    .attr = c
### Resource Comment

# Standalone

# Another standalone
## Group
## Comment
    .attr = c`;

fluent.run(ftl).fold(pretty, console.error);

function pretty(obj) {
    console.log(
        util.inspect(obj, {depth: null, colors: "auto"}));
}
