import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Bookmark, AlertTriangle, Check, X, HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import ShaderCard from '../reactbits/ShaderCard';
import DecryptedText from '../reactbits/DecryptedText';
import AudioButton from '../common/AudioButton';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

export default function GrammarLessonCard({ lesson }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { progress, toggleGrammarComplete, toggleGrammarBookmark, recordQuizResult } = useStudyProgress();

  const isCompleted = progress.completedGrammar.includes(lesson.id);
  const isBookmarked = progress.bookmarkedGrammar.includes(lesson.id);

  const handleMiniQuizAnswer = (index) => {
    if (quizSubmitted) return;
    setSelectedAnswer(index);
    setQuizSubmitted(true);
    const isCorrect = index === lesson.miniQuiz.answerIndex;
    recordQuizResult(isCorrect);

    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  const handleCompleteToggle = () => {
    toggleGrammarComplete(lesson.id);
    if (!isCompleted) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <ShaderCard
      className="rounded-2xl overflow-hidden p-0"
      color1={[0.2, 0.1, 0.5]}
      color2={[0.1, 0.45, 0.8]}
      color3={[0.4, 0.1, 0.6]}
      speed={0.6}
    >
      {/* Lesson Header */}
      <div className="p-6 border-b border-slate-800/80">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 uppercase tracking-wider">
                {lesson.category.toUpperCase()} • Level {lesson.level}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              <DecryptedText text={lesson.title} animateOn="hover" speed={35} />
            </h3>
            <p className="text-sm font-semibold text-emerald-400 mt-1">
              {lesson.vietnameseTitle}
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-3xl">
              {lesson.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleGrammarBookmark(lesson.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Lưu chuyên đề ngữ pháp"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleCompleteToggle}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isCompleted ? 'Đã thành thạo' : 'Đánh dấu xong (+35 XP)'}</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6 bg-slate-950/40">
          {/* Formula Box */}
          {lesson.formula && (
            <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-5 border border-indigo-500/20 shadow-inner">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Cấu trúc & Công thức trọng tâm</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5 font-mono text-xs sm:text-sm">
                {Object.entries(lesson.formula).map(([key, val]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-indigo-400 font-bold uppercase text-[11px] px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20 w-fit">
                      {key}
                    </span>
                    <span className="text-slate-200">{val}</span>
                  </div>
                ))}
              </div>

              {lesson.signals && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center flex-wrap gap-2 text-xs">
                  <span className="text-slate-400 font-sans font-semibold">Dấu hiệu nhận biết:</span>
                  {lesson.signals.map((sig, idx) => (
                    <span key={idx} className="bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-md font-mono text-[11px]">
                      {sig}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detailed Usages & Real Examples */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Quy tắc sử dụng & Ví dụ thực tế:
            </h4>
            <div className="space-y-3">
              {lesson.usages?.map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800/90">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-indigo-300">
                        {idx + 1}. {item.rule}
                      </p>
                      <p className="text-sm font-semibold text-white mt-1">{item.example}</p>
                      <p className="text-xs text-slate-400 italic">{item.exampleVi}</p>
                    </div>
                    <AudioButton text={item.example} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes & Corrections */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="bg-rose-500/5 rounded-2xl p-4 sm:p-5 border border-rose-500/20">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Bẫy ngữ pháp thường gặp & Cách sửa</span>
              </div>

              <div className="space-y-3">
                {lesson.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs sm:text-sm bg-slate-950/80 p-3.5 rounded-xl border border-rose-500/10">
                    <div className="flex items-center gap-2 text-rose-400 font-mono">
                      <span>{mistake.wrong}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                      <span>{mistake.right}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-1 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      💡 <strong>Giải thích:</strong> {mistake.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mini Interactive Self-Check Quiz */}
          {lesson.miniQuiz && (
            <div className="bg-indigo-950/30 rounded-2xl p-4 sm:p-5 border border-indigo-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Thử thách nhanh (Kiểm tra độ hiểu bài)</span>
                </div>
                <span className="text-xs text-indigo-300 font-mono font-bold">+15 XP</span>
              </div>

              <p className="text-sm font-semibold text-white mb-3">
                {lesson.miniQuiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lesson.miniQuiz.options.map((opt, optIdx) => {
                  const isThisSelected = selectedAnswer === optIdx;
                  const isCorrectAnswer = optIdx === lesson.miniQuiz.answerIndex;

                  let btnStyle = 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800';

                  if (quizSubmitted) {
                    if (isCorrectAnswer) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
                    } else if (isThisSelected && !isCorrectAnswer) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-800/50 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => handleMiniQuizAnswer(optIdx)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrectAnswer && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {quizSubmitted && isThisSelected && !isCorrectAnswer && (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <p className="font-semibold text-indigo-300 mb-0.5">Phân tích:</p>
                  <p>{lesson.miniQuiz.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </ShaderCard>
  );
}
