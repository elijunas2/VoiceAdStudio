
import type { LabeledOption, StyleId, VoiceOptionId, LanguageOptionId } from '../types';
import { STYLES, VOICE_IDS, LANGUAGE_IDS } from '../types';

type Translator = (key: string) => string;

export const getAvailableStyles = (t: Translator): LabeledOption<StyleId>[] => [
  { id: 'friendly', name: t('styleFriendly') },
  { id: 'professional', name: t('styleProfessional') },
  { id: 'energetic', name: t('styleEnergetic') },
  { id: 'calm', name: t('styleCalm') },
  { id: 'warm', name: t('styleWarm') },
  { id: 'formal', name: t('styleFormal') },
  { id: 'playful', name: t('stylePlayful') },
];

export const getAvailableVoices = (t: Translator): LabeledOption<VoiceOptionId>[] => [
  { id: 'Kore', name: t('voiceKore') },
  { id: 'Puck', name: t('voicePuck') },
  { id: 'Charon', name: t('voiceCharon') },
  { id: 'Fenrir', name: t('voiceFenrir') },
  { id: 'Zephyr', name: t('voiceZephyr') },
];

export const getAvailableLanguages = (t: Translator): LabeledOption<LanguageOptionId>[] => [
  { id: 'en-US', name: t('langEn') },
  { id: 'lt-LT', name: t('langLt') },
  { id: 'de-DE', name: t('langDe') },
  { id: 'es-ES', name: t('langEs') },
  { id: 'fr-FR', name: t('langFr') },
];
