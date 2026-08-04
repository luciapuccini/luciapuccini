import assert from "node:assert/strict";
import { test } from "node:test";
import { chatErrorFromBody } from "../../src/chat/errors.ts";

test("security rejection body becomes a clear ChatRequestError", () => {
	const err = chatErrorFromBody(
		403,
		JSON.stringify({
			error: "Origin not allowed for Ask Lucia chat",
			code: "origin_denied",
		}),
	);
	assert.equal(err.code, "origin_denied");
	assert.match(err.message, /security/i);
	assert.match(err.message, /Ask Lucia|luciapuccini/i);
});

test("budget rejection body becomes a clear ChatRequestError", () => {
	const err = chatErrorFromBody(
		429,
		JSON.stringify({
			error: "Session question budget exhausted",
			code: "budget_exhausted",
		}),
	);
	assert.equal(err.code, "budget_exhausted");
	assert.match(err.message, /budget|question|limit|8/i);
});

test("unknown failure keeps a generic status message", () => {
	const err = chatErrorFromBody(500, "boom");
	assert.equal(err.code, undefined);
	assert.match(err.message, /boom/);
});
