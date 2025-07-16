import React from 'react';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="bg-white/5 p-6 mt-6 rounded-2xl shadow-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Answer</h2>
      <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">{answer}</p>

      {sources.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">Sources:</h3>
          <ul className="list-disc list-inside text-blue-400">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">You may also like:</h3>
          <ul className="list-disc list-inside text-white/80">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
