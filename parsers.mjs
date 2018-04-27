import Stream from "./stream.mjs";
import {Success, Failure} from "./result.mjs";
import {join} from "./util.mjs";

export class Parser {
    constructor(parse) {
        this.parse = parse;
    }

    run(iterable) {
        const stream = iterable instanceof Stream
            ? iterable
            : new Stream(iterable);
        try {
            return this.parse(stream);
        } catch (err) {
            // console.error(err);
            return new Failure(err.message, stream);
        }
    }

    // Hidden parsers match and consume the input, and always yield null.
    get hidden() {
        return this.map(() => Symbol.for("hidden"));
    }

    into(ctor) {
        return this.map(value => new ctor(value));
    }

    spreadInto(ctor) {
        // Filter out parsed results yielded by hidden parsers.
        const pruneHidden = value => value !== Symbol.for("hidden");
        return this.map(values =>
            new ctor(...values.filter(pruneHidden)));
    }

    map(f) {
        return new Parser(stream => this.run(stream).map(f));
    }

    bimap(s, f) {
        return new Parser(stream => this.run(stream).bimap(s, f));
    }

    chain(f) {
        return new Parser(stream =>
            this.run(stream).chain(
                (value, tail) => f(value).run(tail)));
    }

    fold(s, f) {
        return new Parser(stream => this.run(stream).fold(s, f));
    }
}

export function char(c) {
    return new Parser(stream =>
        stream.head() === c
            ? new Success(c, stream.move(1))
            : new Failure(`${c} not found`, stream));
}

export function regex(re) {
    return new Parser(stream => {
        const result = stream.exec(re);

        if (result === null) {
            return new Failure("regex did not match", stream);
        }

        const [match] = result;

        return new Success(match, stream.move(match.length));
    });
}

export function charset(range) {
    return regex(new RegExp(`[${range}]`));
}

export function string(str) {
    return sequence(...str.split("").map(char)).map(join);
}

export function eof() {
    return new Parser(stream =>
        stream.head() === Symbol.for("eof")
            ? new Success(stream.head(), stream.move(1))
            : new Failure("not at EOF", stream));
}

export function lookahead(parser) {
    return new Parser(stream =>
        parser
            .run(stream)
            .fold(
                value => new Success(value, stream),
                value => new Failure(value, stream)));
}

export function not(parser) {
    return new Parser(stream =>
        parser
            .run(stream)
            .fold(
                (value, tail) => new Failure("not failed", stream),
                (value, tail) => new Success(null, stream)));
}

export function and(...parsers) {
    const final = parsers.pop();
    return sequence(
        ...parsers.map(lookahead),
        final).map(
            results => results[results.length - 1]);
}

export function either(...parsers) {
    return new Parser(stream => {
        for (const parser of parsers) {
            const result = parser.run(stream);
            if (result instanceof Success) {
                return result;
            }
        }
        return new Failure("either failed", stream);
    });
}

export function always(value) {
    return new Parser(stream => new Success(value, stream));
}

export function never(value) {
    return new Parser(stream => new Failure(value, stream));
}

export function maybe(parser) {
    return new Parser(stream =>
        parser
            .run(stream)
            .fold(
                (value, tail) => new Success(value, tail),
                (value, tail) => new Success(null, stream)));
}

export function append(p1, p2) {
    return p1.chain(values =>
        p2.map(value => values.concat([value])));
}

export function sequence(...parsers) {
    return parsers.reduce(
        (acc, parser) => append(acc, parser),
        always([]));
}

export function repeat(parser) {
    return new Parser(stream =>
        parser.run(stream).fold(
            (value, tail) =>
                repeat(parser)
                    .map(rest => [value].concat(rest))
                    .run(tail),
            (value, tail) => new Success([], stream)));
}

export function repeat1(parser) {
    return new Parser(stream =>
        parser.run(stream).fold(
            (value, tail) =>
                repeat(parser)
                    .map(rest => [value].concat(rest))
                    .run(tail),
            (value, tail) => new Failure("repeat1 failed", stream)));
}

export function lazy(fn) {
    return new Parser(stream => fn().run(stream));
}
