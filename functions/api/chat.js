export async function onRequestPost(context) {
  const body = await context.request.json();
  const response = await fetch("https://api.ollama.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.env.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
