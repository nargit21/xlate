import { Clipboard, getSelectedText } from "@raycast/api";
import { usePromise } from "@raycast/utils";

export function useSelectedText() {
  return usePromise(async () => {
    try {
      const text = await getSelectedText();
      return text.trim();
    } catch {
      return "";
    }
  });
}

export function useClipboardText() {
  return usePromise(async () => {
    try {
      const content = await Clipboard.readText();
      return content?.trim() ?? "";
    } catch {
      return "";
    }
  });
}
