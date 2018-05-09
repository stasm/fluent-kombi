import fs from "fs";
import perf from "perf_hooks";
const { PerformanceObserver, performance } = perf;
import FluentSyntax from "fluent-syntax";
import FluentRuntime from "fluent";

import fluent from "./";

new PerformanceObserver(items => {
    const [{name, duration}] = items.getEntries();
    console.log(`${name}: ${duration} ms`);
    performance.clearMarks();
}).observe({entryTypes: ["measure"]});

const ftl = fs.readFileSync("gecko-strings.ftl", "utf8");

performance.mark("start1");
fluent.run(ftl);
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
