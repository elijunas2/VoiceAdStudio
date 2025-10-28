
import type { LabeledOption, StyleId, VoiceOptionId, LanguageOptionId, LabeledOptionGroup } from '../types';
import { STYLES, VOICES, LANGUAGE_IDS } from '../types';

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

export const getAvailableVoices = (t: Translator): LabeledOptionGroup<VoiceOptionId>[] => {
  const maleVoices: LabeledOption<VoiceOptionId>[] = [];
  const femaleVoices: LabeledOption<VoiceOptionId>[] = [];

  VOICES.forEach(voice => {
    // Construct the translation key, e.g., 'voiceKore'
    const translationKey = `voice${voice.id.charAt(0).toUpperCase() + voice.id.slice(1)}`;
    const option = { id: voice.id, name: t(translationKey) };
    if (voice.gender === 'male') {
      maleVoices.push(option);
    } else {
      femaleVoices.push(option);
    }
  });

  return [
    { label: t('voiceCategoryFemale'), options: femaleVoices },
    { label: t('voiceCategoryMale'), options: maleVoices },
  ];
};


export const getAvailableLanguages = (t: Translator): LabeledOption<LanguageOptionId>[] => [
  { id: 'en-US', name: t('langEn') },
  { id: 'lt-LT', name: t('langLt') },
  { id: 'de-DE', name: t('langDe') },
  { id: 'es-ES', name: t('langEs') },
  { id: 'fr-FR', name: t('langFr') },
];
