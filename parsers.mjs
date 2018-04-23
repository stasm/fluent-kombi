import Stream from "./stream.mjs";
import {Success, Failure} from "./result.mjs";

export class Parser {
  constructor(parse) {
    this.parse = parse
  }
  run(iterable) {
    if (iterable instanceof Stream) {
      return this.parse(iterable)
    } else {
      return this.parse(new Stream(iterable))
    }
  }
  map(f) {
    return new Parser(stream => this.parse(stream).map(f))
  }
  bimap(s, f) {
    return new Parser(stream => this.parse(stream).bimap(s, f))
  }
  chain(f) {
    return new Parser(stream => this.parse(stream).chain((v, s) => f(v).run(s)))
  }
  fold(s, f) {
    return new Parser(stream => this.parse(stream).fold(s, f))
  }
}

export function where(pred) {
    return new Parser(stream => {
        if (stream.length === 0) {
            return new Failure('unexpected end', stream);
        }
        const value = stream.head();
        if (pred(value)) {
            return new Success(value, stream.move(1));
        }
        return new Failure('predicate did not match', stream);
    });
}

export function char(c) {
    return where(x => x === c);
}

export function either(...list) {
    return new Parser(stream => {
        for (let i = 0; i < list.length; i++) {
            const parser = list[i];
            const result = parser.run(stream);
            if (result instanceof Success) {
                return result;
            }
        }
        return new Failure('either failed', stream);
    });
}

export function always(value) {
    return new Parser((stream) => new Success(value, stream));
}

export function never(value) {
    return new Parser(stream => new Failure(value, stream));
}
  
export function append(p1, p2) {
    return p1.chain(vs => p2.map(v => vs.concat([v])));
}

export function concat(p1, p2) {
    return p1.chain(xs => p2.map(ys => xs.concat(ys)));
}

export function sequence(...list) {
    return list.reduce((acc, parser) => append(acc, parser), always([]));
}

export function maybe(parser) {
    return new Parser(stream => parser.run(stream).fold(
        (v, s) => new Success(v, s),
        (v) => new Success(null, stream)));
}

export function lookahead(parser) {
    return new Parser(stream => parser.run(stream).fold(
        (v) => new Success(v, stream),
        (v) => new Failure(v, stream)));
}

export function repeat(parser) {
    return new Parser(stream => parser.run(stream).fold(
            (value, s) => repeat(parser).map(rest => [value].concat(rest)).run(s),
            (value, s) => new Success([], stream)))
}

export function repeat1(parser) {
    return new Parser(stream => parser.run(stream) .fold(
        (value, rest) => repeat(parser).map(next => [value].concat(next)).run(rest),
        (value, rest) => new Failure("repeat1 failed", stream)));
}

export function string(str) {
    return sequence(...str.split('').map(char));
}

export function not(parser) {
    return new Parser(stream => parser.run(stream).fold(
        (value, s) => new Failure('not failed', stream),
        (value, s) =>
            stream.length > 0
                ? new Success(stream.head(), stream.move(1))
                : new Failure('unexpected end', stream)));
}
