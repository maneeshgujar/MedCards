import { useEffect, useState } from "react";
import { TOPICS } from "../data";

export default function FlashcardPage({ cards, topic, onBack, onFinish }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);

  const total = cards.length;
  const card = cards[index];

  const answerLabel = topic === "med_use" ? "Usage" : "Category";

  const stopPlaying = () => setPlaying(false);

  // Play mode: front 5s -> back 5s -> next card -> ... -> finish
  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(
      () => {
        if (!flipped) {
          setFlipped(true);
        } else if (index >= total - 1) {
          setPlaying(false);
          onFinish();
        } else {
          setIndex((i) => i + 1);
          setFlipped(false);
        }
      },
      5000
    );

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, flipped, index, total]);

  const goPrev = () => {
    stopPlaying();
    if (index === 0) return;
    setIndex((i) => i - 1);
    setFlipped(false);
  };

  const goNext = () => {
    stopPlaying();
    if (index >= total - 1) {
      onFinish();
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  };

  const handleBack = () => {
    stopPlaying();
    onBack();
  };

  const handlePlay = () => {
    if (playing) {
      stopPlaying();
    } else {
      setFlipped(false);
      setPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
        <button
          onClick={handleBack}
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
        <span className="text-xs text-slate-500 uppercase tracking-wider">
          {TOPICS[topic]}
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="perspective-1000 w-full max-w-sm">
          <div
            onClick={() => !playing && setFlipped((f) => !f)}
            className={`preserve-3d relative w-full aspect-[3/4] cursor-pointer transition-transform duration-500 ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="backface-hidden absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6">
              <span className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Medicine
              </span>
              <p className="text-2xl font-bold text-white text-center leading-snug">
                {card.question}
              </p>
              {!playing && (
                <span className="absolute bottom-5 text-xs text-slate-500">
                  Tap to flip
                </span>
              )}
            </div>

            {/* Back */}
            <div className="backface-hidden rotate-y-180 absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6">
              <span className="text-xs uppercase tracking-widest text-emerald-200/80 mb-4">
                {answerLabel}
              </span>
              <p className="text-xl font-semibold text-white text-center leading-snug">
                {card.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between gap-3 mb-6">
        <button
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Previous card"
          className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handlePlay}
          className={`flex items-center justify-center gap-2 h-14 px-8 rounded-full font-semibold transition active:scale-95 shadow-lg ${
            playing
              ? "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30"
              : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25"
          }`}
        >
          {playing ? (
            <>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </>
          )}
        </button>

        <button
          onClick={goNext}
          aria-label="Next card"
          className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition active:scale-95"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div className="text-center pb-2">
        <span className="inline-block bg-slate-800/80 border border-slate-700 rounded-full px-5 py-2 text-sm font-medium text-slate-200 tabular-nums">
          {index + 1} / {total}
        </span>
      </div>
    </div>
  );
}
