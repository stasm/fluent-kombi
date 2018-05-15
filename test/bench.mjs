import fs from "fs";
import perf from "perf_hooks";
const {PerformanceObserver, performance} = perf;

import FluentSyntax from "fluent-syntax";
import FluentRuntime from "fluent";
import {Resource} from "../syntax/grammar.mjs";
import {readfile} from "./util.mjs";

let [ftl_file] = process.argv.slice(2);

if (!ftl_file) {
    console.error(
        "Usage: node --experimental-modules bench.mjs FTL_FILE");
    process.exit(1);
}

new PerformanceObserver(items => {
    const [{name, duration}] = items.getEntries();
    console.log(`${name}: ${duration} ms`);
    performance.clearMarks();
}).observe({entryTypes: ["measure"]});

main(ftl_file);

async function main(ftl_file) {
    let ftl = await readfile(ftl_file);

    performance.mark("start1");
    Resource.run(ftl);
    performance.mark("end1");
    performance.measure("fluent-kombi", "start1", "end1");

    performance.mark("start2");
    FluentSyntax.parse(ftl);
    performance.mark("end2");
    performance.measure("fluent-syntax", "start2", "end2");

    performance.mark("start3");
    FluentRuntime._parse(ftl);
    performance.mark("end3");
    performance.measure("fluent (runtime)", "start3", "end3");
}
