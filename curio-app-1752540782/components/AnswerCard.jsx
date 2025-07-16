import React from 'react';

export default function AnswerCard({ answer, sources = [], suggestions = [] }) {
  return (
    <div className="mt-10 w-full max-w-2xl bg-white text-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Here's what I found:</h2>

      <div className="text-lg leading-relaxed mb-4">
        {answer.split('\n').map((line, idx) => (
          <p key={idx} className="mb-2">{line}</p>
        ))}
      </div>

      {sources.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Sources</h3>
          <ul className="list-disc list-inside text-blue-600 space-y-1">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">You might also be curious about:</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {suggestions.map((s, i) => (
              <li key={i} className="hover:text-blue-700 cursor-pointer">{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
