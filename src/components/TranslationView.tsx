import { Action, ActionPanel, Clipboard, Detail, Icon, openExtensionPreferences, showHUD } from "@raycast/api";
import { TranslationState } from "../types";
import { formatTranslationMarkdown } from "../utils/markdown";
import { stripDetectedMarker } from "../hooks/useTranslation";

interface TranslationViewProps {
  state: TranslationState;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  onSwapLanguages?: () => void;
  onRetranslate?: () => void;
}

export function TranslationView({ state, sourceText, sourceLanguage, targetLanguage, onSwapLanguages, onRetranslate }: TranslationViewProps) {
  const { isLoading, translatedText, explanation, detectedLanguage, error } = state;

  if (error) {
    const markdown = `# Translation Error\n\n${error}\n\n---\n\n**Common fixes:**\n- Check your API key in extension preferences\n- Verify the API base URL is correct\n- Ensure the model name is valid for your provider`;
    return (
      <Detail
        markdown={markdown}
        actions={
          <ActionPanel>
            {onRetranslate && <Action title="Retry" icon={Icon.RotateClockwise} onAction={onRetranslate} />}
            <Action title="Open Preferences" icon={Icon.Gear} onAction={openExtensionPreferences} />
          </ActionPanel>
        }
      />
    );
  }

  const markdown = formatTranslationMarkdown({
    sourceText,
    translatedText,
    sourceLanguage,
    targetLanguage,
    detectedLanguage,
    explanation,
    isLoading,
  });

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          {translatedText && (
            <>
              <Action
                title="Copy Translation"
                icon={Icon.Clipboard}
                onAction={async () => {
                  await Clipboard.copy(stripDetectedMarker(translatedText));
                  await showHUD("Copied translation");
                }}
              />
              <Action
                title="Paste Translation"
                icon={Icon.Document}
                onAction={async () => {
                  await Clipboard.paste(stripDetectedMarker(translatedText));
                }}
              />
              <Action
                title="Copy Source"
                icon={Icon.TextCursor}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                onAction={async () => {
                  await Clipboard.copy(sourceText);
                  await showHUD("Copied source text");
                }}
              />
            </>
          )}
          {onSwapLanguages && (
            <Action title="Swap Languages & Re-translate" icon={Icon.Switch} shortcut={{ modifiers: ["cmd"], key: "s" }} onAction={onSwapLanguages} />
          )}
          {onRetranslate && <Action title="Re-translate" icon={Icon.RotateClockwise} shortcut={{ modifiers: ["cmd"], key: "r" }} onAction={onRetranslate} />}
          <Action title="Open Preferences" icon={Icon.Gear} shortcut={{ modifiers: ["cmd", "shift"], key: "," }} onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
