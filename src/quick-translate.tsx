import { Clipboard, getSelectedText, showHUD, showToast, Toast } from "@raycast/api";
import { getPreferences, getTranslateCommandPreferences, validatePreferences } from "./preferences";
import { translateSync } from "./api/translate";
import { ToneKey } from "./types";
import { classifyError } from "./utils/errors";
import { addToHistory } from "./utils/storage";

export default async function QuickTranslateCommand() {
  const validation = validatePreferences();
  if (!validation.valid) {
    await showHUD(`❌ ${validation.error}`);
    return;
  }

  const prefs = getPreferences();
  const cmdPrefs = getTranslateCommandPreferences();
  const tone: ToneKey = cmdPrefs.translationTone ?? "natural";

  let selectedText: string;
  try {
    selectedText = await getSelectedText();
    selectedText = selectedText.trim();
  } catch {
    await showHUD("❌ No text selected");
    return;
  }

  if (!selectedText) {
    await showHUD("❌ No text selected");
    return;
  }

  await showToast({ style: Toast.Style.Animated, title: "Translating..." });

  try {
    const fullText = await translateSync({
      text: selectedText,
      sourceLanguage: prefs.defaultSourceLanguage,
      targetLanguage: prefs.defaultTargetLanguage,
      tone,
      showExplanation: false,
    });

    // Strip detected language marker
    const cleaned = fullText.replace(/^\[detected:[a-zA-Z-]+\]\s*/, "").trim();

    if (!cleaned) {
      await showHUD("❌ Empty translation result");
      return;
    }

    await Clipboard.copy(cleaned);

    // Save to history
    const detectedMatch = fullText.match(/^\[detected:([a-zA-Z-]+)\]/);
    await addToHistory({
      sourceText: selectedText,
      translatedText: cleaned,
      sourceLanguage: prefs.defaultSourceLanguage,
      targetLanguage: prefs.defaultTargetLanguage,
      detectedLanguage: detectedMatch?.[1]?.toLowerCase(),
      tone,
      timestamp: Date.now(),
    });

    await showHUD("✅ Translation copied to clipboard");
  } catch (error) {
    const { title } = classifyError(error);
    await showHUD(`❌ ${title}`);
  }
}
