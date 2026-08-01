import { useState } from "react";

export default function TestPage({ questions, onBack, onFinish }) {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [wrongPicked, setWrongPicked] = useState(null);
  const [stats, setStats] = useState({ successful: 0, failed: 0 });

  const total = questions.length;
  const question = questions[index];

  const handleOption = (option) => {
    if (locked) return;

    if (option === question.correct) {
      setStats((s) => ({ ...s, successful: s.successful + 1 }));
      setWrongPicked(null);
      setLocked(true);
    } else {
      setStats((s) => ({ ...s, failed: s.failed + 1 }));
      setWrongPicked(option);
    }
  };

  const handleNext = () => {
    if (!locked) return;

    if (index >= total - 1) {
      const { successful, failed } = stats;
      const rate =
        successful + failed > 0
          ? Math.round((successful / (successful + failed)) * 100)
          : 0;
      onFinish({ successful, failed, rate });
      return;
    }

    setIndex((i) => i + 1);
    setLocked(false);
    setWrongPicked(null);
  };

  const optionClass = (option) => {
    let base =
      "w-full text-left rounded-xl border px-4 py-3.5 text-base font-medium transition active:scale-[0.98] ";

    if (locked && option === question.correct) {
      return base + "border-emerald-500 bg-emerald-500/15 text-emerald-300";
    }
    if (wrongPicked === option) {
      return base + "border-rose-500 bg-rose-500/15 text-rose-300";
    }
    if (locked) {
      return base + "border-slate-800 bg-slate-900 text-slate-600";
    }
    return (
      base +
      "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
        <button
          onClick={onBack}
          aria-label="Back to start page"
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium bg-slate-800/70 hover:bg-slate-700/70 rounded-lg px-3 py-2 transition"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <span className="text-sm text-slate-400 tabular-nums">
          Question {index + 1} / {total}
        </span>
      </div>

      {/* Question card */}
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Medicine
          </span>
          <p className="mt-2 text-xl font-bold text-white leading-snug">
            {question.question}
          </p>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOption(option)}
              className={optionClass(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        <div className="min-h-[2.5rem] mt-5 flex items-center justify-center">
          {wrongPicked && !locked && (
            <p className="text-rose-400 font-medium">
              Incorrect! Please try again.
            </p>
          )}
          {locked && (
            <p className="text-emerald-400 font-medium">
              Correct! Well done.
            </p>
          )}
        </div>
      </div>

      {/* Next */}
      <div className="max-w-md w-full mx-auto pb-2">
        <button
          onClick={handleNext}
          disabled={!locked}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl py-3.5 transition active:scale-[0.98] shadow-lg shadow-emerald-500/20"
        >
          {index >= total - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
