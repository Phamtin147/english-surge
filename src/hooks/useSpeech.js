import { useState, useCallback, useRef } from 'react';

// Global singleton audio instance to prevent browser garbage collection or audio context blocking
let globalAudio = null;
let currentUtterance = null; // Prevent Chrome garbage collection bug

/**
 * High-Reliability Audio Pronunciation Engine
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

  /**
   * Play audio via standard HTML5 Audio without crossOrigin restrictions
   */
  const playNativeAudio = (url) => {
    return new Promise((resolve, reject) => {
      try {
        if (globalAudio) {
          globalAudio.pause();
          globalAudio.currentTime = 0;
        } else {
          globalAudio = new Audio();
        }

        globalAudio.src = url;
        globalAudio.volume = 1.0;

        let hasEnded = false;

        const onPlay = () => {
          setIsSpeaking(true);
        };

        const onEnded = () => {
          if (!hasEnded) {
            hasEnded = true;
            cleanup();
            resetState();
            resolve(true);
          }
        };

        const onError = (e) => {
          if (!hasEnded) {
            hasEnded = true;
            cleanup();
            reject(e || new Error('Audio play error'));
          }
        };

        const cleanup = () => {
          if (globalAudio) {
            globalAudio.removeEventListener('play', onPlay);
            globalAudio.removeEventListener('ended', onEnded);
            globalAudio.removeEventListener('error', onError);
          }
        };

        globalAudio.addEventListener('play', onPlay);
        globalAudio.addEventListener('ended', onEnded);
        globalAudio.addEventListener('error', onError);

        // Fallback safety timeout
        timeoutRef.current = setTimeout(() => {
          if (!hasEnded) {
            hasEnded = true;
            cleanup();
            resetState();
            resolve(true);
          }
        }, 3000);

        const playPromise = globalAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (!hasEnded) {
              hasEnded = true;
              cleanup();
              reject(err);
            }
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Play audio via Web Speech API Synthesis with Chrome GC Bug Fix
   */
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

      currentUtterance.onstart = () => {
        setIsSpeaking(true);
      };

      currentUtterance.onend = () => {
        currentUtterance = null;
        resetState();
      };

      currentUtterance.onerror = () => {
        currentUtterance = null;
        resetState();
      };

      window.speechSynthesis.speak(currentUtterance);

      // Auto clear after 4s
      timeoutRef.current = setTimeout(() => {
        resetState();
      }, 4000);
    } catch (e) {
      console.error('SpeechSynthesis error:', e);
      resetState();
    }
  };

  const speak = useCallback(async (text, audioUrl) => {
    if (!text) return;
    setIsSpeaking(true);

    const cleanWord = text.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    // Candidates to try
    const candidates = [];
    if (audioUrl) candidates.push(audioUrl);
    if (cleanWord) {
      candidates.push(`https://ssl.gstatic.com/dictionary/static/sounds/20200429/${cleanWord}--_us_1.mp3`);
      candidates.push(`https://api.dictionaryapi.dev/media/pronunciations/en/${cleanWord}-us.mp3`);
    }

    let played = false;
    for (const url of candidates) {
      try {
        await playNativeAudio(url);
        played = true;
        break;
      } catch (err) {
        // try next candidate
      }
    }

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
