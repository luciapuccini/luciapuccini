interface Env {
	OLLAMA_API_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const { request, env, params } = context;
	const path = Array.isArray(params.path) ? params.path.join("/") : params.path;
	const targetUrl = `https://ollama.com/api/${path}`;

	const headers = new Headers(request.headers);
	headers.set("Authorization", `Bearer ${env.OLLAMA_API_KEY}`);
	headers.set("Host", "ollama.com");
	headers.delete("cookie");

	const response = await fetch(targetUrl, {
		method: request.method,
		headers,
		body: request.method !== "GET" ? request.body : undefined,
	});

	const responseHeaders = new Headers(response.headers);
	responseHeaders.delete("set-cookie");

	return new Response(response.body, {
		status: response.status,
		headers: responseHeaders,
	});
};
