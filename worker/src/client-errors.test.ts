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

test("unknown failure keeps a generic status message", () => {
	const err = chatErrorFromBody(500, "boom");
	assert.equal(err.code, undefined);
	assert.match(err.message, /boom/);
});
