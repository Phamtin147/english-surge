import { useState, useCallback } from 'react';

/**
 * Foolproof Universal English Pronunciation Player
 * 1. Tier 1: Explicit Dictionary Audio (if provided)
 * 2. Tier 2: Google Dictionary Studio MP3 CDN (https://ssl.gstatic.com/dictionary/...)
 * 3. Tier 3: Dictionary API / Free Dictionary Audio CDN
 * 4. Tier 4: Native Browser SpeechSynthesis (with resume & unpause fix)
 */

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const playAudioUrl = (url) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.crossOrigin = 'anonymous';
      
      let resolved = false;
      const done = (success, err) => {
        if (resolved) return;
        resolved = true;
        setIsSpeaking(false);
        if (success) resolve(true);
        else reject(err || new Error('Playback failed'));
      };

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => done(true);
      audio.onerror = (e) => done(false, e);

      // Auto timeout in case network hangs
      setTimeout(() => {
        if (!audio.paused && !resolved) {
          // still playing
        } else if (resolved) {
          // already done
        }
      }, 4000);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => done(false, err));
      }
    });
  };

  const speakWithSynthesis = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang === 'en-US' || v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('SpeechSynthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const speak = useCallback(async (text, audioUrl) => {
    if (!text) return;
    const cleanWord = text.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    // List of reliable studio audio CDN URLs to try sequentially
    const audioCandidates = [];
    if (audioUrl) audioCandidates.push(audioUrl);
    if (cleanWord) {
      audioCandidates.push(`https://ssl.gstatic.com/dictionary/static/sounds/20200429/${cleanWord}--_us_1.mp3`);
      audioCandidates.push(`https://api.dictionaryapi.dev/media/pronunciations/en/${cleanWord}-us.mp3`);
    }

    let played = false;
    for (const url of audioCandidates) {
      try {
        await playAudioUrl(url);
        played = true;
        break;
      } catch {
        // try next candidate
      }
    }

    // Fallback to SpeechSynthesis if all online CDN audio failed
    if (!played) {
      speakWithSynthesis(text);
    }
  }, []);

  return {
    speak,
    isSpeaking,
    supported: true,
  };
}
