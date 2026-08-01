export default function EndPage({
  source,
  results,
  onTakeTest,
  onRetakeTest,
  onHome,
}) {
  const fromFlashcards = source === "flashcards";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/25 mb-6">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {fromFlashcards ? (
          <>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Great!
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              You have completed all the flash cards.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Results
            </h1>
            <div className="mt-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Failed attempts</span>
                <span className="text-lg font-semibold text-rose-400 tabular-nums">
                  {results.failed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Successful attempts</span>
                <span className="text-lg font-semibold text-emerald-400 tabular-nums">
                  {results.successful}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                <span className="text-slate-400">Success rate</span>
                <span className="text-2xl font-bold text-white tabular-nums">
                  {results.rate}%
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 space-y-3">
          <button
            onClick={fromFlashcards ? onTakeTest : onRetakeTest}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.98] transition text-white font-semibold text-lg rounded-xl py-3.5 shadow-lg shadow-emerald-500/25"
          >
            {fromFlashcards ? "Take a Test" : "Retake Test"}
          </button>
          <button
            onClick={onHome}
            className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-700 active:scale-[0.98] transition text-slate-200 font-semibold text-lg rounded-xl py-3.5"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
