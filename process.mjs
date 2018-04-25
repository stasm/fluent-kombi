import * as FTL from "./ast.mjs";

export function join(values) {
    return values
        .filter(v => v !== Symbol.for("EOF"))
        .join("");
}

export function intoMessage([id, value, attributes]) {
    return new FTL.Message(id, value, attributes);
}

export function intoIdentifier([first, rest]) {
    const name = `${first}${join(rest)}`;
    return new FTL.Identifier(name);
}

export function intoAttribute([id, value]) {
    return new FTL.Attribute(id, value);
}

export function intoComment(lines) {
    const content = join(lines.map(join));
    return new FTL.Comment(content);
}

export function intoGroupComment(lines) {
    const content = join(lines.map(join));
    return new FTL.GroupComment(content);
}

export function intoResourceComment(lines) {
    const content = join(lines.map(join));
    return new FTL.ResourceComment(content);
}

export function intoResource(body) {
    return new FTL.Resource(body);
}

export function intoJunk(lines) {
    const content = join(lines.map(join));
    return new FTL.Junk(content);
}
