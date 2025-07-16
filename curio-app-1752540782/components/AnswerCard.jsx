import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, Link2, Lightbulb } from 'lucide-react';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="w-full max-w-3xl mt-12 px-8 py-10 bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 text-indigo-400">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-2xl font-semibold tracking-tight font-sans">Curio Answer</h2>
      </div>

      {/* Markdown-rendered Answer */}
      <div className="prose prose-invert prose-p:mb-4 prose-strong:text-white/95 prose-li:marker:text-gray-500 max-w-none text-white/90 text-[17px] leading-7 font-light">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">Sources</span>
          </div>
          <ul className="space-y-1 pl-5 text-sm text-blue-400 list-disc list-inside">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 hover:underline transition-all">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 text-yellow-300 mb-2">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">Suggested follow-ups</span>
          </div>
          <ul className="space-y-1 pl-5 text-sm text-white/80 list-disc list-inside">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="hover:text-yellow-400 cursor-pointer transition-colors"
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
