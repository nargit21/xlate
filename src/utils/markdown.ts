import { getLanguageName, getLanguageFlag } from "./language";

export function formatTranslationMarkdown(opts: {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  detectedLanguage?: string;
  explanation?: string;
  isLoading?: boolean;
}): string {
  const { sourceText, translatedText, sourceLanguage, targetLanguage, detectedLanguage, explanation, isLoading } = opts;

  const effectiveSource = detectedLanguage || sourceLanguage;
  const sourceFlag = getLanguageFlag(effectiveSource);
  const targetFlag = getLanguageFlag(targetLanguage);
  const sourceName = detectedLanguage ? `${getLanguageName(detectedLanguage)} (detected)` : getLanguageName(sourceLanguage);
  const targetName = getLanguageName(targetLanguage);

  const parts: string[] = [];

  // Source text (collapsed if long)
  if (sourceText.length > 200) {
    parts.push(`> **Source** (${sourceFlag} ${sourceName})`);
    parts.push(`> ${sourceText.substring(0, 200).replace(/\n/g, "\n> ")}...`);
  } else {
    parts.push(`> **Source** (${sourceFlag} ${sourceName})`);
    parts.push(`> ${sourceText.replace(/\n/g, "\n> ")}`);
  }

  parts.push("");
  parts.push(`### ${sourceFlag} ${sourceName} → ${targetFlag} ${targetName}`);
  parts.push("");

  // Translation
  if (translatedText) {
    parts.push(translatedText);
  } else if (isLoading) {
    parts.push("*Translating...*");
  }

  // Explanation
  if (explanation) {
    parts.push("");
    parts.push("---");
    parts.push("");
    parts.push("**Translation Notes**");
    parts.push("");
    parts.push(explanation);
  }

  return parts.join("\n");
}

export function formatProofreadMarkdown(opts: {
  originalText: string;
  improvedText: string;
  language: string;
  isLoading?: boolean;
}): string {
  const { originalText, improvedText, language, isLoading } = opts;

  const flag = getLanguageFlag(language);
  const name = getLanguageName(language);

  const parts: string[] = [];

  parts.push(`### ${flag} ${name} — Proofread & Improve`);
  parts.push("");

  if (originalText.length > 200) {
    parts.push(`> **Original**`);
    parts.push(`> ${originalText.substring(0, 200).replace(/\n/g, "\n> ")}...`);
  } else {
    parts.push(`> **Original**`);
    parts.push(`> ${originalText.replace(/\n/g, "\n> ")}`);
  }

  parts.push("");

  if (improvedText) {
    parts.push("**Improved**");
    parts.push("");
    parts.push(improvedText);
  } else if (isLoading) {
    parts.push("*Proofreading...*");
  }

  return parts.join("\n");
}
