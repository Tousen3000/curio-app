import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  const parsedSources = sources.map((src) =>
    typeof src === 'string' ? { url: src, title: new URL(src).hostname } : src
  );

  return (
    <div className="w-full max-w-3xl px-6 py-8 mt-8 bg-[#1a1a1a] text-white rounded-2xl shadow-xl space-y-8">
      <div>
        <p className="text-sm uppercase text-gray-400 tracking-wider mb-2">Curio AI Overview</p>
        <div className="prose prose-invert max-w-none text-white/90 text-base leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      </div>

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
                  className="hover:text-blue-300 hover:underline"
                >
                  {new URL(src.url).hostname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-yellow-300 uppercase tracking-wide mb-2">Suggested follow-ups</h3>
          <ul className="space-y-1 pl-4 text-sm text-white/80 list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i} className="cursor-pointer hover:text-yellow-400 transition-colors">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
