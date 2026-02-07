# Xlate — AI-Powered Translator for Raycast

Translate text between 133 languages using LLMs. Works with OpenRouter, OpenAI, Ollama, and any OpenAI-compatible API.

## Features

- **Streaming translations** — see results as they arrive
- **133 languages** with automatic language detection
- **6 translation tones** — Natural, Formal, Casual, Technical, Literary, Business
- **Multiple input methods** — type text, use selected text, or translate from clipboard
- **Quick Translate** — instantly translate selected text and copy to clipboard (no UI)
- **Translation History** — searchable list with favorites
- **Proofread & Improve** — fix grammar and style using AI
- **Any provider** — OpenRouter, OpenAI, Ollama, LM Studio, or any OpenAI-compatible endpoint

## Commands

| Command | Description |
|---------|-------------|
| **Translate** | Form to enter text, pick languages and tone, view streaming result |
| **Translate Selected Text** | Grabs selected text and auto-translates |
| **Translate Clipboard** | Reads clipboard and auto-translates |
| **Quick Translate** | Translates selected text in background, copies result to clipboard |
| **Translation History** | Browse, search, and favorite past translations |
| **Proofread & Improve** | Improve grammar and style of selected text |

## Setup

1. Install the extension from Raycast Store (or run `npm install && npm run dev` for development)
2. Open Raycast and go to the extension preferences
3. Set your **API Key** (from OpenRouter, OpenAI, etc.)
4. Optionally adjust the **API Base URL** and **Model**

### Provider Examples

| Provider | API Base URL | Model Example |
|----------|-------------|---------------|
| OpenRouter | `https://openrouter.ai/api/v1` | `moonshotai/kimi-k2.5` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o` |
| Ollama | `http://localhost:11434/v1` | `llama3` |
| LM Studio | `http://localhost:1234/v1` | `local-model` |

## Preferences

| Setting | Default | Description |
|---------|---------|-------------|
| API Key | — | Your API key (required) |
| API Base URL | `https://openrouter.ai/api/v1` | API endpoint |
| Model | `moonshotai/kimi-k2.5` | Model identifier |
| Source Language | Auto-detect | Default source language |
| Target Language | English | Default target language |
| Show Explanation | Off | Show AI notes about translation choices |
| History Limit | 100 | Max saved translations (favorites are always preserved) |
| Translation Tone | Natural | Per-command tone preference |

## Supported Languages

Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Aymara, Azerbaijani, Bambara, Basque, Belarusian, Bengali, Bhojpuri, Bosnian, Bulgarian, Burmese, Catalan, Cebuano, Chichewa, Chinese (Simplified), Chinese (Traditional), Corsican, Croatian, Czech, Danish, Dhivehi, Dogri, Dutch, English, Esperanto, Estonian, Ewe, Filipino, Finnish, French, Frisian, Galician, Georgian, German, Greek, Guarani, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hmong, Hungarian, Icelandic, Igbo, Ilocano, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Kinyarwanda, Konkani, Korean, Krio, Kurdish (Kurmanji), Kurdish (Sorani), Kyrgyz, Lao, Latin, Latvian, Lingala, Lithuanian, Luganda, Luxembourgish, Macedonian, Maithili, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Meiteilon, Mizo, Mongolian, Nepali, Norwegian, Odia, Oromo, Pashto, Persian, Polish, Portuguese, Punjabi, Quechua, Romanian, Russian, Samoan, Sanskrit, Scots Gaelic, Sepedi, Serbian, Sesotho, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tajik, Tamil, Tatar, Telugu, Thai, Tigrinya, Tsonga, Turkish, Turkmen, Twi, Ukrainian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, Zulu

## Development

```bash
npm install
npm run dev
```

## License

MIT
