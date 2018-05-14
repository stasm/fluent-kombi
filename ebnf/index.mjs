import acorn from "acorn";
import walk from "./walker.mjs";
import visitor from "./visitor.mjs";
import serialize from "./serializer.mjs";

export default
function ebnf(source) {
    let grammar_ast = acorn.parse(source, {sourceType: "module"});
    let rules = walk(grammar_ast, visitor);
    let state = {
        max_name_length: Math.max(
            ...rules.map(rule => rule.name.length)),
    };
    return rules
        .reverse()
        .map(rule => serialize(rule, state))
        .join("\n");
}

