import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for natural English US/UK voices
        const enVoice = voices.find(
          (v) => (v.lang === 'en-US' || v.lang === 'en-GB') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || true)
        ) || voices.find((v) => v.lang.startsWith('en'));
        
        if (enVoice) setSelectedVoice(enVoice);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const speak = useCallback((text, rate = 0.9) => {
    if (!supported || !text) return;

    window.speechSynthesis.cancel(); // cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, selectedVoice]);

  return {
    speak,
    isSpeaking,
    supported,
  };
}
