import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No answer found.');
    } catch (err) {
      setAnswer('Something went wrong. Try again.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
        Curio
      </h1>
      <p className="text-lg text-gray-400 text-center mb-10">
        The AI-powered search engine for curious minds. Ask anything.<br />Get instant answers.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
        <input
          className="flex-1 p-4 rounded-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none"
          placeholder="what do cows eat"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {answer && (
        <div className="mt-10 w-full max-w-xl bg-gray-900 text-white p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="text-base leading-relaxed text-gray-300">{answer}</p>
        </div>
      )}
    </main>
  );
}
