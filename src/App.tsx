import { useState } from "react";
import StartPage from "./components/StartPage";
import FlashcardPage from "./components/FlashcardPage";
import TestPage from "./components/TestPage";
import EndPage from "./components/EndPage";
import { pickSessionCards, buildTestQuestions } from "./data";
import type {
  Card,
  EndSource,
  Page,
  TestQuestion,
  TestResults,
  Theme,
  Topic,
} from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("start");
  const [topic, setTopic] = useState<Topic>("med_use");
  const [cards, setCards] = useState<Card[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [endSource, setEndSource] = useState<EndSource | null>(null);
  const [results, setResults] = useState<TestResults | null>(null);

  const startSession = (selectedTopic: Topic, theme: Theme) => {
    setTopic(selectedTopic);
    const sessionCards = pickSessionCards(selectedTopic);
    setCards(sessionCards);

    if (theme === "flashcards") {
      setPage("flashcards");
    } else {
      setTestQuestions(buildTestQuestions(selectedTopic, sessionCards));
      setPage("test");
    }
  };

  const goHome = () => {
    setPage("start");
    setCards([]);
    setTestQuestions([]);
    setResults(null);
    setEndSource(null);
  };

  const finishFlashcards = () => {
    setEndSource("flashcards");
    setPage("end");
  };

  const finishTest = (testResults: TestResults) => {
    setResults(testResults);
    setEndSource("test");
    setPage("end");
  };

  // From flashcard end page -> test with the same cards (shuffled)
  const startTestFromFlashcards = () => {
    setTestQuestions(buildTestQuestions(topic, cards));
    setPage("test");
  };

  // Retake the same test questions (shuffled again)
  const retakeTest = () => {
    setTestQuestions(buildTestQuestions(topic, cards));
    setPage("test");
  };

  if (page === "flashcards") {
    return (
      <FlashcardPage
        cards={cards}
        topic={topic}
        onBack={goHome}
        onFinish={finishFlashcards}
      />
    );
  }

  if (page === "test") {
    return (
      <TestPage
        questions={testQuestions}
        onBack={goHome}
        onFinish={finishTest}
      />
    );
  }

  if (page === "end") {
    return (
      <EndPage
        source={endSource}
        results={results}
        onTakeTest={startTestFromFlashcards}
        onRetakeTest={retakeTest}
        onHome={goHome}
      />
    );
  }

  return <StartPage onStart={startSession} />;
}
