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
                if (name === "defer") {
                    let [arrow_fn] = args;
                    return cont(arrow_fn.body, state);
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
            : node.raw.replace(/"|'/g, "");
        return {type: "Terminal", value};
    }
};
