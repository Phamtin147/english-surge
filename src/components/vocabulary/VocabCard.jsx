import React from 'react';
import { Bookmark, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import ShaderCard from '../reactbits/ShaderCard';
import DecryptedText from '../reactbits/DecryptedText';
import AudioButton from '../common/AudioButton';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function VocabCard({ word }) {
  const { progress, toggleVocabLearned, toggleVocabBookmark } = useStudyProgress();

  const isLearned = progress.completedVocab.includes(word.id);
  const isBookmarked = progress.bookmarkedVocab.includes(word.id);

  const categoryBadgeColors = {
    it: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    business: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    travel: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    daily: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    academic: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    health: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  };

  const shaderPalettes = {
    it: {
      color1: [0.15, 0.2, 0.65],
      color2: [0.05, 0.7, 0.9],
      color3: [0.4, 0.15, 0.8],
    },
    business: {
      color1: [0.05, 0.45, 0.35],
      color2: [0.1, 0.75, 0.6],
      color3: [0.1, 0.3, 0.6],
    },
    travel: {
      color1: [0.6, 0.35, 0.05],
      color2: [0.9, 0.6, 0.1],
      color3: [0.7, 0.15, 0.35],
    },
    daily: {
      color1: [0.6, 0.1, 0.3],
      color2: [0.9, 0.35, 0.45],
      color3: [0.45, 0.15, 0.7],
    },
    academic: {
      color1: [0.35, 0.1, 0.65],
      color2: [0.65, 0.2, 0.9],
      color3: [0.15, 0.3, 0.8],
    },
    health: {
      color1: [0.05, 0.5, 0.5],
      color2: [0.1, 0.8, 0.7],
      color3: [0.1, 0.35, 0.6],
    },
  };

  const currentPalette = shaderPalettes[word.category] || shaderPalettes.it;

  return (
    <ShaderCard
      className="flex flex-col justify-between h-full group"
      color1={currentPalette.color1}
      color2={currentPalette.color2}
      color3={currentPalette.color3}
      speed={0.8}
    >
      {/* Header with Category badge, Level and Bookmark */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                categoryBadgeColors[word.category] || 'bg-slate-800 text-slate-300'
              }`}
            >
              {word.category}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900/90 text-indigo-300 border border-slate-700">
              {word.level}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => toggleVocabBookmark(word.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
              title="Lưu vào sổ tay"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => toggleVocabLearned(word.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLearned
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
              title={isLearned ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
            >
              <CheckCircle2 className={`w-4 h-4 ${isLearned ? 'text-emerald-400 fill-emerald-500/20' : ''}`} />
            </button>
          </div>
        </div>

        {/* Word Title & Audio */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors font-heading">
            <DecryptedText text={word.word} animateOn="hover" speed={30} />
          </h3>
          <AudioButton text={word.word} size="sm" />
        </div>

        {/* IPA & Part of speech */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
          <span>{word.ipa}</span>
          <span>•</span>
          <span className="italic text-slate-400 font-sans">({word.partOfSpeech})</span>
        </div>

        {/* Vietnamese Translation */}
        <div className="mb-3">
          <p className="text-sm font-bold text-emerald-300 leading-snug">
            {word.vietnamese}
          </p>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
            {word.definition}
          </p>
        </div>

        {/* Example Sentence */}
        <div className="p-2.5 rounded-xl bg-slate-950/85 border border-slate-800/90 mb-3">
          <div className="flex items-center justify-between text-[11px] text-cyan-400 font-medium mb-1">
            <span>Ví dụ:</span>
            <AudioButton text={word.example} size="sm" />
          </div>
          <p className="text-xs text-slate-200 font-medium">{word.example}</p>
          <p className="text-[11px] text-slate-400 mt-0.5 italic">{word.exampleVi}</p>
        </div>
      </div>

      {/* Mnemonic / Memory tip & Collocations */}
      <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-col gap-1.5">
        {word.collocations && word.collocations.length > 0 && (
          <div className="flex flex-wrap gap-1 text-[10px]">
            {word.collocations.slice(0, 2).map((col, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-700/50">
                {col}
              </span>
            ))}
          </div>
        )}

        {word.mnemonic && (
          <div className="flex items-start gap-1.5 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
            <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
            <span className="line-clamp-2">{word.mnemonic}</span>
          </div>
        )}
      </div>
    </ShaderCard>
  );
}
