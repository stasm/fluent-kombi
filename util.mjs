// Mapping helpers

export const assign = extra =>
    obj => Object.assign(obj, extra);

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
        .filter(value => typeof value !== "symbol")
        .join("");

export const print = x =>
    (console.log(x), x);
