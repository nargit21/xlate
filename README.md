# Xlate — AI-Powered Translator for Raycast

The most flexible translator for Raycast. Translate text between **133 languages** using any LLM — powered by the OpenAI SDK, so it works with **every OpenAI-compatible API** out of the box.

**OpenRouter, OpenAI, Google Gemini, Anthropic Claude, Mistral, Groq, Together AI, Perplexity, DeepSeek, Cohere, Fireworks AI, AI21, Ollama, LM Studio, LocalAI, vLLM, text-generation-webui, Jan, GPT4All, Kobold.cpp, LiteLLM** — if it speaks the OpenAI API, Xlate works with it. Just set the base URL and model name.

## Why Xlate?

- **Use any LLM you want** — not locked into one provider. Switch between cloud and local models freely
- **Privacy-first option** — run translations entirely offline with Ollama or LM Studio
- **Streaming results** — see the translation appear word by word, no waiting
- **Smart auto-detection** — automatically detects the source language
- **Tone control** — same text, different style: formal emails, casual chat, technical docs
- **Zero config for local models** — no API key needed for Ollama, LM Studio, and other local providers

## Features

- **133 languages** with automatic language detection
- **6 translation tones** — Natural, Formal, Casual, Technical, Literary, Business
- **Streaming output** — real-time translation as the LLM generates
- **Multiple input methods** — type text, translate selected text, or translate from clipboard
- **Quick Translate** — one shortcut to translate selected text and copy to clipboard instantly
- **Translation History** — searchable, with favorites that persist forever
- **Proofread & Improve** — fix grammar, spelling, and style in any language
- **Translation explanations** — optional AI notes about nuances and alternatives
- **Works offline** — pair with Ollama or any local model for fully offline translation

## Commands

| Command | Description |
|---------|-------------|
| **Translate** | Enter text, pick languages and tone, view streaming result |
| **Translate Selected Text** | Select text in any app, trigger command, get instant translation |
| **Translate Clipboard** | Translate whatever is in your clipboard |
| **Quick Translate** | Translate selected text silently, result copied to clipboard |
| **Translation History** | Browse, search, favorite, and re-use past translations |
| **Proofread & Improve** | AI-powered grammar and style improvements |

## Setup

1. Install the extension from Raycast Store
2. Open extension preferences in Raycast
3. Set your **API Base URL** and **Model**
4. Add your **API Key** (not needed for local models)

### Compatible Providers

Xlate uses the OpenAI SDK under the hood, which means it works with **any provider that exposes an OpenAI-compatible `/v1/chat/completions` endpoint**. Here are some examples:

| Provider | API Base URL | Model Example | API Key |
|----------|-------------|---------------|---------|
| **OpenRouter** | `https://openrouter.ai/api/v1` | `moonshotai/kimi-k2.5` | Required |
| **OpenAI** | `https://api.openai.com/v1` | `gpt-4o` | Required |
| **Google Gemini** | `https://generativelanguage.googleapis.com/v1beta/openai` | `gemini-2.0-flash` | Required |
| **DeepSeek** | `https://api.deepseek.com/v1` | `deepseek-chat` | Required |
| **Mistral** | `https://api.mistral.ai/v1` | `mistral-large-latest` | Required |
| **Groq** | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` | Required |
| **Together AI** | `https://api.together.xyz/v1` | `meta-llama/Llama-3-70b-chat-hf` | Required |
| **Fireworks AI** | `https://api.fireworks.ai/inference/v1` | `accounts/fireworks/models/llama-v3p1-70b-instruct` | Required |
| **Perplexity** | `https://api.perplexity.ai` | `llama-3.1-sonar-large-128k-online` | Required |
| **Cohere** | `https://api.cohere.com/v1` | `command-r-plus` | Required |
| **Anthropic (via OpenRouter)** | `https://openrouter.ai/api/v1` | `anthropic/claude-sonnet-4-5-20250514` | Required |
| **Ollama** | `http://localhost:11434/v1` | `llama3` | Not needed |
| **LM Studio** | `http://localhost:1234/v1` | `local-model` | Not needed |
| **LocalAI** | `http://localhost:8080/v1` | `gpt-4` | Not needed |
| **vLLM** | `http://localhost:8000/v1` | `your-model` | Not needed |
| **Jan** | `http://localhost:1337/v1` | `your-model` | Not needed |
| **GPT4All** | `http://localhost:4891/v1` | `your-model` | Not needed |
| **text-generation-webui** | `http://localhost:5000/v1` | `your-model` | Not needed |
| **Kobold.cpp** | `http://localhost:5001/v1` | `your-model` | Not needed |
| **LiteLLM** | `http://localhost:4000/v1` | `your-model` | Not needed |
| **Any OpenAI-compatible API** | Your endpoint URL | Your model name | Depends |

> **Tip:** OpenRouter gives you access to hundreds of models (GPT-4o, Claude, Gemini, Llama, Mistral, and more) through a single API key.

## Preferences

| Setting | Default | Description |
|---------|---------|-------------|
| API Key | — | Your API key. Not needed for local models |
| API Base URL | `https://openrouter.ai/api/v1` | Any OpenAI-compatible endpoint |
| Model | `moonshotai/kimi-k2.5` | Model identifier for your provider |
| Source Language | Auto-detect | Default source language |
| Target Language | English | Default target language |
| Show Explanation | Off | AI notes about translation choices and alternatives |
| History Limit | 100 | Max saved translations (favorites always preserved) |
| Translation Tone | Natural | Default tone for translations |

## Supported Languages

Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Aymara, Azerbaijani, Bambara, Basque, Belarusian, Bengali, Bhojpuri, Bosnian, Bulgarian, Burmese, Catalan, Cebuano, Chichewa, Chinese (Simplified), Chinese (Traditional), Corsican, Croatian, Czech, Danish, Dhivehi, Dogri, Dutch, English, Esperanto, Estonian, Ewe, Filipino, Finnish, French, Frisian, Galician, Georgian, German, Greek, Guarani, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hmong, Hungarian, Icelandic, Igbo, Ilocano, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Kinyarwanda, Konkani, Korean, Krio, Kurdish (Kurmanji), Kurdish (Sorani), Kyrgyz, Lao, Latin, Latvian, Lingala, Lithuanian, Luganda, Luxembourgish, Macedonian, Maithili, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Meiteilon, Mizo, Mongolian, Nepali, Norwegian, Odia, Oromo, Pashto, Persian, Polish, Portuguese, Punjabi, Quechua, Romanian, Russian, Samoan, Sanskrit, Scots Gaelic, Sepedi, Serbian, Sesotho, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tajik, Tamil, Tatar, Telugu, Thai, Tigrinya, Tsonga, Turkish, Turkmen, Twi, Ukrainian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, Zulu

## Development

```bash
npm install
npm run dev
```

## License

MIT
