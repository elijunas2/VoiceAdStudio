
import React from 'react';
import type { VoiceOptionId, LanguageOptionId, StyleId, LabeledOption, LabeledOptionGroup } from '../types';
import { PlayIcon, LoadingIcon, SpeakerIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface TtsControlsProps {
  text: string;
  setText: (text: string) => void;
  style: StyleId;
  setStyle: (style: StyleId) => void;
  voice: VoiceOptionId;
  setVoice: (voice: VoiceOptionId) => void;
  ttsLanguage: LanguageOptionId;
  setTtsLanguage: (language: LanguageOptionId) => void;
  availableStyles: LabeledOption<StyleId>[];
  availableVoices: LabeledOptionGroup<VoiceOptionId>[];
  availableLanguages: LabeledOption<LanguageOptionId>[];
  onSubmit: () => void;
  isLoading: boolean;
  onPreview: () => void;
  isPreviewLoading: boolean;
}

export const TtsControls: React.FC<TtsControlsProps> = ({
  text,
  setText,
  style,
  setStyle,
  voice,
  setVoice,
  ttsLanguage,
  setTtsLanguage,
  availableStyles,
  availableVoices,
  availableLanguages,
  onSubmit,
  isLoading,
  onPreview,
  isPreviewLoading,
}) => {
  const { t } = useLanguage();

  const customSelectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.75rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.25em 1.25em',
    paddingRight: '2.5rem',
  };

  const inputBaseClasses = "w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-200 placeholder-gray-500";
  const labelBaseClasses = "block text-sm font-medium text-gray-400 mb-2";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="text" className={labelBaseClasses}>
          {t('scriptLabel')}
        </label>
        <textarea
          id="text"
          rows={6}
          className={`${inputBaseClasses} resize-y`}
          placeholder={t('scriptPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="style" className={labelBaseClasses}>
          {t('styleLabel')}
        </label>
        <select
          id="style"
          className={`${inputBaseClasses} appearance-none`}
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleId)}
          style={customSelectStyle}
        >
          {availableStyles.map((s) => (
            <option key={s.id} value={s.id} className="bg-gray-800">
              {s.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="language" className={labelBaseClasses}>
          {t('languageLabel')}
        </label>
        <select
          id="language"
          className={`${inputBaseClasses} appearance-none`}
          value={ttsLanguage}
          onChange={(e) => setTtsLanguage(e.target.value as LanguageOptionId)}
          style={customSelectStyle}
        >
          {availableLanguages.map((lang) => (
            <option key={lang.id} value={lang.id} className="bg-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="voice" className={labelBaseClasses}>
          {t('voiceLabel')}
        </label>
        <div className="flex items-center gap-2">
          <select
            id="voice"
            className={`${inputBaseClasses} flex-grow appearance-none`}
            value={voice}
            onChange={(e) => setVoice(e.target.value as VoiceOptionId)}
            style={customSelectStyle}
          >
            {availableVoices.map((group) => (
              <optgroup key={group.label} label={group.label} className="bg-gray-900 text-gray-400 font-semibold">
                {group.options.map((v) => (
                  <option key={v.id} value={v.id} className="bg-gray-800 text-gray-200 font-normal">
                    {v.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            type="button"
            onClick={onPreview}
            disabled={isLoading || isPreviewLoading}
            className="flex-shrink-0 h-[50px] w-[50px] flex items-center justify-center bg-gray-700/60 hover:bg-gray-700/90 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-300 rounded-xl transition duration-200 border border-gray-700"
            aria-label={t('previewAriaLabel')}
          >
            {isPreviewLoading ? (
              <LoadingIcon className="h-5 w-5 animate-spin" />
            ) : (
              <SpeakerIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || isPreviewLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-lg"
      >
        {isLoading ? (
          <>
            <LoadingIcon className="h-5 w-5 animate-spin" />
            <span className="leading-5">{t('generatingButton')}</span>
          </>
        ) : (
          <>
            <PlayIcon className="h-5 w-5" />
            <span className="leading-5">{t('generateButton')}</span>
          </>
        )}
      </button>
    </form>
  );
};
