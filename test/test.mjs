import assert from "assert";
import path from "path";
import color from "cli-color";
import {readdir, readfile, diff} from './util.mjs';
import fluent from '../';

const fixtures_dir = process.argv[2];

if (!fixtures_dir) {
    console.error("Specify the fixtures directory.");
    process.exit(1);
}

main(fixtures_dir);

async function main(fixtures_dir) {
    const files = await readdir(fixtures_dir);
    const ftls = files.filter(
        filename => filename.endsWith('.ftl'));

    // Collect all AssertionErrors.
    const errors = new Map();

    // Parse each FTL fixture and compare against the expected AST.
    for (const file_name of ftls) {
        const ftl_path = path.join(fixtures_dir, file_name);
        const ast_path = ftl_path.replace(/ftl$/, 'json');

        process.stdout.write(`${ftl_path} `);

        try {
            var ftl_source = await readfile(ftl_path);
            var expected_ast = await readfile(ast_path);
        } catch (err) {
            errors.set(ftl_path, err);
            console.log(color.red("FAIL"));
            continue;
        }

        fluent.run(ftl_source).fold(
            assert_equal,
            err => assert.fail(err));

        function assert_equal(ast) {
            try {
                validate(ast, expected_ast);
                console.log(color.green("PASS"));
            } catch (err) {
                errors.set(ftl_path, err);
                console.log(color.red("FAIL"));
            }
        }
    }

    // Print all errors.
    for (const [ftl_path, err] of errors) {
        if (err instanceof assert.AssertionError) {
            console.log(format_assert_error(ftl_path, err));
        } else {
            console.log(format_generic_error(ftl_path, err));
        }
    }
}

function validate(actual_ast, expected_serialized) {
    const actual_json = JSON.parse(JSON.stringify(actual_ast));
    const expected_json = JSON.parse(expected_serialized);
    assert.deepEqual(actual_json, expected_json);
}

function format_assert_error(ftl_path, err) {
        return `
========================================================================
${color.red("FAIL")} ${ftl_path}
------------------------------------------------------------------------
${diff(err.expected, err.actual)}
`;
}

function format_generic_error(ftl_path, err) {
        return `
========================================================================
${color.red("FAIL")} ${ftl_path}
------------------------------------------------------------------------
${err.message}
`;
}
