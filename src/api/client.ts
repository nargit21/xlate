import OpenAI from "openai";
import { getPreferences } from "../preferences";

let clientInstance: OpenAI | null = null;
let lastApiKey = "";
let lastBaseUrl = "";

export function getClient(): OpenAI {
  const prefs = getPreferences();
  const apiKey = prefs.apiKey;
  const baseURL = prefs.apiBaseUrl;

  if (clientInstance && apiKey === lastApiKey && baseURL === lastBaseUrl) {
    return clientInstance;
  }

  clientInstance = new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
      "HTTP-Referer": "https://raycast.com",
      "X-Title": "xlate - Raycast Translator",
    },
  });

  lastApiKey = apiKey;
  lastBaseUrl = baseURL;

  return clientInstance;
}
