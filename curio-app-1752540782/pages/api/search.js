export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { query } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  const messages = [
    { role: "system", content: "You are Curio, a smart search assistant. Always be helpful and include sources if available." },
    { role: "user", content: query }
  ];

  const body = {
    model: "gpt-4o",
    messages,
    tools: [
      { type: "tool_use", tool_spec: { name: "web_search" } }
    ],
    tool_choice: "auto",
    temperature: 0.7
  };

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const result = await openaiRes.json();
  const answer = result.choices?.[0]?.message?.content || "No answer found.";

  return new Response(JSON.stringify({ answer }), {
    headers: { "Content-Type": "application/json" }
  });
}
