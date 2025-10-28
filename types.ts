
export const STYLES = {
  friendly: 'Announce with a friendly and engaging tone',
  professional: 'Speak in a professional and authoritative voice',
  energetic: 'Use an energetic and upbeat style',
  calm: 'Deliver the lines in a calm and soothing manner',
  warm: 'Sound warm and trustworthy',
  formal: 'Adopt a formal and serious tone',
  playful: 'Speak with a playful and humorous tone',
} as const;

export type StyleId = keyof typeof STYLES;

export const VOICE_IDS = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'] as const;
export type VoiceOptionId = typeof VOICE_IDS[number];

export const LANGUAGE_IDS = ['en-US', 'lt-LT', 'de-DE', 'es-ES', 'fr-FR'] as const;
export type LanguageOptionId = typeof LANGUAGE_IDS[number];

export interface LabeledOption<T> {
  id: T;
  name: string;
}
