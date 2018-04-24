import util from "util";
import fluent from "./fluent.mjs";

const ftl = `

key= a
     c
   .attr = b
     c

key= b

`;

fluent.run(ftl).fold(pretty, console.error);

function pretty(obj) {
    console.log(
        util.inspect(obj, {depth: null, colors: "auto"}));
}
