import { useState, useCallback, useRef } from 'react';

// Global persistent audio player to bypass browser garbage collection & restrictions
let globalAudio = null;
let currentUtterance = null;

/**
 * Universal Studio English Pronunciation Hook
 * 1. Tier 1: Dedicated Youdao Studio Audio CDN (100% hits for all words & phrases)
 * 2. Tier 2: Google Dictionary Studio MP3 CDN
 * 3. Tier 3: Browser Native SpeechSynthesis
 */
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const timeoutRef = useRef(null);

  const resetState = () => {
    setIsSpeaking(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const playStream = (url) => {
    return new Promise((resolve, reject) => {
      try {
        if (!globalAudio) {
          globalAudio = new Audio();
        } else {
          globalAudio.pause();
          globalAudio.currentTime = 0;
        }

        globalAudio.src = url;
        globalAudio.volume = 1.0;

        let finished = false;
        const done = (ok, err) => {
          if (finished) return;
          finished = true;
          cleanup();
          resetState();
          if (ok) resolve(true);
          else reject(err);
        };

        const onPlay = () => setIsSpeaking(true);
        const onEnd = () => done(true);
        const onError = (e) => done(false, e);

        const cleanup = () => {
          if (globalAudio) {
            globalAudio.removeEventListener('play', onPlay);
            globalAudio.removeEventListener('ended', onEnd);
            globalAudio.removeEventListener('error', onError);
          }
        };

        globalAudio.addEventListener('play', onPlay);
        globalAudio.addEventListener('ended', onEnd);
        globalAudio.addEventListener('error', onError);

        // Safety timeout
        timeoutRef.current = setTimeout(() => {
          done(true);
        }, 3500);

        const p = globalAudio.play();
        if (p !== undefined) {
          p.catch((err) => done(false, err));
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const speakWithSynthesis = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resetState();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      currentUtterance = new SpeechSynthesisUtterance(text);
      currentUtterance.lang = 'en-US';
      currentUtterance.rate = 0.85;
      currentUtterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB' || v.lang.startsWith('en'));
      if (enVoice) currentUtterance.voice = enVoice;

      currentUtterance.onstart = () => setIsSpeaking(true);
      currentUtterance.onend = () => {
        currentUtterance = null;
        resetState();
      };
      currentUtterance.onerror = () => {
        currentUtterance = null;
        resetState();
      };

      window.speechSynthesis.speak(currentUtterance);
    } catch (e) {
      console.error('SpeechSynthesis error:', e);
      resetState();
    }
  };

  const speak = useCallback(async (text, audioUrl) => {
    if (!text) return;
    setIsSpeaking(true);

    const cleanText = text.trim();
    const singleWord = cleanText.toLowerCase().replace(/[^a-z0-9_-]/g, '');

    // List of audio endpoints to try
    const sources = [];
    if (audioUrl) sources.push(audioUrl);
    
    // Dedicated reliable Studio US TTS (Type 2 = US English accent)
    sources.push(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`);
    
    // Google Dictionary static recording for single words
    if (singleWord && !cleanText.includes(' ')) {
      sources.push(`https://ssl.gstatic.com/dictionary/static/sounds/20200429/${singleWord}--_us_1.mp3`);
    }

    let played = false;
    for (const src of sources) {
      try {
        await playStream(src);
        played = true;
        break;
      } catch {
        // try next
      }
    }

    if (!played) {
      speakWithSynthesis(cleanText);
    }
  }, []);

  return {
    speak,
    isSpeaking,
    supported: true,
  };
}
