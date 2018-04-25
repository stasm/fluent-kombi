import * as FTL from "./ast.mjs";

export function join(values) {
    return values
        .filter(v => v !== Symbol.for("EOF"))
        .join("");
}

function nodes(list) {
    // Filter out parsed results yielded by hidden parsers.
    return list.filter(v => v !== null);
}

export function intoMessage(sequence) {
    const [id, value, attributes] = nodes(sequence);
    return new FTL.Message(id, value, attributes);
}

export function intoIdentifier([first, rest]) {
    const name = `${first}${join(rest)}`;
    return new FTL.Identifier(name);
}

export function intoAttribute(sequence) {
    const [id, value] = nodes(sequence);
    return new FTL.Attribute(id, value);
}

export function intoComment(lines) {
    const content = join(lines.map(nodes).map(join));
    return new FTL.Comment(content);
}

export function intoGroupComment(lines) {
    const content = join(lines.map(nodes).map(join));
    return new FTL.GroupComment(content);
}

export function intoResourceComment(lines) {
    const content = join(lines.map(nodes).map(join));
    return new FTL.ResourceComment(content);
}

export function intoResource(body) {
    const entries = nodes(body);
    return new FTL.Resource(entries);
}

export function intoJunk(lines) {
    const content = join(lines.map(join));
    return new FTL.Junk(content);
}
