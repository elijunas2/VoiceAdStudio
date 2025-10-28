
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { GlobeIcon } from './icons';
import { FlagUSIcon, FlagLTIcon, FlagDEIcon, FlagESIcon, FlagFRIcon } from './flags';

const languageOptions: { lang: Language; label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { lang: 'en', label: 'English', Icon: FlagUSIcon },
  { lang: 'lt', label: 'Lietuvių', Icon: FlagLTIcon },
  { lang: 'de', label: 'Deutsch', Icon: FlagDEIcon },
  { lang: 'es', label: 'Español', Icon: FlagESIcon },
  { lang: 'fr', label: 'Français', Icon: FlagFRIcon },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 bg-gray-800/60 hover:bg-gray-700/80 rounded-full text-gray-300 hover:text-white transition-colors duration-200 border border-gray-700/50"
        aria-label="Select language"
      >
        <GlobeIcon className="h-5 w-5" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1C1C1E] border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-20">
          <ul className="py-1">
            {languageOptions.map(({ lang, label, Icon }) => (
              <li key={lang}>
                <button
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors duration-200 ${
                    language === lang
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5 rounded-sm" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};