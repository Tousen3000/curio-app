import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  const parsedSources = sources.map((src) =>
    typeof src === 'string' ? { url: src, title: new URL(src).hostname } : src
  );

  return (
    <div className="w-full max-w-3xl mt-10 text-white font-sans">
      <div className="text-sm text-gray-400 uppercase tracking-wide mb-3">AI Overview</div>

      <div className="text-base leading-7 text-white/90 prose prose-invert prose-p:mb-4 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
      </div>

      {parsedSources.length > 0 && (
        <div className="mt-6 text-sm">
          <div className="text-cyan-300 font-semibold uppercase tracking-wide mb-2">Sources</div>
          <ul className="list-none space-y-1">
            {parsedSources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {src.title || new URL(src.url).hostname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6 text-sm">
          <div className="text-yellow-300 font-semibold uppercase tracking-wide mb-2">Suggested Follow-ups</div>
          <div className="flex flex-wrap gap-3">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
