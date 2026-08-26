import React, { useState, useMemo } from 'react';
import { BookOpen, Clock, GitFork, RefreshCw, Link2, ShieldAlert, AlertTriangle, Search, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { GRAMMAR_CATEGORIES, GRAMMAR_LESSONS } from '../../data/grammarData';
import GrammarLessonCard from './GrammarLessonCard';
import TrueFocus from '../reactbits/TrueFocus';
import ScrollMask from '../reactbits/ScrollMask';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function GrammarView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { progress } = useStudyProgress();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-4 h-4" />;
      case 'GitFork': return <GitFork className="w-4 h-4" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4" />;
      case 'Link2': return <Link2 className="w-4 h-4" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredLessons = useMemo(() => {
    return GRAMMAR_LESSONS.filter((lesson) => {
      const matchCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || lesson.level.includes(selectedLevel);
      const matchSearch =
        searchQuery.trim() === '' ||
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const completedCount = useMemo(() => {
    return filteredLessons.filter((l) => progress.completedGrammar.includes(l.id)).length;
  }, [filteredLessons, progress.completedGrammar]);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hệ Thống Ngữ Pháp Tư Duy Trực Quan</span>
        </div>

        <TrueFocus
          sentence="BẢN ĐỒ NGỮ PHÁP TIẾNG ANH"
          borderColor="#818cf8"
          glowColor="rgba(129, 140, 248, 0.5)"
        />

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Nắm vững logic cốt lõi của 12 thì, câu điều kiện, bị động, mệnh đề quan hệ và triệt tiêu hơn 50 lỗi ngữ pháp kinh điển.
        </p>
      </div>

      {/* Category Pills Bar with ScrollMask */}
      <ScrollMask direction="horizontal" fadeSize={40} className="w-full">
        <div className="flex items-center gap-2 py-1 px-1">
          {GRAMMAR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102'
                    : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300'}`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </ScrollMask>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chuyên đề, công thức, thì..."
            className="w-full pl-9.5 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả Level</option>
            <option value="A2">Level A2</option>
            <option value="B1">Level B1</option>
            <option value="B2">Level B2</option>
            <option value="C1">Level C1</option>
          </select>
        </div>
      </div>

      {/* Progress Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            Đã thành thạo: <strong className="text-emerald-400">{completedCount}</strong> / {filteredLessons.length} chuyên đề
          </span>
        </div>
        <span className="text-indigo-400 font-mono font-medium">
          {filteredLessons.length > 0
            ? `${Math.round((completedCount / filteredLessons.length) * 100)}% hoàn thành`
            : '0%'}
        </span>
      </div>

      {/* Lesson List */}
      <div className="space-y-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <GrammarLessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            Không tìm thấy bài học ngữ pháp phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
