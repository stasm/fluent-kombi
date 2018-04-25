import * as FTL from "./ast.mjs";

export function join(values) {
    return values
        .filter(v => v !== Symbol.for("EOF"))
        .join("");
}

export function intoMessage([id, value, attributes]) {
    return new FTL.Message(id, value, attributes);
}

export function intoIdentifier(name) {
    return new FTL.Identifier(name);
}

export function intoAttribute([id, value]) {
    return new FTL.Attribute(id, value);
}

export function intoComment(content) {
    return new FTL.Comment(content);
}

export function intoGroupComment(content) {
    return new FTL.GroupComment(content);
}

export function intoResourceComment(content) {
    return new FTL.ResourceComment(content);
}

export function intoResource(body) {
    return new FTL.Resource(body);
}

export function intoJunk(content) {
    return new FTL.Junk(content);
}
