import { LaunchProps } from "@raycast/api";
import { useState } from "react";
import { TranslateForm } from "./components/TranslateForm";
import { TranslationView } from "./components/TranslationView";
import { ErrorView } from "./components/ErrorView";
import { useTranslation } from "./hooks/useTranslation";
import { getPreferences, getTranslateCommandPreferences, validatePreferences } from "./preferences";
import { ToneKey } from "./types";

interface TranslateArguments {
  text?: string;
}

export default function TranslateCommand(props: LaunchProps<{ arguments: TranslateArguments }>) {
  const validation = validatePreferences();
  if (!validation.valid) {
    return <ErrorView error={new Error(validation.error)} />;
  }

  const prefs = getPreferences();
  const cmdPrefs = getTranslateCommandPreferences();
  const { state, translate } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [currentSource, setCurrentSource] = useState(prefs.defaultSourceLanguage);
  const [currentTarget, setCurrentTarget] = useState(prefs.defaultTargetLanguage);
  const [currentText, setCurrentText] = useState(props.arguments?.text ?? "");
  const [currentTone, setCurrentTone] = useState<ToneKey>(cmdPrefs.translationTone ?? "natural");

  if (!submitted) {
    return (
      <TranslateForm
        defaultSourceLanguage={currentSource}
        defaultTargetLanguage={currentTarget}
        defaultTone={currentTone}
        defaultText={currentText}
        onSubmit={(values) => {
          setCurrentSource(values.sourceLanguage);
          setCurrentTarget(values.targetLanguage);
          setCurrentText(values.text);
          setCurrentTone(values.tone);
          setSubmitted(true);
          translate({
            text: values.text,
            sourceLanguage: values.sourceLanguage,
            targetLanguage: values.targetLanguage,
            tone: values.tone,
            showExplanation: prefs.showExplanation,
          });
        }}
      />
    );
  }

  return (
    <TranslationView
      state={state}
      sourceText={currentText}
      sourceLanguage={currentSource}
      targetLanguage={currentTarget}
      onSwapLanguages={() => {
        const newSource = state.detectedLanguage || (currentSource === "auto" ? "en" : currentSource);
        const newTarget = currentSource === "auto" ? currentTarget : currentSource;
        setCurrentSource(newTarget);
        setCurrentTarget(newSource);
        translate({
          text: state.translatedText || currentText,
          sourceLanguage: newTarget,
          targetLanguage: newSource,
          tone: currentTone,
          showExplanation: prefs.showExplanation,
        });
      }}
      onRetranslate={() => {
        translate({
          text: currentText,
          sourceLanguage: currentSource,
          targetLanguage: currentTarget,
          tone: currentTone,
          showExplanation: prefs.showExplanation,
        });
      }}
    />
  );
}
