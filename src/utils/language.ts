import { LANGUAGES } from "../constants";
import { Language } from "../types";

const codeToLanguage = new Map<string, Language>(LANGUAGES.map((l) => [l.code, l]));

export function getLanguageName(code: string): string {
  return codeToLanguage.get(code)?.name ?? code;
}

export function getLanguageFlag(code: string): string {
  return codeToLanguage.get(code)?.flag ?? "";
}

export function getLanguageByCode(code: string): Language | undefined {
  return codeToLanguage.get(code);
}

export function formatLanguagePair(source: string, target: string): string {
  const sourceFlag = getLanguageFlag(source);
  const targetFlag = getLanguageFlag(target);
  const sourceName = getLanguageName(source);
  const targetName = getLanguageName(target);

  return `${sourceFlag} ${sourceName} → ${targetFlag} ${targetName}`;
}
