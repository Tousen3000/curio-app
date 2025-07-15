import { useState } from 'react';
import '../styles.css';
import { motion } from 'framer-motion';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Curio
      </motion.h1>

      <p className="text-lg text-gray-400 mb-8 text-center max-w-lg">
        The AI-powered search engine for curious minds. Ask anything. Get instant answers.
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
        <input
          className="flex-1 p-4 rounded-2xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200"
        >
          Search
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        {loading && <p className="text-center text-gray-500 animate-pulse">Thinking...</p>}

        {!loading && answer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mt-4 text-lg leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </div>
    </main>
  );
}
