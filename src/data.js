import rawData from "../data.json";

export const TOPICS = {
  med_use: "Medicine Usage",
  med_category: "Medicine Category",
};

export const THEMES = {
  flashcards: "Flash Cards",
  test: "Test",
};

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

function distinctAnswers(topic) {
  if (topic === "med_use") {
    return [...new Set(rawData.med_use.map((m) => m.Usage))];
  }
  return rawData.med_category.map((c) => c.category);
}

// Build a pool of { question: medicine, answer: usage/category }
export function buildCardPool(topic) {
  if (topic === "med_use") {
    return rawData.med_use.map((m) => ({
      question: m.medicine_name,
      answer: m.Usage,
    }));
  }
  return rawData.med_category.flatMap((c) =>
    c.medicines.map((m) => ({ question: m, answer: c.category }))
  );
}

// Pick 30 random cards for a session
export function pickSessionCards(topic) {
  return pickRandom(buildCardPool(topic), 30);
}

// Build test questions from a set of session cards (shuffled).
// Each question gets 3 distinct wrong options + the correct one, shuffled.
export function buildTestQuestions(topic, cards) {
  const answers = distinctAnswers(topic);
  return shuffle(cards).map((card) => {
    const wrong = pickRandom(
      answers.filter((a) => a !== card.answer),
      3
    );
    return {
      question: card.question,
      correct: card.answer,
      options: shuffle([card.answer, ...wrong]),
    };
  });
}
