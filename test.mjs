import util from "util";
import fluent from "./";

var ftl = `

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

key=Value

    Continued
    .title=

        Title`;

fluent.run(ftl).fold(pretty, console.error);

function pretty(obj) {
    console.log(util.inspect(obj, {depth: null, colors: "auto"}));
}
