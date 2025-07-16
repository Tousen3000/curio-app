import React from 'react';
import { Sparkles, Link2, Lightbulb } from 'lucide-react';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="mt-12 w-full max-w-3xl px-6 py-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_60px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_0_80px_-10px_rgba(0,0,0,0.6)]">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-blue-300">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-lg font-semibold tracking-wide uppercase">
          Curio Answer
        </h2>
      </div>

      {/* Answer text */}
      <div className="text-lg leading-relaxed text-white/90 whitespace-pre-line font-light mb-6">
        {answer}
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-purple-300 mb-2">
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Sources</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-2 text-blue-400 text-sm">
            {sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-300 transition-colors"
                >
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
            <span className="text-sm font-medium uppercase tracking-wider">You might also ask</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-2 text-white/80 text-sm">
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
