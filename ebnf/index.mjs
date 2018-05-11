import acorn from "acorn";
import walk from "./walker.mjs";
import visitor from "./visitor.mjs";
import serialize from "./serializer.mjs";

export default
function ebnf(source) {
    let grammar_ast = acorn.parse(source, {sourceType: "module"});
    let productions = walk(grammar_ast, visitor);
    return productions.map(serialize).join("\n");
}

