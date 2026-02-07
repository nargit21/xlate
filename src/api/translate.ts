import { getClient } from "./client";
import { getPreferences } from "../preferences";
import { TranslationRequest } from "../types";
import { getLanguageName } from "../utils/language";
import { TONE_INSTRUCTIONS, DEFAULT_TEMPERATURE } from "../constants";

function buildSystemPrompt(request: TranslationRequest): string {
  const { sourceLanguage, targetLanguage, tone, showExplanation } = request;
  const targetName = getLanguageName(targetLanguage);
  const toneInstruction = TONE_INSTRUCTIONS[tone];

  const parts: string[] = [];

  parts.push("You are a professional translator. Your task is to translate text accurately while preserving the original meaning, tone, and formatting.");

  if (sourceLanguage === "auto") {
    parts.push(
      `Detect the source language and output the language code on the very first line in this exact format: [detected:XX] where XX is the ISO 639-1 language code (e.g., en, fr, zh-CN). Then output the translation on the next line.`
    );
  }

  parts.push(`Translate the text into ${targetName}.`);
  parts.push(toneInstruction);
  parts.push("Preserve all formatting including line breaks, bullet points, and paragraphs.");
  parts.push("Output ONLY the translation (and the language detection marker if applicable). Do not add any commentary, notes, or preamble.");

  if (showExplanation) {
    parts.push(
      `After the translation, add a separator line "---" followed by a brief explanation of key translation choices, nuances, and any alternatives considered. Keep it concise.`
    );
  }

  return parts.join("\n\n");
}

function buildUserMessage(request: TranslationRequest): string {
  const { text, sourceLanguage, targetLanguage } = request;
  const sourceName = sourceLanguage === "auto" ? "the detected language" : getLanguageName(sourceLanguage);
  const targetName = getLanguageName(targetLanguage);

  return `Translate the following text from ${sourceName} to ${targetName}:\n\n${text}`;
}

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export async function translateStream(
  request: TranslationRequest,
  callbacks: StreamCallbacks,
  abortSignal?: AbortSignal
): Promise<void> {
  const client = getClient();
  const prefs = getPreferences();

  const systemPrompt = buildSystemPrompt(request);
  const userMessage = buildUserMessage(request);

  let fullText = "";

  try {
    const stream = await client.chat.completions.create(
      {
        model: prefs.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: DEFAULT_TEMPERATURE,
        stream: true,
      },
      {
        signal: abortSignal,
      }
    );

    for await (const chunk of stream) {
      if (abortSignal?.aborted) break;

      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        fullText += delta;
        callbacks.onChunk(fullText);
      }
    }

    callbacks.onComplete(fullText);
  } catch (error) {
    if (abortSignal?.aborted) return;
    callbacks.onError(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function translateSync(request: TranslationRequest, abortSignal?: AbortSignal): Promise<string> {
  const client = getClient();
  const prefs = getPreferences();

  const systemPrompt = buildSystemPrompt(request);
  const userMessage = buildUserMessage(request);

  const response = await client.chat.completions.create(
    {
      model: prefs.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: DEFAULT_TEMPERATURE,
    },
    {
      signal: abortSignal,
    }
  );

  return response.choices[0]?.message?.content ?? "";
}
