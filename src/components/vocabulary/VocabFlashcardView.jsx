import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, CheckCircle2, Bookmark, Lightbulb, Sparkles, Volume2 } from 'lucide-react';
import ScrollMask from '../reactbits/ScrollMask';
import { ShaderBackground } from '../reactbits/ShaderCard';
import AudioButton from '../common/AudioButton';
import StarBorder from '../reactbits/StarBorder';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

export default function VocabFlashcardView({ words, onSwitchToList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { progress, toggleVocabLearned, toggleVocabBookmark } = useStudyProgress();

  const currentWord = words[currentIndex] || words[0];

  const shaderPalettes = {
    it: {
      color1: '#6366f1',
      color2: '#06b6d4',
      color3: '#a855f7',
    },
    business: {
      color1: '#059669',
      color2: '#10b981',
      color3: '#0284c7',
    },
    travel: {
      color1: '#d97706',
      color2: '#f59e0b',
      color3: '#e11d48',
    },
    daily: {
      color1: '#e11d48',
      color2: '#f43f5e',
      color3: '#7c3aed',
    },
    academic: {
      color1: '#7c3aed',
      color2: '#a855f7',
      color3: '#4f46e5',
    },
    health: {
      color1: '#0d9488',
      color2: '#14b8a6',
      color3: '#0284c7',
    },
  };

  const palette = (currentWord && shaderPalettes[currentWord.category]) || shaderPalettes.it;

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, words.length]);

  if (!currentWord) {
    return (
      <div className="text-center py-20 text-slate-400">
        Không tìm thấy từ vựng phù hợp với bộ lọc hiện tại.
      </div>
    );
  }

  const isLearned = progress.completedVocab.includes(currentWord.id);
  const isBookmarked = progress.bookmarkedVocab.includes(currentWord.id);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(words.length - 1);
    }
  };

  const handleMarkLearned = () => {
    toggleVocabLearned(currentWord.id);
    if (!isLearned) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      {/* Top Controls & Progress */}
      <div className="w-full flex items-center justify-between mb-4 text-xs sm:text-sm text-slate-400">
        <span className="font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          Thẻ <strong className="text-indigo-400">{currentIndex + 1}</strong> / {words.length}
        </span>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs text-slate-400">
            Phím tắt: [Space] Lật thẻ • [←/→] Chuyển từ
          </span>
          <button
            onClick={() => toggleVocabBookmark(currentWord.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Lưu vào Sổ tay yêu thích"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-6 border border-slate-800/50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* 3D Flip Card Container with Shader Waves */}
      <div
        className="w-full h-[400px] sm:h-[440px] perspective-1000 cursor-pointer select-none"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full relative transform-style-preserve-3d"
        >
          {/* FRONT SIDE WITH SHADER BACKGROUND */}
          <div
            className={`absolute inset-0 rounded-3xl p-8 bg-slate-950 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Dynamic WebGL Rising Flame Shader */}
            <ShaderBackground color1={palette.color1} color2={palette.color2} color3={palette.color3} speed={0.9} />

            <div className="flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-900/80 border border-indigo-500/30 text-indigo-300 backdrop-blur-sm">
                {currentWord.category.toUpperCase()} • Level {currentWord.level}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1 bg-slate-900/70 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-sm">
                <RotateCw className="w-3.5 h-3.5" /> Chạm để lật nghĩa
              </span>
            </div>

            <div className="text-center my-auto z-10">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3 font-heading drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                {currentWord.word}
              </h2>
              
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-slate-200 text-base sm:text-lg bg-slate-950/80 px-3.5 py-1 rounded-xl border border-slate-700/80 backdrop-blur-sm shadow-md">
                  {currentWord.ipa}
                </span>
                <AudioButton text={currentWord.word} size="md" />
              </div>

              <p className="text-slate-300 text-sm mt-3 italic font-medium">({currentWord.partOfSpeech})</p>
            </div>

            <div className="z-10 flex items-center justify-center gap-2 text-xs text-indigo-300 font-semibold bg-slate-950/60 py-1.5 px-3 rounded-full border border-slate-800/80 w-fit mx-auto backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Bấm vào thẻ hoặc phím Space để xem ví dụ & mẹo nhớ</span>
            </div>
          </div>

          {/* BACK SIDE WITH SHADER BACKGROUND */}
          <div
            className={`absolute inset-0 rounded-3xl p-8 bg-slate-950 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
              !isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Dynamic WebGL Rising Flame Shader */}
            <ShaderBackground color1={palette.color1} color2={palette.color2} color3={palette.color3} speed={0.9} />

            {/* Top header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{currentWord.word}</span>
                <span className="text-xs text-slate-300 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">{currentWord.ipa}</span>
              </div>
              <AudioButton text={currentWord.word} size="sm" />
            </div>

            {/* Vietnamese Meaning & Definition with ScrollMask */}
            <ScrollMask direction="vertical" fadeSize={24} className="flex-1 my-2 overflow-hidden">
              <div className="space-y-3.5 text-left py-1 pr-1">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Nghĩa tiếng Việt:</span>
                  <h3 className="text-2xl font-bold text-emerald-300 mt-0.5">
                    {currentWord.vietnamese}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {currentWord.definition}
                  </p>
                </div>

                {/* Example */}
                <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-cyan-400">Ví dụ minh họa:</span>
                    <AudioButton text={currentWord.example} size="sm" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">{currentWord.example}</p>
                  <p className="text-xs text-slate-400 mt-1 italic">{currentWord.exampleVi}</p>
                </div>

                {/* Mnemonic / Collocations */}
                {currentWord.mnemonic && (
                  <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-300">Mẹo ghi nhớ: </span>
                      <span className="text-xs text-slate-300">{currentWord.mnemonic}</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollMask>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Collocations: {currentWord.collocations?.slice(0, 2).join(', ')}</span>
              <span>Chạm để lật lại mặt trước</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card Navigation & Action Buttons */}
      <div className="w-full flex items-center justify-between gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
          title="Từ trước đó [←]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Mark as learned button */}
        <button
          onClick={handleMarkLearned}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all shadow-lg active:scale-98 cursor-pointer ${
            isLearned
              ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-emerald-950/30'
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-indigo-900/30 hover:brightness-110'
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${isLearned ? 'text-emerald-400' : 'text-white'}`} />
          <span>{isLearned ? 'Đã thuộc từ này (+20 XP)' : 'Đánh dấu đã thuộc (+20 XP)'}</span>
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
          title="Từ tiếp theo [→]"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
