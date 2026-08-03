export type Topic = "med_use" | "med_category";

export type Theme = "flashcards" | "test";

export type Page = "start" | "flashcards" | "test" | "end";

export type EndSource = "flashcards" | "test";

export interface Card {
  question: string;
  answer: string;
}

export interface TestQuestion {
  question: string;
  correct: string;
  options: string[];
}

export interface TestResults {
  successful: number;
  failed: number;
  rate: number;
}

export interface MedUseEntry {
  medicine_name: string;
  Usage: string;
}

export interface MedCategory {
  category: string;
  medicines: string[];
}

export interface MedData {
  med_use: MedUseEntry[];
  med_category: MedCategory[];
}
