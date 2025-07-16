import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  // Normalize source format: support both strings and objects
  const parsedSources = sources.map((src) =>
    typeof src === 'string' ? { url: src, title: new URL(src).hostname } : src
  );

  return (
    <div className="w-full max-w-3xl bg-[#111] text-white px-8 py-10 rounded-3xl shadow-xl space-y-10 transition hover:shadow-2xl">
      
      {/* 🧠 Answer Section */}
      <div>
        <h2 className="text-xl font-bold text-purple-400 mb-4">Curio Answer</h2>
        <div className="prose prose-invert prose-p:mb-4 prose-strong:text-white max-w-none text-lg leading-7">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      </div>

      {/* 🔗 Sources */}
      {parsedSources.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-2">Sources</h3>
          <ul className="space-y-1 pl-4 text-sm text-blue-400 list-disc list-inside">
            {parsedSources.map((src, i) => (
              <li key={i}>
                <strong>{src.title || new URL(src.url).hostname}</strong> —{' '}
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-200"
                >
                  {new URL(src.url).hostname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 💡 Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-yellow-300 uppercase tracking-wide mb-2">Suggested follow-ups</h3>
          <ul className="space-y-1 pl-4 text-sm text-white/80 list-disc list-inside">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-yellow-300 transition-colors"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
