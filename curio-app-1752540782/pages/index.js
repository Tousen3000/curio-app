import { useState } from 'react';
import Head from 'next/head';
import { Loader, Search } from 'lucide-react';
import AnswerCard from '../components/AnswerCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No answer found.');
    } catch (err) {
      console.error(err);
      setAnswer('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Curio - AI Smart Search</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black px-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Curio</h1>
        <p className="text-lg text-gray-600 dark:text-zinc-400 mb-6">Smart search. Powered by curiosity.</p>

        <div className="w-full max-w-xl">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? <Loader className="animate-spin h-5 w-5 text-blue-500" /> : <Search className="h-5 w-5 text-blue-500" />}
            </button>
          </div>
        </div>

        {answer && !loading && (
          <AnswerCard query={query} answer={answer} />
        )}
      </main>
    </>
  );
}
