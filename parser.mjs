import Stream from "./stream.mjs";
import {Failure} from "./result.mjs";

export default class Parser {
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
            // console.error(err.message);
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
