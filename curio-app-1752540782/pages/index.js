import { useState } from "react";

export default function CurioApp() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Oops, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Curio</h1>
      <p className="mb-6 text-lg text-gray-600">Smart search. Powered by curiosity.</p>
      <div className="w-full max-w-xl">
        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Search with Curio"}
        </button>
      </div>
      <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        {answer && <p className="text-lg whitespace-pre-line">{answer}</p>}
      </div>
    </div>
  );
}
