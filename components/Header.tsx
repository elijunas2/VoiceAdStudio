
import React from 'react';
import { MicIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="relative">
      <div className="absolute top-0 right-0 z-10">
        <LanguageSelector />
      </div>
      <div className="text-center pt-2">
        <div className="inline-flex items-center justify-center bg-gray-800/50 border border-gray-700/50 rounded-full p-3 mb-4">
          <MicIcon className="h-6 w-6 text-gray-300" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-100 flex justify-center flex-wrap">
          {t('headerTitle').split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-float bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          {t('headerDescription')}
        </p>
      </div>
    </header>
  );
};