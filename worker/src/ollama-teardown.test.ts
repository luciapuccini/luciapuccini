import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

test("package.json does not depend on ollama", () => {
	const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
		dependencies?: Record<string, string>;
		devDependencies?: Record<string, string>;
	};
	assert.equal(pkg.dependencies?.ollama, undefined);
	assert.equal(pkg.devDependencies?.ollama, undefined);
});

test("vite and netlify do not proxy /ollama", () => {
	const vite = readFileSync(join(root, "vite.config.ts"), "utf8");
	const netlify = readFileSync(join(root, "netlify.toml"), "utf8");
	assert.equal(/["']\/ollama/.test(vite), false);
	assert.equal(/\/ollama\//.test(netlify), false);
});
