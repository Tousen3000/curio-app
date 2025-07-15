export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { query } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  const body = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are Curio, a smart search assistant. Always give helpful, concise answers and cite sources when possible." },
      { role: "user", content: query }
    ],
    temperature: 0.7
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const result = await res.json();

  const answer =
    result.choices?.[0]?.message?.content?.trim() ||
    result.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments ||
    "No answer found.";

  return new Response(JSON.stringify({ answer }), {
    headers: { "Content-Type": "application/json" }
  });
}
