export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { query } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API key." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const body = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are Curio, a smart search assistant. Always provide clear, concise answers and cite sources if available."
      },
      { role: "user", content: query }
    ],
    temperature: 0.7
  };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const result = await res.json();

    // TEMP: log result for debugging
    console.log("🧠 OpenAI response:", JSON.stringify(result, null, 2));

    const answer =
      result?.choices?.[0]?.message?.content?.trim() ||
      result?.error?.message ||
      "No answer found.";

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Something went wrong connecting to OpenAI." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
