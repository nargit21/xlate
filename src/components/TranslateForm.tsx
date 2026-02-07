import { Action, ActionPanel, Form, Icon } from "@raycast/api";
import { LANGUAGES, TONE_LABELS } from "../constants";
import { ToneKey } from "../types";

interface TranslateFormProps {
  defaultSourceLanguage: string;
  defaultTargetLanguage: string;
  defaultTone: ToneKey;
  defaultText?: string;
  onSubmit: (values: { text: string; sourceLanguage: string; targetLanguage: string; tone: ToneKey }) => void;
}

export function TranslateForm({ defaultSourceLanguage, defaultTargetLanguage, defaultTone, defaultText, onSubmit }: TranslateFormProps) {
  const sourceLanguages = LANGUAGES;
  const targetLanguages = LANGUAGES.filter((l) => l.code !== "auto");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Translate"
            icon={Icon.Globe}
            onSubmit={(values) =>
              onSubmit({
                text: values.text,
                sourceLanguage: values.sourceLanguage,
                targetLanguage: values.targetLanguage,
                tone: values.tone as ToneKey,
              })
            }
          />
        </ActionPanel>
      }
    >
      <Form.TextArea id="text" title="Text" placeholder="Enter text to translate..." defaultValue={defaultText} autoFocus />
      <Form.Separator />
      <Form.Dropdown id="sourceLanguage" title="From" defaultValue={defaultSourceLanguage} storeValue>
        {sourceLanguages.map((lang) => (
          <Form.Dropdown.Item key={lang.code} value={lang.code} title={`${lang.flag} ${lang.name}`.trim()} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="targetLanguage" title="To" defaultValue={defaultTargetLanguage} storeValue>
        {targetLanguages.map((lang) => (
          <Form.Dropdown.Item key={lang.code} value={lang.code} title={`${lang.flag} ${lang.name}`} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="tone" title="Tone" defaultValue={defaultTone} storeValue>
        {(Object.entries(TONE_LABELS) as [ToneKey, string][]).map(([key, label]) => (
          <Form.Dropdown.Item key={key} value={key} title={label} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
