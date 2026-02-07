import { useCallback, useRef, useState } from "react";
import { TranslationRequest, TranslationResult, TranslationState, ToneKey } from "../types";
import { translateStream } from "../api/translate";
import { addToHistory } from "../utils/storage";

const DETECTED_LANG_REGEX = /^\s*\[detected:\s*([a-zA-Z-]+)\s*\]\s*/;
const SEPARATOR_REGEX = /\n---\n/;

export function stripDetectedMarker(text: string): string {
  return text.replace(DETECTED_LANG_REGEX, "").replace(/^\s*\[detected:\s*[a-zA-Z-]+\s*\]/gm, "").trim();
}

function parseStreamedText(raw: string): {
  translatedText: string;
  explanation?: string;
  detectedLanguage?: string;
} {
  let text = raw;
  let detectedLanguage: string | undefined;

  const match = text.match(DETECTED_LANG_REGEX);
  if (match) {
    detectedLanguage = match[1].toLowerCase();
    text = text.replace(DETECTED_LANG_REGEX, "");
  }

  // Also catch markers anywhere in text (some models put it on its own line)
  text = text.replace(/^\s*\[detected:\s*[a-zA-Z-]+\s*\]\s*/gm, "");

  const sepMatch = text.match(SEPARATOR_REGEX);
  let translatedText: string;
  let explanation: string | undefined;

  if (sepMatch && sepMatch.index !== undefined) {
    translatedText = text.substring(0, sepMatch.index).trim();
    explanation = text.substring(sepMatch.index + sepMatch[0].length).trim();
  } else {
    translatedText = text.trim();
  }

  return { translatedText, explanation, detectedLanguage };
}

export function useTranslation() {
  const [state, setState] = useState<TranslationState>({
    isLoading: false,
    streamedText: "",
    translatedText: "",
  });

  const abortRef = useRef<AbortController | null>(null);

  const translate = useCallback(
    async (request: TranslationRequest) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({
        isLoading: true,
        streamedText: "",
        translatedText: "",
        explanation: undefined,
        detectedLanguage: undefined,
        error: undefined,
      });

      await translateStream(
        request,
        {
          onChunk: (fullText) => {
            const parsed = parseStreamedText(fullText);
            setState((prev) => ({
              ...prev,
              streamedText: fullText,
              translatedText: parsed.translatedText,
              explanation: parsed.explanation,
              detectedLanguage: parsed.detectedLanguage,
            }));
          },
          onComplete: async (fullText) => {
            const parsed = parseStreamedText(fullText);
            setState((prev) => ({
              ...prev,
              isLoading: false,
              streamedText: fullText,
              translatedText: parsed.translatedText,
              explanation: parsed.explanation,
              detectedLanguage: parsed.detectedLanguage,
            }));

            if (parsed.translatedText) {
              const result: TranslationResult = {
                sourceText: request.text,
                translatedText: parsed.translatedText,
                sourceLanguage: request.sourceLanguage,
                targetLanguage: request.targetLanguage,
                detectedLanguage: parsed.detectedLanguage,
                explanation: parsed.explanation,
                tone: request.tone,
                timestamp: Date.now(),
              };
              await addToHistory(result);
            }
          },
          onError: (error) => {
            if (controller.signal.aborted) return;
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: error.message,
            }));
          },
        },
        controller.signal
      );
    },
    []
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({
      isLoading: false,
      streamedText: "",
      translatedText: "",
      explanation: undefined,
      detectedLanguage: undefined,
      error: undefined,
    });
  }, []);

  return {
    state,
    translate,
    abort,
    reset,
  };
}

export function useQuickTranslation() {
  const abortRef = useRef<AbortController | null>(null);

  const translate = useCallback(
    async (text: string, sourceLanguage: string, targetLanguage: string, tone: ToneKey): Promise<string> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      return new Promise<string>((resolve, reject) => {
        translateStream(
          {
            text,
            sourceLanguage,
            targetLanguage,
            tone,
            showExplanation: false,
          },
          {
            onChunk: () => {},
            onComplete: (fullText) => {
              const parsed = parseStreamedText(fullText);
              resolve(parsed.translatedText);
            },
            onError: reject,
          },
          controller.signal
        );
      });
    },
    []
  );

  return { translate };
}
