import { getPreferenceValues } from "@raycast/api";
import { Preferences, TranslateCommandPreferences } from "./types";

export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}

export function getTranslateCommandPreferences(): TranslateCommandPreferences {
  return getPreferenceValues<TranslateCommandPreferences>();
}

export function validatePreferences(): { valid: boolean; error?: string } {
  const prefs = getPreferences();

  if (!prefs.apiBaseUrl || prefs.apiBaseUrl.trim() === "") {
    return { valid: false, error: "API base URL is required. Please set it in extension preferences." };
  }

  try {
    new URL(prefs.apiBaseUrl);
  } catch {
    return { valid: false, error: `Invalid API base URL: "${prefs.apiBaseUrl}". Please enter a valid URL.` };
  }

  if (!prefs.model || prefs.model.trim() === "") {
    return { valid: false, error: "Model name is required. Please set it in extension preferences." };
  }

  return { valid: true };
}
