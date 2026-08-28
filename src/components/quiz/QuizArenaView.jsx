import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Award, Zap, Check, X, RotateCcw, ArrowRight, 
  Sparkles, HelpCircle, Trophy, RefreshCw, Layers, Code, Briefcase, 
  HeartPulse, BookOpen, Plane, Database, Flame, CheckCircle2
} from 'lucide-react';
import { QUIZ_CATEGORIES, STATIC_QUIZ_QUESTIONS, generateQuizQuestionsFromVocab, shuffleArray } from '../../data/quizData';
import { VOCAB_LIST } from '../../data/vocabData';
import SpotlightCard from '../reactbits/SpotlightCard';
import TrueFocus from '../reactbits/TrueFocus';
import StarBorder from '../reactbits/StarBorder';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

const ICONS_MAP = {
  Sparkles,
  Code,
  Briefcase,
  GraduationCap,
  BookOpen,
  HeartPulse,
  Plane,
  Database
};

const domainCache = new Map();
const dictLetterCache = new Map();
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function QuizArenaView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [questionList, setQuestionList] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const [selectedWords, setSelectedWords] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const { addXp, recordQuizResult } = useStudyProgress();

  const fetchCategoryQuestions = useCallback(async (catId) => {
    setIsLoadingQuestions(true);
    let questions = [];

    try {
      if (catId === 'grammar') {
        const grammarQuestions = STATIC_QUIZ_QUESTIONS.filter(q => q.category === 'grammar');
        questions = shuffleArray(grammarQuestions);
      } else if (catId === 'all') {
        let domainWords = [];
        for (const d of ['it', 'business', 'health', 'academic']) {
          if (!domainCache.has(d)) {
            const res = await fetch(`/domain/${d}.json`);
            if (res.ok) {
              const data = await res.json();
              domainCache.set(d, data);
            }
          }
          if (domainCache.has(d)) {
            domainWords.push(...domainCache.get(d));
          }
        }
        if (domainWords.length === 0) {
          domainWords = VOCAB_LIST;
        }
        const dynamicQuestions = generateQuizQuestionsFromVocab(domainWords, 30, 'Tổng hợp');
        questions = shuffleArray([...STATIC_QUIZ_QUESTIONS, ...dynamicQuestions]);
      } else if (catId === 'dict') {
        const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        let dictWords = [];
        if (dictLetterCache.has(randomLetter)) {
          dictWords = dictLetterCache.get(randomLetter);
        } else {
          const res = await fetch(`/dict/${randomLetter}.json`);
          if (res.ok) {
            const data = await res.json();
            dictWords = Object.entries(data).map(([key, val], idx) => {
              let vnMeaning = '';
              let exEn = '';
              let exVi = '';
              if (val.s && val.s.length > 0 && val.s[0].meanings && val.s[0].meanings.length > 0) {
                vnMeaning = val.s[0].meanings[0].m || '';
                if (val.s[0].meanings[0].ex && val.s[0].meanings[0].ex.length > 0) {
                  exEn = val.s[0].meanings[0].ex[0].e || '';
                  exVi = val.s[0].meanings[0].ex[0].v || '';
                }
              }
              return {
                id: `dict-${randomLetter}-${idx}`,
                word: key,
                ipa: val.p || '',
                vietnamese: vnMeaning,
                example: exEn,
                exampleVi: exVi,
                category: 'dict',
                level: '103K'
              };
            }).filter(item => item.vietnamese && item.vietnamese.length > 2);
            dictLetterCache.set(randomLetter, dictWords);
          }
        }
        questions = generateQuizQuestionsFromVocab(dictWords, 25, `Từ điển [${randomLetter.toUpperCase()}]`);
      } else {
        let domainWords = [];
        if (domainCache.has(catId)) {
          domainWords = domainCache.get(catId);
        } else {
          const res = await fetch(`/domain/${catId}.json`);
          if (res.ok) {
            domainWords = await res.json();
            domainCache.set(catId, domainWords);
          }
        }
        if (!domainWords || domainWords.length === 0) {
          domainWords = VOCAB_LIST.filter(v => v.category === catId);
        }
        const staticForCat = STATIC_QUIZ_QUESTIONS.filter(q => q.category === catId);
        const dynamicQuestions = generateQuizQuestionsFromVocab(domainWords, 25, catId.toUpperCase());
        questions = shuffleArray([...staticForCat, ...dynamicQuestions]);
      }
    } catch {
      questions = STATIC_QUIZ_QUESTIONS;
    }

    if (questions.length === 0) {
      questions = STATIC_QUIZ_QUESTIONS;
    }

    setQuestionList(questions);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedWords([]);
    setIsQuizCompleted(false);
    setIsLoadingQuestions(false);
  }, []);

  useEffect(() => {
    fetchCategoryQuestions(selectedCategory);
  }, [selectedCategory, fetchCategoryQuestions]);

  const currentQ = questionList[currentIdx] || STATIC_QUIZ_QUESTIONS[0];

  const handleSelectOption = (index) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQ.correctAnswer;
    setIsCorrect(correct);
    setSessionTotal((prev) => prev + 1);
    
    if (correct) {
      setSessionCorrect((prev) => prev + 1);
      setStreakCount((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      addXp(25 + Math.min(streakCount * 5, 25));
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      setStreakCount(0);
      addXp(5);
    }
    recordQuizResult(correct);
  };

  const handleWordClick = (word, wordIndex) => {
    if (isAnswered) return;
    if (selectedWords.some((w) => w.originalIndex === wordIndex)) {
      setSelectedWords(selectedWords.filter((w) => w.originalIndex !== wordIndex));
    } else {
      setSelectedWords([...selectedWords, { word, originalIndex: wordIndex }]);
    }
  };

  const handleCheckSentence = () => {
    if (selectedWords.length === 0 || isAnswered || !currentQ) return;
    const userSentence = selectedWords.map((w) => w.word).join(' ');
    const correct = userSentence.trim() === currentQ.correctSentence?.trim();

    setIsAnswered(true);
    setIsCorrect(correct);
    setSessionTotal((prev) => prev + 1);

    if (correct) {
      setSessionCorrect((prev) => prev + 1);
      setStreakCount((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      addXp(30);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
    } else {
      setStreakCount(0);
      addXp(5);
    }
    recordQuizResult(correct);
  };

  const handleNextQuestion = () => {
    if (currentIdx < questionList.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedWords([]);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    fetchCategoryQuestions(selectedCategory);
    setSessionCorrect(0);
    setSessionTotal(0);
    setStreakCount(0);
  };

  const handleRefreshSet = () => {
    fetchCategoryQuestions(selectedCategory);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 pt-2 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Luyện Tập Thực Chiến & Tích Lũy XP Đấu Trường</span>
        </div>

        <TrueFocus
          sentence="ĐẤU TRƯỜNG QUIZ TIẾNG ANH"
          borderColor="#06b6d4"
          glowColor="rgba(6, 182, 212, 0.5)"
          manualMode={false}
          animationDuration={0.4}
        />

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Làm bài trắc nghiệm phản xạ nhanh, điền khuyết câu và thử thách xếp câu ngữ pháp từ kho hơn 100K từ vựng.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {QUIZ_CATEGORIES.map((cat) => {
          const IconComponent = ICONS_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-950/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold truncate text-slate-200">{cat.name}</span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1">{cat.desc}</p>
            </button>
          );
        })}
      </div>

      {!isQuizCompleted && !isLoadingQuestions && currentQ && (
        <SpotlightCard
          className="border-slate-800 bg-slate-900/90 rounded-3xl p-5 sm:p-8 relative overflow-hidden"
          spotlightColor="rgba(6, 182, 212, 0.15)"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 uppercase">
                {currentQ.tag || 'Trắc nghiệm'}
              </span>
              {streakCount > 1 && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  Streak {streakCount}x
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Câu <strong className="text-cyan-400">{currentIdx + 1}</strong> / {questionList.length}
              </span>
              <button
                type="button"
                onClick={handleRefreshSet}
                title="Tạo bộ câu hỏi ngẫu nhiên mới"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải bộ mới</span>
              </button>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mb-6 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questionList.length) * 100}%` }}
            />
          </div>

          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed whitespace-pre-line font-heading">
                {currentQ.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentQ.correctAnswer;

                  let cardStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                  if (isAnswered) {
                    if (isCorrectOption) {
                      cardStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/40';
                    } else if (isSelected && !isCorrectOption) {
                      cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/40';
                    } else {
                      cardStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-sm sm:text-base text-left transition-all duration-200 active:scale-98 cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center border border-slate-700 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && isCorrectOption && (
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <X className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    {isCorrect ? '🎉 Xuất sắc! Đáp án chính xác (+25 XP)' : '❌ Chưa chính xác (+5 XP tham gia)'}
                  </p>
                  <p className="text-xs text-slate-300">{currentQ.explanation}</p>
                </motion.div>
              )}
            </div>
          )}

          {currentQ.type === 'sentence-scramble' && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-indigo-400 font-semibold uppercase mb-1">Yêu cầu:</p>
                <h3 className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                  {currentQ.instruction}
                </h3>
              </div>

              <div className="min-h-16 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 flex flex-wrap items-center gap-2">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">
                    Chạm vào các từ bên dưới để ghép thành câu hoàn chỉnh...
                  </span>
                ) : (
                  selectedWords.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleWordClick(item.word, item.originalIndex)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-medium text-xs sm:text-sm hover:bg-indigo-700 transition-all cursor-pointer shadow-sm"
                    >
                      {item.word}
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {currentQ.words?.map((word, idx) => {
                  const isUsed = selectedWords.some((w) => w.originalIndex === idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isUsed || isAnswered}
                      onClick={() => handleWordClick(word, idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                        isUsed
                          ? 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-40 cursor-not-allowed'
                          : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:border-slate-600 active:scale-95'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {!isAnswered ? (
                <button
                  type="button"
                  onClick={handleCheckSentence}
                  disabled={selectedWords.length === 0}
                  className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Kiểm tra câu (+30 XP)
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-sm ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {isCorrect ? '🎉 Ghép câu hoàn toàn chính xác (+30 XP)!' : '❌ Chưa chính xác rồi'}
                  </p>
                  <p className="text-xs opacity-90 mb-1">
                    <strong>Câu đúng:</strong> {currentQ.correctSentence}
                  </p>
                  <p className="text-xs text-slate-400">{currentQ.explanation}</p>
                </motion.div>
              )}
            </div>
          )}

          {isAnswered && (
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm hover:opacity-95 transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer active:scale-98"
              >
                <span>{currentIdx < questionList.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </SpotlightCard>
      )}

      {isLoadingQuestions && (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-slate-300 text-sm font-semibold">Đang chuẩn bị và sinh ngẫu nhiên bộ câu hỏi đấu trường...</p>
        </div>
      )}

      {isQuizCompleted && (
        <SpotlightCard
          className="border-slate-800 bg-slate-900/90 rounded-3xl p-8 text-center space-y-6"
          spotlightColor="rgba(99, 102, 241, 0.2)"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8 text-slate-950" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-heading">Hoàn Thành Đấu Trường Quiz!</h3>
            <p className="text-sm text-slate-400">
              Bạn đã hoàn thành phiên luyện tập với kết quả đáng nể.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-2">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Đúng</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {sessionCorrect} / {sessionTotal}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Tỷ lệ</span>
              <span className="text-xl font-bold text-cyan-400 font-mono">
                {sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Chuỗi cao nhất</span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {bestStreak}x
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/40"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại bộ mới</span>
            </button>
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}
