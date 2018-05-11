export default {
    Program(node, state, cont) {
        return node.body
            .map(statement => cont(statement, state))
            .filter(production => production !== undefined);
    },
    ExportNamedDeclaration(node, state, cont) {
        return cont(node.declaration, state);
    },
    VariableDeclaration(node, state, cont) {
        let [declaration] = node.declarations;
        return cont(declaration, state);
    },
    VariableDeclarator(node, state, cont) {
        let {id: {name}, init} = node;
        let expression = cont(init, state);
        return {type: "Rule", name, expression};
    },
    CallExpression(node, state, cont) {
        let {callee, arguments: args} = node;
        switch (callee.type) {
            case "MemberExpression":
                return cont(callee.object, state);
            case "Identifier": {
                let {name} = callee;
                // defer(() => parser) is used to avoid cyclic dependencies.
                if (name === "defer") {
                    let [arrow_fn] = args;
                    return cont(arrow_fn.body, state);
                }

                // Don't recurse into always() and never(). They don't parse
                // the input and are only used for convenient AST building.
                if (name === "always" || name === "never") {
                    return {type: "Operator", name, args: []};
                }

                return {
                    type: "Operator",
                    name,
                    args: args.map(arg => cont(arg, state)),
                };
            }
        }
    },
    Identifier(node, state, cont) {
        let {name} = node;
        return {type: "Symbol", name};
    },
    Literal(node, state, cont) {
        let value = node.regex
            ? node.regex.pattern
            : escape(node.value);
        return {type: "Terminal", value};
    }
};

function escape(str) {
    return str
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        // Replace all Control and non-Basic Latin characters.
        .replace(/([^\u0021-\u007E])/g, unicode_sequence);
}

function unicode_sequence(char) {
    let code_point = char.codePointAt(0).toString(16);
    return `\\u${code_point.toUpperCase().padStart(4, "0")}`;
}
