import React from 'react';
import { Bookmark, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import SpotlightCard from '../reactbits/SpotlightCard';
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

  const spotlightColors = {
    it: 'rgba(6, 182, 212, 0.22)',
    business: 'rgba(16, 185, 129, 0.22)',
    travel: 'rgba(245, 158, 11, 0.22)',
    daily: 'rgba(244, 63, 94, 0.22)',
    academic: 'rgba(168, 85, 247, 0.22)',
    health: 'rgba(20, 184, 166, 0.22)',
  };

  const spotlight = spotlightColors[word.category] || 'rgba(99, 102, 241, 0.2)';

  return (
    <SpotlightCard
      className="flex flex-col justify-between h-full group border-slate-800/80 bg-slate-900/90 rounded-3xl p-6 hover:border-indigo-500/40 transition-all duration-300 shadow-xl"
      spotlightColor={spotlight}
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
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
              Level {word.level}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVocabBookmark(word.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title="Lưu vào Sổ tay"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVocabLearned(word.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isLearned
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={isLearned ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word and IPA */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors font-heading tracking-tight">
              <DecryptedText
                text={word.word}
                speed={35}
                maxIterations={12}
                revealDirection="start"
                animateOn="hover"
                className="cursor-pointer"
              />
            </h3>
            <AudioButton text={word.word} size="sm" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {word.ipa}
            </span>
            <span className="text-xs text-slate-300 italic">({word.partOfSpeech})</span>
          </div>
        </div>

        {/* Vietnamese Meaning & Definition */}
        <div className="space-y-1.5 mb-4">
          <p className="text-sm font-semibold text-emerald-400">{word.vietnamese}</p>
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
            {word.definition}
          </p>
        </div>

        {/* Example Sentence */}
        {word.example && (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">Ví dụ:</span>
              <AudioButton text={word.example} size="sm" />
            </div>
            <p className="text-xs text-slate-200 leading-snug">{word.example}</p>
            <p className="text-[11px] text-slate-300 italic">{word.exampleVi}</p>
          </div>
        )}
      </div>

      {/* Footer Details: Collocations & Mnemonic */}
      <div className="pt-3 border-t border-slate-800/60 space-y-2">
        {word.collocations && word.collocations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {word.collocations.slice(0, 2).map((col, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-800/80 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md font-mono"
              >
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
    </SpotlightCard>
  );
}
