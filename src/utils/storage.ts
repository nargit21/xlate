import { LocalStorage } from "@raycast/api";
import { HistoryEntry, TranslationResult } from "../types";
import { HISTORY_STORAGE_KEY } from "../constants";
import { getPreferences } from "../preferences";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export async function getHistory(): Promise<HistoryEntry[]> {
  const raw = await LocalStorage.getItem<string>(HISTORY_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export async function saveHistory(entries: HistoryEntry[]): Promise<void> {
  await LocalStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
}

export async function addToHistory(result: TranslationResult): Promise<void> {
  const entries = await getHistory();
  const prefs = getPreferences();
  const limit = parseInt(prefs.historyLimit, 10);

  const entry: HistoryEntry = {
    ...result,
    id: generateId(),
    favorite: false,
  };

  entries.unshift(entry);

  if (limit > 0 && entries.length > limit) {
    // Keep favorites even beyond limit
    const favorites = entries.filter((e) => e.favorite);
    const nonFavorites = entries.filter((e) => !e.favorite);
    const trimmedNonFavorites = nonFavorites.slice(0, limit);
    await saveHistory([...favorites.filter((f) => !trimmedNonFavorites.includes(f)), ...trimmedNonFavorites].sort((a, b) => b.timestamp - a.timestamp));
  } else {
    await saveHistory(entries);
  }
}

export async function toggleFavorite(id: string): Promise<HistoryEntry[]> {
  const entries = await getHistory();
  const entry = entries.find((e) => e.id === id);
  if (entry) {
    entry.favorite = !entry.favorite;
    await saveHistory(entries);
  }
  return entries;
}

export async function deleteHistoryEntry(id: string): Promise<HistoryEntry[]> {
  const entries = await getHistory();
  const filtered = entries.filter((e) => e.id !== id);
  await saveHistory(filtered);
  return filtered;
}

export async function clearHistory(): Promise<void> {
  await saveHistory([]);
}
