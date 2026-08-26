import React, { useState } from 'react';
import { Bookmark, Sparkles, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { VOCAB_LIST } from '../../data/vocabData';
import { GRAMMAR_LESSONS } from '../../data/grammarData';
import VocabCard from '../vocabulary/VocabCard';
import GrammarLessonCard from '../grammar/GrammarLessonCard';
import TrueFocus from '../reactbits/TrueFocus';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function BookmarksView({ onNavigateToVocab, onNavigateToGrammar }) {
  const [activeSubTab, setActiveSubTab] = useState('vocab');
  const { progress } = useStudyProgress();

  const savedVocabList = VOCAB_LIST.filter((w) => progress.bookmarkedVocab.includes(w.id));
  const savedGrammarList = GRAMMAR_LESSONS.filter((l) => progress.bookmarkedGrammar.includes(l.id));

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Sổ Tay Học Tập Cá Nhân Hóa</span>
        </div>

        <TrueFocus
          sentence="MỤC ĐÃ LƯU TRỮ ĐỂ ÔN TẬP"
          borderColor="#f59e0b"
          glowColor="rgba(245, 158, 11, 0.5)"
          manualMode={false}
          animationDuration={0.4}
        />

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Tập hợp toàn bộ từ vựng và chuyên đề ngữ pháp bạn đã đánh dấu để ôn tập nhanh bất cứ lúc nào.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setActiveSubTab('vocab')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'vocab'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Từ vựng đã lưu ({savedVocabList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('grammar')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'grammar'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ngữ pháp đã lưu ({savedGrammarList.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeSubTab === 'vocab' && (
        <div>
          {savedVocabList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVocabList.map((word) => (
                <VocabCard key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Chưa có từ vựng nào được lưu</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Khi lướt xem từ vựng chuyên ngành hoặc lật Flashcard, hãy chạm vào biểu tượng Bookmark để lưu vào sổ tay này nhé.
              </p>
              <button
                onClick={onNavigateToVocab}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition-all cursor-pointer"
              >
                <span>Khám phá từ vựng ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'grammar' && (
        <div>
          {savedGrammarList.length > 0 ? (
            <div className="space-y-6">
              {savedGrammarList.map((lesson) => (
                <GrammarLessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Chưa có chuyên đề ngữ pháp nào được lưu</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Lưu lại các chuyên đề như 12 thì, câu điều kiện hoặc các bẫy ngữ pháp người Việt hay gặp để ôn lại trước kỳ thi.
              </p>
              <button
                onClick={onNavigateToGrammar}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition-all cursor-pointer"
              >
                <span>Xem các bài học ngữ pháp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
