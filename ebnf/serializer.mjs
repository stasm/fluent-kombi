export default
function serialize_rule(rule, state) {
    let {name, expression} = rule;
    let lhs = name.padEnd(state.max_name_length);
    let rhs = serialize_expression(expression, state);
    return `${lhs} ::= ${rhs}`;
}

function serialize_expression(expression, state) {
    switch (expression.type) {
        case "Symbol":
            return expression.name;
        case "Terminal":
            return expression.value;
        case "Operator":
            return serialize_operator(expression, state);
    }
}

function serialize_operator({name, args}, state) {
    let serialize = expr =>
        serialize_expression(expr, {...state, parent: name});

    switch (name) {
        case "after": {
            return args.map(serialize).join(" ");
        }
        case "always": {
            return null;
        }
        case "and": {
            let operands = args.map(serialize).reverse().join(" ");
            return state.parent ? `(${operands})` : operands;
        }
        case "between": {
            let [delim, expr] = args.map(serialize);
            return `${delim} ${expr} ${delim}`;
        }
        case "char": {
            let [arg] = args.map(serialize);
            return `"${arg}"`;
        }
        case "charset": {
            let [arg] = args.map(serialize);
            return `[${arg}]`;
        }
        case "either": {
            let operands = args.map(serialize);
            if (state.parent) {
                return `(${operands.join(" | ")})`;
            }

            // Add 5 to align with "<rule name> ::= ".
            let padding = state.max_name_length + 5;
            return operands.join("\n" + " | ".padStart(padding));
        }
        case "eof": {
            return "EOF";
        }
        case "maybe": {
            let [arg] = args.map(serialize);
            return `${arg}?`;
        }
        case "maybe": {
            let [arg] = args.map(serialize);
            return `${arg}?`;
        }
        case "never": {
            return null;
        }
        case "not": {
            let [arg] = args.map(serialize);
            return `- ${arg}`;
        }
        case "regex": {
            let [arg] = args.map(serialize);
            return `/${arg}/`;
        }
        case "repeat": {
            let [arg] = args.map(serialize);
            return `${arg}*`;
        }
        case "repeat1": {
            let [arg] = args.map(serialize);
            return `${arg}+`;
        }
        case "sequence": {
            let operands = args.map(serialize).filter(Boolean).join(" ");
            return state.parent ? `(${operands})` : operands;
        }
        case "string": {
            let [arg] = args.map(serialize);
            return `"${arg}"`;
        }
    }
}
