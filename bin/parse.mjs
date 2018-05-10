import readline from "readline";
import fluent from "../";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "fluent>",
});

const lines = [];

rl.on("line", line => lines.push(line));
rl.on("close", () => {
    const ftl = lines.join("\n") + "\n";
    fluent.run(ftl).fold(
        ast => console.log(JSON.stringify(ast, null, 4)),
        err => console.error(err));
});
