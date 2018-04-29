import {Alias} from "./parser.mjs";

// Mapping helpers
// ---------------

export const flatten = depth =>
    list => list.reduce(
        (acc, cur) => acc.concat(
            !Array.isArray(cur) || depth === 1
                ? cur
                : flatten(depth - 1)(cur)),
        []);

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

export const print = x =>
    (console.log(x), x);
