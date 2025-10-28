
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

export const VOICE_IDS = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr', 'Lyra', 'Atlas', 'Rhea', 'Eos', 'Hera'] as const;
export type VoiceOptionId = typeof VOICE_IDS[number];

export interface VoiceInfo {
  id: VoiceOptionId;
  gender: 'male' | 'female';
}

// Order here determines display order within groups
export const VOICES: readonly VoiceInfo[] = [
  // Female
  { id: 'Kore', gender: 'female' },
  { id: 'Zephyr', gender: 'female' },
  { id: 'Lyra', gender: 'female' },
  { id: 'Rhea', gender: 'female' },
  { id: 'Eos', gender: 'female' },
  { id: 'Hera', gender: 'female' },
  // Male
  { id: 'Puck', gender: 'male' },
  { id: 'Charon', gender: 'male' },
  { id: 'Fenrir', gender: 'male' },
  { id: 'Atlas', gender: 'male' },
] as const;


export const LANGUAGE_IDS = ['en-US', 'lt-LT', 'de-DE', 'es-ES', 'fr-FR'] as const;
export type LanguageOptionId = typeof LANGUAGE_IDS[number];

export interface LabeledOption<T> {
  id: T;
  name: string;
}

export interface LabeledOptionGroup<T> {
  label: string;
  options: LabeledOption<T>[];
}
