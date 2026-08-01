import { useState } from "react";
import { TOPICS, THEMES } from "../data";

export default function StartPage({ onStart }) {
  const [topic, setTopic] = useState("med_use");
  const [theme, setTheme] = useState("flashcards");

  const handleStart = () => onStart(topic, theme);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20 mb-4">
            <svg
              className="h-9 w-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Med<span className="text-emerald-400">Cards</span>
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Learn medicines faster with flashcards & tests
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="med_use">{TOPICS.med_use}</option>
              <option value="med_category">{TOPICS.med_category}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="flashcards">{THEMES.flashcards}</option>
              <option value="test">{THEMES.test}</option>
            </select>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.98] transition text-white font-semibold text-lg rounded-xl py-3.5 shadow-lg shadow-emerald-500/25"
          >
            Start Learning
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          30 random cards per session · No login needed
        </p>
      </div>
    </div>
  );
}
