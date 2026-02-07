/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - API key for OpenRouter, OpenAI, or other compatible provider */
  "apiKey": string,
  /** API Base URL - API endpoint (e.g. https://openrouter.ai/api/v1, https://api.openai.com/v1, http://localhost:11434/v1) */
  "apiBaseUrl": string,
  /** Model - Model identifier (e.g. moonshotai/kimi-k2.5, gpt-4o, llama3) */
  "model": string,
  /** Default Source Language - Default source language for translations */
  "defaultSourceLanguage": "auto" | "af" | "sq" | "am" | "ar" | "hy" | "as" | "ay" | "az" | "bm" | "eu" | "be" | "bn" | "bho" | "bs" | "bg" | "my" | "ca" | "ceb" | "ny" | "zh-CN" | "zh-TW" | "co" | "hr" | "cs" | "da" | "dv" | "doi" | "nl" | "en" | "eo" | "et" | "ee" | "tl" | "fi" | "fr" | "fy" | "gl" | "ka" | "de" | "el" | "gn" | "gu" | "ht" | "ha" | "haw" | "he" | "hi" | "hmn" | "hu" | "is" | "ig" | "ilo" | "id" | "ga" | "it" | "ja" | "jv" | "kn" | "kk" | "km" | "rw" | "gom" | "ko" | "kri" | "ku" | "ckb" | "ky" | "lo" | "la" | "lv" | "ln" | "lt" | "lg" | "lb" | "mk" | "mai" | "mg" | "ms" | "ml" | "mt" | "mi" | "mr" | "mni-Mtei" | "lus" | "mn" | "ne" | "no" | "or" | "om" | "ps" | "fa" | "pl" | "pt" | "pa" | "qu" | "ro" | "ru" | "sm" | "sa" | "gd" | "nso" | "sr" | "st" | "sn" | "sd" | "si" | "sk" | "sl" | "so" | "es" | "su" | "sw" | "sv" | "tg" | "ta" | "tt" | "te" | "th" | "ti" | "ts" | "tr" | "tk" | "ak" | "uk" | "ur" | "ug" | "uz" | "vi" | "cy" | "xh" | "yi" | "yo" | "zu",
  /** Default Target Language - Default target language for translations */
  "defaultTargetLanguage": "af" | "sq" | "am" | "ar" | "hy" | "as" | "ay" | "az" | "bm" | "eu" | "be" | "bn" | "bho" | "bs" | "bg" | "my" | "ca" | "ceb" | "ny" | "zh-CN" | "zh-TW" | "co" | "hr" | "cs" | "da" | "dv" | "doi" | "nl" | "en" | "eo" | "et" | "ee" | "tl" | "fi" | "fr" | "fy" | "gl" | "ka" | "de" | "el" | "gn" | "gu" | "ht" | "ha" | "haw" | "he" | "hi" | "hmn" | "hu" | "is" | "ig" | "ilo" | "id" | "ga" | "it" | "ja" | "jv" | "kn" | "kk" | "km" | "rw" | "gom" | "ko" | "kri" | "ku" | "ckb" | "ky" | "lo" | "la" | "lv" | "ln" | "lt" | "lg" | "lb" | "mk" | "mai" | "mg" | "ms" | "ml" | "mt" | "mi" | "mr" | "mni-Mtei" | "lus" | "mn" | "ne" | "no" | "or" | "om" | "ps" | "fa" | "pl" | "pt" | "pa" | "qu" | "ro" | "ru" | "sm" | "sa" | "gd" | "nso" | "sr" | "st" | "sn" | "sd" | "si" | "sk" | "sl" | "so" | "es" | "su" | "sw" | "sv" | "tg" | "ta" | "tt" | "te" | "th" | "ti" | "ts" | "tr" | "tk" | "ak" | "uk" | "ur" | "ug" | "uz" | "vi" | "cy" | "xh" | "yi" | "yo" | "zu",
  /** Show Explanation - Show AI explanation of translation choices */
  "showExplanation": boolean,
  /** History Limit - Maximum number of translation history entries */
  "historyLimit": "50" | "100" | "200" | "500" | "0"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `translate` command */
  export type Translate = ExtensionPreferences & {
  /** Translation Tone - Default tone/style for translations */
  "translationTone": "natural" | "formal" | "casual" | "technical" | "literary" | "business"
}
  /** Preferences accessible in the `translate-selected` command */
  export type TranslateSelected = ExtensionPreferences & {}
  /** Preferences accessible in the `translate-clipboard` command */
  export type TranslateClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `quick-translate` command */
  export type QuickTranslate = ExtensionPreferences & {}
  /** Preferences accessible in the `history` command */
  export type History = ExtensionPreferences & {}
  /** Preferences accessible in the `proofread` command */
  export type Proofread = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `translate` command */
  export type Translate = {
  /** Text to translate */
  "text": string
}
  /** Arguments passed to the `translate-selected` command */
  export type TranslateSelected = {}
  /** Arguments passed to the `translate-clipboard` command */
  export type TranslateClipboard = {}
  /** Arguments passed to the `quick-translate` command */
  export type QuickTranslate = {}
  /** Arguments passed to the `history` command */
  export type History = {}
  /** Arguments passed to the `proofread` command */
  export type Proofread = {}
}

