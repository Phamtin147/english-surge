import { useState, useCallback } from 'react';

/**
 * Universal High-Quality English Speech Player
 * 1. Plays online studio audio stream (Google TTS / Dictionary Audio)
 * 2. Falls back seamlessly to Web Speech API (SpeechSynthesis)
 */
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const playOnlineAudio = (text, audioUrl) => {
    return new Promise((resolve, reject) => {
      // 1. If explicit dictionary audio URL is passed
      const streamUrl =
        audioUrl ||
        `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;

      const audio = new Audio(streamUrl);
      audio.crossOrigin = 'anonymous';

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        resolve(true);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        reject(new Error('Audio stream error'));
      };

      audio.play().catch((err) => {
        setIsSpeaking(false);
        reject(err);
      });
    });
  };

  const speakWithSynthesis = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith('en'));
    if (enVoice) utterance.voice = enVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const speak = useCallback(async (text, audioUrl) => {
    if (!text) return;

    try {
      // Primary: High-fidelity audio stream
      await playOnlineAudio(text, audioUrl);
    } catch {
      // Fallback: Browser Web Speech synthesis
      speakWithSynthesis(text);
    }
  }, []);

  return {
    speak,
    isSpeaking,
    supported: true,
  };
}
