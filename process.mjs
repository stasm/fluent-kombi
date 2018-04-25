import * as FTL from "./ast.mjs";

export function join(values) {
    return values.filter(v => v !== Symbol.for("EOF")).join("");
}

export function intoMessage(sequence) {
    const [id, _1, _2, _3, value, attributes] = sequence;
    return new FTL.Message(id, value, attributes);
}

export function intoIdentifier([first, rest]) {
    const name = `${first}${join(rest)}`;
    return new FTL.Identifier(name);
}

export function intoAttribute(sequence) {
    const [_0, _1, id, _3, _4, _5, value] = sequence;
    return new FTL.Attribute(id, value);
}

export function intoComment(lines) {
    const content = join(lines.map(([sigil, ...text]) => join(text)));
    return new FTL.Comment(content);
}

export function intoGroupComment(lines) {
    const content = join(lines.map(([sigil, ...text]) => join(text)));
    return new FTL.GroupComment(content);
}

export function intoResourceComment(lines) {
    const content = join(lines.map(([sigil, ...text]) => join(text)));
    return new FTL.ResourceComment(content);
}

export function intoResource(body) {
    // Filter blank lines out.
    const entries = body.filter(entry => entry instanceof FTL.BaseNode);
    return new FTL.Resource(entries);
}

export function intoJunk(lines) {
    const content = join(lines.map(join));
    return new FTL.Junk(content);
}
