import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="w-full max-w-3xl mt-12 bg-[#121212] text-white px-8 py-10 rounded-2xl shadow-xl space-y-8">
      
      {/* Answer */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Answer</h2>
        <div className="prose prose-invert max-w-none text-lg leading-7 text-white/90">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-2 text-cyan-300 uppercase tracking-wide">Sources</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-blue-400">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-300 transition">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-2 text-yellow-300 uppercase tracking-wide">You might also ask</h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-white/80">
            {suggestions.map((s, i) => (
              <li key={i} className="cursor-pointer hover:text-yellow-400 transition">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
