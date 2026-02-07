export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  tone: ToneKey;
  showExplanation: boolean;
}

export interface TranslationResult {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  detectedLanguage?: string;
  explanation?: string;
  tone: ToneKey;
  timestamp: number;
}

export interface HistoryEntry extends TranslationResult {
  id: string;
  favorite: boolean;
}

export type ToneKey = "natural" | "formal" | "casual" | "technical" | "literary" | "business";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationState {
  isLoading: boolean;
  streamedText: string;
  translatedText: string;
  explanation?: string;
  detectedLanguage?: string;
  error?: string;
}

export interface Preferences {
  apiKey: string;
  apiBaseUrl: string;
  model: string;
  defaultSourceLanguage: string;
  defaultTargetLanguage: string;
  showExplanation: boolean;
  historyLimit: string;
}

export interface TranslateCommandPreferences {
  translationTone: ToneKey;
}
