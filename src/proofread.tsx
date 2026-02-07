import { Detail, Action, ActionPanel, Clipboard, Icon, openExtensionPreferences, showHUD } from "@raycast/api";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSelectedText } from "./hooks/useSourceText";
import { ErrorView } from "./components/ErrorView";
import { getPreferences, validatePreferences } from "./preferences";
import { getClient } from "./api/client";
import { DEFAULT_TEMPERATURE } from "./constants";
import { formatProofreadMarkdown } from "./utils/markdown";
import { classifyError } from "./utils/errors";

export default function ProofreadCommand() {
  const validation = validatePreferences();
  if (!validation.valid) {
    return <ErrorView error={new Error(validation.error)} />;
  }

  const prefs = getPreferences();
  const { data: selectedText, isLoading: isLoadingText } = useSelectedText();

  const [isLoading, setIsLoading] = useState(false);
  const [improvedText, setImprovedText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const [error, setError] = useState<string>();
  const [started, setStarted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const proofread = useCallback(
    async (text: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setImprovedText("");
      setError(undefined);

      const systemPrompt = `You are a professional proofreader and editor. Your task is to improve the given text's grammar, spelling, punctuation, and style while preserving the original meaning and intent.

First, detect the language of the text and output the language code on the first line in this format: [detected:XX]

Then output the improved text. Make corrections for:
- Grammar and syntax errors
- Spelling mistakes
- Punctuation issues
- Awkward phrasing
- Clarity improvements

Preserve the original tone and style. Do not add new content or change the meaning. If the text is already well-written, return it with minimal changes.

After the improved text, add a separator "---" and briefly list the changes you made.`;

      try {
        const client = getClient();
        let fullText = "";

        const stream = await client.chat.completions.create(
          {
            model: prefs.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: text },
            ],
            temperature: DEFAULT_TEMPERATURE,
            stream: true,
          },
          { signal: controller.signal }
        );

        for await (const chunk of stream) {
          if (controller.signal.aborted) break;
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            // Parse out detected language marker
            let processed = fullText;
            const langMatch = processed.match(/^\[detected:([a-zA-Z-]+)\]\s*/);
            if (langMatch) {
              setDetectedLanguage(langMatch[1].toLowerCase());
              processed = processed.replace(/^\[detected:[a-zA-Z-]+\]\s*/, "");
            }
            // Split at separator
            const sepIndex = processed.indexOf("\n---\n");
            if (sepIndex !== -1) {
              setImprovedText(processed.substring(0, sepIndex).trim());
            } else {
              setImprovedText(processed.trim());
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        const { message } = classifyError(err);
        setError(message);
        setIsLoading(false);
      }
    },
    [prefs.model]
  );

  useEffect(() => {
    if (!isLoadingText && selectedText && !started) {
      setStarted(true);
      proofread(selectedText);
    }
  }, [isLoadingText, selectedText, started, proofread]);

  if (isLoadingText) {
    return <Detail isLoading markdown="*Getting selected text...*" />;
  }

  if (!selectedText) {
    return <ErrorView error={new Error("No text selected. Please select some text and try again.")} />;
  }

  if (error) {
    return <ErrorView error={new Error(error)} />;
  }

  const markdown = formatProofreadMarkdown({
    originalText: selectedText,
    improvedText,
    language: detectedLanguage,
    isLoading,
  });

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          {improvedText && (
            <>
              <Action
                title="Copy Improved Text"
                icon={Icon.Clipboard}
                onAction={async () => {
                  await Clipboard.copy(improvedText);
                  await showHUD("Copied improved text");
                }}
              />
              <Action
                title="Paste Improved Text"
                icon={Icon.Document}
                onAction={async () => {
                  await Clipboard.paste(improvedText);
                }}
              />
              <Action
                title="Copy Original"
                icon={Icon.TextCursor}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                onAction={async () => {
                  await Clipboard.copy(selectedText);
                  await showHUD("Copied original text");
                }}
              />
            </>
          )}
          <Action
            title="Re-proofread"
            icon={Icon.RotateClockwise}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
            onAction={() => proofread(selectedText)}
          />
          <Action title="Open Preferences" icon={Icon.Gear} shortcut={{ modifiers: ["cmd", "shift"], key: "," }} onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
