
"use client";
import { useCallback } from 'react';

export const useSpeak = () => {
  const speak = useCallback((text: string, rate = 1.0) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = 'en-US';
    
    // Ensure any ongoing speech is stopped before starting a new one.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Some browsers (especially on mobile) need a moment to process the cancel command.
    const startSpeaking = () => {
        // Double-check that it's not speaking again before starting.
        if (!window.speechSynthesis.speaking) {
            window.speechSynthesis.speak(utterance);
        } else {
             setTimeout(startSpeaking, 50);
        }
    };
    
    setTimeout(startSpeaking, 50);

  }, []);

  return { speak };
};

    