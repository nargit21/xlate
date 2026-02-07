import { Action, ActionPanel, Detail, openExtensionPreferences } from "@raycast/api";
import { classifyError } from "../utils/errors";

interface ErrorViewProps {
  error: unknown;
}

export function ErrorView({ error }: ErrorViewProps) {
  const { title, message } = classifyError(error);

  const markdown = `# ${title}\n\n${message}\n\n---\n\n**Common fixes:**\n- Check your API key in extension preferences\n- Verify the API base URL is correct\n- Ensure the model name is valid for your provider\n- Check your internet connection`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
