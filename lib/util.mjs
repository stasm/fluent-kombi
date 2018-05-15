import {Alias} from "./parser.mjs";

// Flatten a list up to a given depth.
export const flatten = depth =>
    list => list.reduce(
        (acc, cur) => acc.concat(
            !Array.isArray(cur) || depth === 1
                ? cur
                : flatten(depth - 1)(cur)),
        []);

// Mutate an object by merging properties of another object into it.
export const mutate = state =>
    obj => Object.assign(obj, state);

// Join the list of parsed values into a string.
export const to_string = list =>
    list
        .filter(value => value !== Symbol.for("eof"))
        .join("");

// Map a list of {name, value} aliases into an array of values.
export const to_array = list =>
    list
        .filter(value => value instanceof Alias)
        .map(({value}) => value);

// Merge a list of {name, value} aliases into an object.
export const to_object = list =>
    list
        .filter(value => value instanceof Alias)
        .reduce(
            (obj, {name, value}) => Object.assign(obj, {[name]: value}),
            {});

// Print the parse result of a parser.
export const print = x =>
    (console.log(JSON.stringify(x, null, 4)), x);
