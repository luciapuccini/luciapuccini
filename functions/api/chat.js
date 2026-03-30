export async function onRequestPost(context) {
  const body = await context.request.json();
  console.log("[ollama proxy] request model:", body.model);

  const response = await fetch("https://api.ollama.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.env.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.text();
  console.log("[ollama proxy] response status:", response.status);

  return new Response(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
