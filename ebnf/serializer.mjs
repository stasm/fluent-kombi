export default
function serialize_rule(rule) {
    let {name, expression} = rule;
    return `${name} ::= ${serialize_expression(expression)}`;
}

function serialize_expression(expression) {
    switch (expression.type) {
        case "Symbol":
            return expression.name;
        case "Terminal":
            return expression.value;
        case "Operator":
            return serialize_operator(expression);
    }
}

function serialize_operator({name, args}) {
    let serialize = serialize_expression;
    switch (name) {
        case "after": {
            return args.map(serialize).join(" ");
        }
        case "always": {
            return "";
        }
        case "and": {
            let operands = args.map(serialize).reverse().join(" ");
            return `(${operands})`;
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
            let operands = args.map(serialize).join(" | ");
            return `(${operands})`;
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
            return "";
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
            return args.map(serialize).join(" ");
        }
        case "string": {
            let [arg] = args.map(serialize);
            return `"${arg}"`;
        }
    }
}
