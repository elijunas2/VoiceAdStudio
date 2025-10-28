
import { GoogleGenAI, Modality } from "@google/genai";
import type { VoiceOptionId, LanguageOptionId } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSpeech(prompt: string, voiceName: VoiceOptionId, language: LanguageOptionId): Promise<string> {
  try {
    // The Gemini TTS model infers the language from the prompt text.
    // The `language` parameter is included for potential future use or alternative models
    // but is not currently passed to the API config.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (typeof base64Audio === 'string' && base64Audio) {
      return base64Audio;
    } else {
      throw new Error("No audio data received from API.");
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating speech.");
  }
}
