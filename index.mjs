import util from "util";
import fluent from "./fluent.mjs";

const ftl = `

ą=ź
foo=b
    b

    .attr = c


`;

fluent.run(ftl).fold(pretty, console.error);

function pretty(obj) {
    console.log(
        util.inspect(obj, {depth: null, colors: "auto"}));
}
