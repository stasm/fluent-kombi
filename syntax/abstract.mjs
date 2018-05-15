import * as FTL from "./ast.mjs";

export default function into(ctor) {
    switch (ctor) {
        case FTL.Attribute:
            return ({id, value}) =>
                new ctor(id, value);
        case FTL.AttributeExpression:
            return ({id, name}) =>
                new ctor(id, name);
        case FTL.CallExpression:
            return ({callee, args = []}) =>
                new ctor(callee, args);
        case FTL.Message:
            return ({id, value, attributes, comment}) =>
                new ctor(id, value, attributes, comment);
        case FTL.NamedArgument:
            return ({name, value}) =>
                new ctor(name, value);
        case FTL.Pattern:
            return into_pattern;
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
            return ({id, value, attributes, comment}) =>
                new ctor(id, value, attributes, comment);
        case FTL.Variant:
            return ({key, value}) =>
                new ctor(key, value);
        case FTL.VariantExpression:
            return ({ref, key}) =>
                new ctor(ref, key);
        default:
            return (...args) => new ctor(...args);
    }
}

function into_pattern(elements) {
    return new FTL.Pattern(
        elements
            .reduce(join_adjacent_text, [])
            .map(trim_text_at_extremes)
            .filter(remove_empty_text));
}

function join_adjacent_text(acc, cur) {
    let prev = acc[acc.length - 1];
    if (prev
        && prev instanceof FTL.TextElement
        && cur instanceof FTL.TextElement) {
        prev.value += cur.value;
        return acc;
    } else {
        return acc.concat(cur);
    }
}

function trim_text_at_extremes(element, index, array) {
    if (element instanceof FTL.TextElement) {
        if (index === 0) {
            element.value = element.value.trimLeft();
        }
        if (index === array.length - 1) {
            element.value = element.value.trimRight();
        }
    }
    return element;
}

function remove_empty_text(element) {
    return !(element instanceof FTL.TextElement)
        || element.value !== "";
}
