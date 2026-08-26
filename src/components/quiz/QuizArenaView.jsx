import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Zap, Check, X, RotateCcw, ArrowRight, Sparkles, HelpCircle, Trophy } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import SpotlightCard from '../reactbits/SpotlightCard';
import TrueFocus from '../reactbits/TrueFocus';
import StarBorder from '../reactbits/StarBorder';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

export default function QuizArenaView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Sentence scramble state
  const [selectedWords, setSelectedWords] = useState([]);
  
  // Overall session score
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const { addXp, recordQuizResult } = useStudyProgress();

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  // Handle Multiple Choice
  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQ.correctAnswer;
    setIsCorrect(correct);
    setSessionTotal((prev) => prev + 1);
    if (correct) {
      setSessionCorrect((prev) => prev + 1);
      addXp(25);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      addXp(5);
    }
    recordQuizResult(correct);
  };

  // Handle Sentence Scramble word click
  const handleWordClick = (word, wordIndex) => {
    if (isAnswered) return;
    if (selectedWords.some((w) => w.originalIndex === wordIndex)) {
      // unselect
      setSelectedWords(selectedWords.filter((w) => w.originalIndex !== wordIndex));
    } else {
      // select
      setSelectedWords([...selectedWords, { word, originalIndex: wordIndex }]);
    }
  };

  // Check sentence scramble answer
  const handleCheckSentence = () => {
    if (selectedWords.length === 0 || isAnswered) return;
    const userSentence = selectedWords.map((w) => w.word).join(' ');
    const correct = userSentence.trim() === currentQ.correctSentence.trim();

    setIsAnswered(true);
    setIsCorrect(correct);
    setSessionTotal((prev) => prev + 1);

    if (correct) {
      setSessionCorrect((prev) => prev + 1);
      addXp(30);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
    } else {
      addXp(5);
    }
    recordQuizResult(correct);
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
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
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedWords([]);
    setSessionCorrect(0);
    setSessionTotal(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Luyện Tập Thực Chiến & Tích Lũy XP</span>
        </div>

        <TrueFocus
          sentence="ĐẤU TRƯỜNG QUIZ TIẾNG ANH"
          borderColor="#06b6d4"
          glowColor="rgba(6, 182, 212, 0.5)"
          manualMode={false}
          animationDuration={0.4}
        />

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Làm bài trắc nghiệm phản xạ nhanh và thử thách xếp câu ngữ pháp để củng cố kiến thức vững vàng.
        </p>
      </div>

      {!isQuizCompleted ? (
        <SpotlightCard
          className="border-slate-800 bg-slate-900/90 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          spotlightColor="rgba(6, 182, 212, 0.15)"
        >
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 uppercase">
              {currentQ.tag}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Câu <strong className="text-cyan-400">{currentIdx + 1}</strong> / {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>+25 XP</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mb-6 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* MULTIPLE CHOICE TYPE */}
          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-heading">
                {currentQ.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, idx) => {
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
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center border border-slate-700">
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

              {/* Explanation box */}
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

          {/* SENTENCE SCRAMBLE TYPE */}
          {currentQ.type === 'sentence-scramble' && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-indigo-400 font-semibold uppercase mb-1">Yêu cầu:</p>
                <h3 className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                  {currentQ.instruction}
                </h3>
              </div>

              {/* Assembly Area */}
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

              {/* Word Bank Pool */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentQ.words.map((word, idx) => {
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

              {/* Check button for scramble */}
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
                    {isCorrect ? '🎉 Ghép câu hoàn hảo!' : '❌ Câu chuẩn xác là:'}
                  </p>
                  <p className="text-xs text-white font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    {currentQ.correctSentence}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* Next Question Navigation */}
          {isAnswered && (
            <div className="mt-6 pt-6 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-indigo-950/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả tổng kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </SpotlightCard>
      ) : (
        /* Summary Celebration Screen */
        <SpotlightCard className="border-indigo-500/30 bg-slate-900/90 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 border border-indigo-500/40 mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Hoàn Thành Luyện Tập!
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Bạn đã trả lời đúng <strong className="text-emerald-400">{sessionCorrect}</strong> / {QUIZ_QUESTIONS.length} câu hỏi thử thách.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Tích lũy thêm hàng trăm điểm XP vào hồ sơ của bạn!</span>
          </div>

          <div className="pt-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện tập lại lượt mới</span>
            </button>
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}
