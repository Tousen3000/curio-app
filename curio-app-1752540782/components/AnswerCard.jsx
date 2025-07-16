import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, Link2, Lightbulb } from 'lucide-react';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="w-full max-w-3xl mt-10 px-6 py-8 bg-gradient-to-br from-[#0e0e0e] to-[#1c1c1c] border border-white/10 rounded-3xl shadow-lg backdrop-blur-lg">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 text-purple-300">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-xl font-semibold tracking-wide">Curio Answer</h2>
      </div>

      {/* Markdown-rendered Answer */}
      <div className="prose prose-invert max-w-none text-white/90 text-lg leading-relaxed mb-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Sources</span>
          </div>
          <ul className="space-y-1 pl-4 text-sm list-disc text-blue-400">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 hover:underline">
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
          <div className="flex items-center gap-2 text-yellow-300 mb-2">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Suggested follow-ups</span>
          </div>
          <ul className="space-y-1 pl-4 text-sm list-disc text-white/80">
            {suggestions.map((s, i) => (
              <li key={i} className="hover:text-yellow-400 cursor-pointer transition-colors">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
