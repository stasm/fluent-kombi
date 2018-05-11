import acorn from "acorn";
import walk from "./walker.mjs";
import visitor from "./visitor.mjs";
import serialize from "./serializer.mjs";

export default
function ebnf(source) {
    let grammar_ast = acorn.parse(source, {sourceType: "module"});
    let rules = walk(grammar_ast, visitor);
    let state = {
        max_rule_name: Math.max(
            ...rules.map(rule => rule.name.length)),
    };
    return rules
        .map(rule => serialize(rule, state))
        .join("\n");
}

