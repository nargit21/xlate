import { Action, ActionPanel, Alert, Clipboard, Color, confirmAlert, Icon, List, showHUD } from "@raycast/api";
import { useState } from "react";
import { useHistory } from "./hooks/useHistory";
import { getLanguageFlag, getLanguageName } from "./utils/language";

type FilterType = "all" | "favorites";

export default function HistoryCommand() {
  const { entries, isLoading, toggleFavorite, deleteEntry, clearAll, clearNonFavorites } = useHistory();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "favorites" ? entries.filter((e) => e.favorite) : entries;

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search translations..."
      searchBarAccessory={
        <List.Dropdown tooltip="Filter" storeValue onChange={(value) => setFilter(value as FilterType)}>
          <List.Dropdown.Item title="All" value="all" />
          <List.Dropdown.Item title="Favorites" value="favorites" />
        </List.Dropdown>
      }
    >
      {filtered.length === 0 ? (
        <List.EmptyView title={filter === "favorites" ? "No Favorites" : "No Translation History"} description={filter === "favorites" ? "Star translations to add them to favorites" : "Translations will appear here after you translate text"} />
      ) : (
        filtered.map((entry) => {
          const effectiveSource = entry.detectedLanguage || entry.sourceLanguage;
          const sourceFlag = getLanguageFlag(effectiveSource);
          const targetFlag = getLanguageFlag(entry.targetLanguage);
          const sourceName = getLanguageName(effectiveSource);
          const targetName = getLanguageName(entry.targetLanguage);
          const date = new Date(entry.timestamp);
          const dateStr = date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

          return (
            <List.Item
              key={entry.id}
              title={entry.sourceText.length > 60 ? entry.sourceText.substring(0, 60) + "..." : entry.sourceText}
              subtitle={entry.translatedText.length > 60 ? entry.translatedText.substring(0, 60) + "..." : entry.translatedText}
              accessories={[
                ...(entry.favorite ? [{ icon: { source: Icon.Star, tintColor: Color.Yellow } }] : []),
                { text: `${sourceFlag} ${sourceName} → ${targetFlag} ${targetName}` },
                { text: dateStr },
              ]}
              actions={
                <ActionPanel>
                  <Action
                    title="Copy Translation"
                    icon={Icon.Clipboard}
                    onAction={async () => {
                      await Clipboard.copy(entry.translatedText);
                      await showHUD("Copied translation");
                    }}
                  />
                  <Action
                    title="Paste Translation"
                    icon={Icon.Document}
                    onAction={async () => {
                      await Clipboard.paste(entry.translatedText);
                    }}
                  />
                  <Action
                    title="Copy Source"
                    icon={Icon.TextCursor}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                    onAction={async () => {
                      await Clipboard.copy(entry.sourceText);
                      await showHUD("Copied source text");
                    }}
                  />
                  <Action
                    title={entry.favorite ? "Unfavorite" : "Favorite"}
                    icon={entry.favorite ? Icon.StarDisabled : Icon.Star}
                    shortcut={{ modifiers: ["cmd"], key: "f" }}
                    onAction={() => toggleFavorite(entry.id)}
                  />
                  <Action
                    title="Delete"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    shortcut={{ modifiers: ["ctrl"], key: "x" }}
                    onAction={() => deleteEntry(entry.id)}
                  />
                  <Action
                    title="Clear All History"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "delete" }}
                    onAction={async () => {
                      const confirmed = await confirmAlert({
                        title: "Clear All History?",
                        message: "This will delete all translation history. Favorites will also be removed.",
                        primaryAction: { title: "Clear All", style: Alert.ActionStyle.Destructive },
                      });
                      if (confirmed) await clearAll();
                    }}
                  />
                  <Action
                    title="Clear Non-favorites"
                    icon={Icon.Eraser}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "backspace" }}
                    onAction={async () => {
                      const confirmed = await confirmAlert({
                        title: "Clear Non-Favorites?",
                        message: "This will delete all non-favorite translations. Favorites will be preserved.",
                        primaryAction: { title: "Clear", style: Alert.ActionStyle.Destructive },
                      });
                      if (confirmed) await clearNonFavorites();
                    }}
                  />
                </ActionPanel>
              }
            />
          );
        })
      )}
    </List>
  );
}
