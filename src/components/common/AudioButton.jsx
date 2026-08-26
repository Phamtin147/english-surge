import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

export default function AudioButton({ text, size = 'md', className = '' }) {
  const { speak, isSpeaking, supported } = useSpeech();

  if (!supported) return null;

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      disabled={isSpeaking}
      title="Nghe phát âm chuẩn (US Voice)"
      className={`relative inline-flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/25 hover:text-indigo-200 border border-indigo-500/20 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      {isSpeaking ? (
        <span className="flex items-center gap-1">
          <Volume2 size={iconSizes[size]} className="animate-pulse text-indigo-300" />
          <span className="w-1 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-4 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
    </button>
  );
}
