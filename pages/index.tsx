
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { TtsControls } from '../components/TtsControls';
import { AudioPlayer } from '../components/AudioPlayer';
import { generateSpeech } from '../services/geminiService';
import { createWavBlob } from '../utils/audioUtils';
import type { VoiceOptionId, LanguageOptionId, StyleId } from '../types';
import { STYLES } from '../types';
import { getAvailableStyles, getAvailableVoices, getAvailableLanguages } from '../data/options';
import { LoadingIcon } from '../components/icons';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

const Home: React.FC = () => {
  const { language: uiLanguage, t } = useLanguage();
  
  const [text, setText] = useState<string>(t('defaultScriptText'));
  const [style, setStyle] = useState<StyleId>('friendly');
  const [voice, setVoice] = useState<VoiceOptionId>('Kore');
  const [ttsLanguage, setTtsLanguage] = useState<LanguageOptionId>('en-US');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [audioB64, setAudioB64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableStyles = useMemo(() => getAvailableStyles(t), [t]);
  const availableVoices = useMemo(() => getAvailableVoices(t), [t]);
  const availableLanguages = useMemo(() => getAvailableLanguages(t), [t]);
  
  useEffect(() => {
    const langMap: { [key in Language]: LanguageOptionId } = {
        en: 'en-US',
        lt: 'lt-LT',
        de: 'de-DE',
        es: 'es-ES',
        fr: 'fr-FR',
    };
    const newTtsLanguage = langMap[uiLanguage];
    if (newTtsLanguage) {
        setTtsLanguage(newTtsLanguage);
    }
  }, [uiLanguage]);

  useEffect(() => {
    const allDefaultTexts = Object.values(translations).map(lang => lang.defaultScriptText);
    if (allDefaultTexts.includes(text)) {
      setText(t('defaultScriptText'));
    }
  }, [t, text]);


  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      setError(t('errorEnterText'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioB64(null);

    try {
      const stylePrompt = STYLES[style];
      const fullPrompt = stylePrompt ? `${stylePrompt}: ${text}` : text;
      const audioData = await generateSpeech(fullPrompt, voice, ttsLanguage);
      setAudioB64(audioData);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
    }
  }, [text, style, voice, ttsLanguage, t]);
  
  const handleDownload = useCallback(() => {
    if (!audioB64) return;
    try {
      const blob = createWavBlob(audioB64);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'voicead_creator_output.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Download failed:', err);
        setError(t('errorDownload'));
    }
  }, [audioB64, t]);

  const handlePreviewVoice = useCallback(async () => {
    if (isPreviewLoading) return;

    setIsPreviewLoading(true);
    setError(null);

    try {
      const sampleText = t('previewText');
      const audioData = await generateSpeech(sampleText, voice, ttsLanguage);
      const blob = createWavBlob(audioData);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(url);
      }, { once: true });
    } catch (err) {
      console.error('Preview failed:', err);
      setError(err instanceof Error ? err.message : t('errorPreview'));
    } finally {
      setIsPreviewLoading(false);
    }
  }, [voice, ttsLanguage, isPreviewLoading, t]);

  return (
    <>
      <Head>
        <title>VoiceAd Creator</title>
        <meta name="description" content="A mini SaaS platform to convert text into professional, multi-lingual advertising voice-overs using AI. Enter your script, choose a voice and style, and generate high-quality audio for your ads." />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black font-sans p-4 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-white">
        <div className="container mx-auto max-w-5xl">
          <Header />
          <main className="mt-12 bg-gray-400/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">{t('configureTitle')}</h2>
                <TtsControls
                  text={text}
                  setText={setText}
                  style={style}
                  setStyle={setStyle}
                  voice={voice}
                  setVoice={setVoice}
                  ttsLanguage={ttsLanguage}
                  setTtsLanguage={setTtsLanguage}
                  availableStyles={availableStyles}
                  availableVoices={availableVoices}
                  availableLanguages={availableLanguages}
                  onSubmit={handleGenerate}
                  isLoading={isLoading}
                  onPreview={handlePreviewVoice}
                  isPreviewLoading={isPreviewLoading}
                />
              </div>

              <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">{t('previewTitle')}</h2>
                <div className="bg-black/50 rounded-2xl p-6 min-h-[200px] flex items-center justify-center border border-gray-800">
                  {isLoading ? (
                    <div className="text-center">
                      <LoadingIcon className="h-10 w-10 mx-auto animate-spin text-gray-400" />
                      <p className="mt-4 text-lg text-gray-300">{t('generatingStatus')}</p>
                      <p className="text-sm text-gray-500">{t('generatingHint')}</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-400 bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                      <p className="font-semibold">{t('errorFailed')}</p>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  ) : audioB64 ? (
                    <AudioPlayer audioB64={audioB64} onDownload={handleDownload} />
                  ) : (
                    <div className="text-center text-gray-500">
                      <p className="text-lg">{t('placeholderTitle')}</p>
                      <p>{t('placeholderSubtitle')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          <footer className="text-center mt-10 text-gray-600 text-sm">
            <p>{t('footerText')}</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
