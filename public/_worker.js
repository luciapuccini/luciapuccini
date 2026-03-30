export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      const body = await request.json();

      const response = await fetch("https://api.ollama.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OLLAMA_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.text();
      return new Response(data, {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
