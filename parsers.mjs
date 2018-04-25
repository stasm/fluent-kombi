import Stream from "./stream.mjs";
import {Success, Failure} from "./result.mjs";

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
      } catch(err) {
          return new Failure(err.message, stream);
      }
  }

    // Hidden parsers match and consume the input, and always yield null.
    get hidden() {
        return this.map(() => null);
    }

    // Filter out parsed results yielded by hidden parsers.
    get pruned() {
        return this.map(values => values.filter(v => v !== null));
    }

    // Join the list of parsed values into a string.
    get str() {
        return this.map(values =>
            values
                .filter(v => v !== Symbol.for("EOF"))
                .join(""));
    }

    into(ctor) {
        return this.map(value => new ctor(value));
    }

    spreadInto(ctor) {
        return this.map(values => new ctor(...values));
    }

  map(f) {
    return new Parser(stream => this.run(stream).map(f));
  }

  bimap(s, f) {
    return new Parser(stream => this.run(stream).bimap(s, f));
  }

  chain(f) {
    return new Parser(stream => this.run(stream).chain((v, s) => f(v).run(s)));
  }

  fold(s, f) {
    return new Parser(stream => this.run(stream).fold(s, f));
  }
}

export function where(pred) {
    return new Parser(stream => {
        const value = stream.head();
        return pred(value)
            ? new Success(value, stream.move(1))
            : new Failure('predicate did not match', stream);
    });
}

export function char(c) {
    return where(x => x === c);
}

export function regex(re) {
    return new Parser(stream => {
        const result = stream.exec(re);

        if (result === null) {
            return new Failure('regex did not match', stream);
        }

        const [match] = result;

        return new Success(match, stream.move(match.length));
    });
}

export function range(charset) {
    return regex(new RegExp(`[${charset}]`));
}

export function not(parser) {
    return new Parser(stream => parser.run(stream).fold(
        (value, s) => new Failure("not failed", stream),
        (value, s) => new Success(null, stream)));
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
        return new Failure('either failed', stream);
    });
}

export function always(value) {
    return new Parser(stream => new Success(value, stream));
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

export function sequence(...parsers) {
    return parsers.reduce(
        (acc, parser) => append(acc, parser), always([])).pruned;
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
            (value, s) => new Success([], stream))).pruned;
}

export function repeat1(parser) {
    return new Parser(stream => parser.run(stream).fold(
        (value, rest) => repeat(parser).map(next => [value].concat(next)).run(rest),
        (value, rest) => new Failure("repeat1 failed", stream)));
}

export function string(str) {
    return sequence(...str.split('').map(char)).str;
}

export function eof() {
    return new Parser(stream =>
        stream.head() === Symbol.for("EOF")
            ? new Success(stream.head(), stream.move(1))
            : new Failure("not at EOF", stream));
}
