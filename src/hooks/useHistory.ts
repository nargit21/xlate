import { useCallback, useEffect, useState } from "react";
import { HistoryEntry } from "../types";
import { getHistory, toggleFavorite, deleteHistoryEntry, clearHistory, saveHistory } from "../utils/storage";

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const history = await getHistory();
    setEntries(history);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async (id: string) => {
    const updated = await toggleFavorite(id);
    setEntries(updated);
  }, []);

  const remove = useCallback(async (id: string) => {
    const updated = await deleteHistoryEntry(id);
    setEntries(updated);
  }, []);

  const clear = useCallback(async () => {
    await clearHistory();
    setEntries([]);
  }, []);

  const clearNonFavorites = useCallback(async () => {
    const history = await getHistory();
    const favorites = history.filter((e) => e.favorite);
    await saveHistory(favorites);
    setEntries(favorites);
  }, []);

  return {
    entries,
    isLoading,
    refresh,
    toggleFavorite: toggle,
    deleteEntry: remove,
    clearAll: clear,
    clearNonFavorites,
  };
}
