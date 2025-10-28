
import React, { useState, useEffect } from 'react';
import { createWavBlob } from '../utils/audioUtils';
import { DownloadIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioPlayerProps {
  audioB64: string;
  onDownload: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioB64, onDownload }) => {
  const { t } = useLanguage();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    try {
        const blob = createWavBlob(audioB64);
        url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setError(null);
    } catch(err) {
        console.error("Failed to create audio URL", err);
        setError(t('errorPlayAudio'));
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [audioB64, t]);

  if(error) {
    return <div className="text-red-400">{error}</div>
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <audio controls src={audioUrl ?? ''} className="w-full">
        {t('audioNotSupported')}
      </audio>
      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700/80 text-gray-200 font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md border border-gray-700"
      >
        <DownloadIcon className="h-5 w-5" />
        <span>{t('downloadButton')}</span>
      </button>
    </div>
  );
};