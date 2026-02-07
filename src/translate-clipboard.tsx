import { Detail } from "@raycast/api";
import { useState, useEffect } from "react";
import { TranslationView } from "./components/TranslationView";
import { ErrorView } from "./components/ErrorView";
import { useTranslation } from "./hooks/useTranslation";
import { useClipboardText } from "./hooks/useSourceText";
import { getPreferences, getTranslateCommandPreferences, validatePreferences } from "./preferences";
import { ToneKey } from "./types";

export default function TranslateClipboardCommand() {
  const validation = validatePreferences();
  if (!validation.valid) {
    return <ErrorView error={new Error(validation.error)} />;
  }

  const prefs = getPreferences();
  const cmdPrefs = getTranslateCommandPreferences();
  const { data: clipboardText, isLoading: isLoadingText } = useClipboardText();
  const { state, translate } = useTranslation();

  const [currentSource, setCurrentSource] = useState(prefs.defaultSourceLanguage);
  const [currentTarget, setCurrentTarget] = useState(prefs.defaultTargetLanguage);
  const [sourceText, setSourceText] = useState("");
  const tone: ToneKey = cmdPrefs.translationTone ?? "natural";
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isLoadingText && clipboardText && !started) {
      setSourceText(clipboardText);
      setStarted(true);
      translate({
        text: clipboardText,
        sourceLanguage: prefs.defaultSourceLanguage,
        targetLanguage: prefs.defaultTargetLanguage,
        tone,
        showExplanation: prefs.showExplanation,
      });
    }
  }, [isLoadingText, clipboardText, started]);

  if (isLoadingText) {
    return <Detail isLoading markdown="*Reading clipboard...*" />;
  }

  if (!clipboardText) {
    return <ErrorView error={new Error("Clipboard is empty. Please copy some text and try again.")} />;
  }

  return (
    <TranslationView
      state={state}
      sourceText={sourceText}
      sourceLanguage={currentSource}
      targetLanguage={currentTarget}
      onSwapLanguages={() => {
        const newSource = state.detectedLanguage || (currentSource === "auto" ? "en" : currentSource);
        const newTarget = currentSource === "auto" ? currentTarget : currentSource;
        setCurrentSource(newTarget);
        setCurrentTarget(newSource);
        translate({
          text: state.translatedText || sourceText,
          sourceLanguage: newTarget,
          targetLanguage: newSource,
          tone,
          showExplanation: prefs.showExplanation,
        });
      }}
      onRetranslate={() => {
        translate({
          text: sourceText,
          sourceLanguage: currentSource,
          targetLanguage: currentTarget,
          tone,
          showExplanation: prefs.showExplanation,
        });
      }}
    />
  );
}
