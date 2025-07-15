import { Sparkles } from 'lucide-react';

export default function AnswerCard({ query, answer }) {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 mx-auto mt-8 max-w-3xl border border-gray-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-zinc-400">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <span>Curio's answer to:</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {query}
      </h2>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-zinc-100">
        {answer}
      </p>
    </div>
  );
}
