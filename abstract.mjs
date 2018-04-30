import * as FTL from "./ast.mjs";

export default function into(ctor) {
    switch (ctor) {
        case FTL.Attribute:
            return ({id, value}) =>
                new ctor(id, value);
        case FTL.CallExpression:
            return ({callee}) =>
                new ctor(callee);
        case FTL.Message:
            return ({id, value = null, attributes}) =>
                new ctor(id, value, attributes);
        case FTL.Placeable:
            return ({expression}) =>
                new ctor(expression);
        case FTL.Resource:
            return body =>
                new ctor(body);
        case FTL.SelectExpression:
            return ({selector, variants}) =>
                new ctor(selector, variants);
        case FTL.Term:
            return ({id, value, attributes}) =>
                new ctor(id, value, attributes);
        case FTL.Variant:
            return ({key, value}) =>
                new ctor(key, value);
        default:
            return (...args) => new ctor(...args);
    }
}
