import React, { useState } from 'react';
import { Sparkles, BookOpen, Flame, Zap, Award, Bookmark, Search, GraduationCap, Globe } from 'lucide-react';
import ShinyText from '../reactbits/ShinyText';
import DictionaryLookupModal from '../dictionary/DictionaryLookupModal';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const { progress, currentRank, progressPercent } = useStudyProgress();
  const [isDictOpen, setIsDictOpen] = useState(false);

  const totalBookmarks = progress.bookmarkedVocab.length + progress.bookmarkedGrammar.length;

  return (
    <>
      <DictionaryLookupModal isOpen={isDictOpen} onClose={() => setIsDictOpen(false)} />
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            
            {/* Logo */}
            <div
              onClick={() => setActiveTab('vocab')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/30" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <ShinyText
                    text="English Surge"
                    speed={4}
                    className="text-lg md:text-xl font-bold font-heading tracking-tight"
                  />
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Từ Vựng & Ngữ Pháp Chuyên Ngành</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
              <button
                onClick={() => setActiveTab('vocab')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'vocab'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Từ Vựng Theo Ngành
              </button>

              <button
                onClick={() => setActiveTab('grammar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'grammar'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Ngữ Pháp Trực Quan
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Đấu Trường Quiz
              </button>

              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                  activeTab === 'bookmarks'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Sổ Tay Lưu Trữ
                {totalBookmarks > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                    {totalBookmarks}
                  </span>
                )}
              </button>

              {/* Quick Online Dictionary Button */}
              <button
                onClick={() => setIsDictOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all ml-1 cursor-pointer"
                title="Tra cứu từ điển quốc tế trực tuyến"
              >
                <Search className="w-3.5 h-3.5" />
                Tra Từ Điển
              </button>
            </nav>

          {/* Gamification Stats & Level */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div
              title={`Chuỗi ${progress.streak} ngày học liên tiếp`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{progress.streak} ngày</span>
            </div>

            {/* XP and Level Bar */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-base">{currentRank.icon}</span>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="text-slate-300 font-medium">{currentRank.name}</span>
                  <span className="text-indigo-400 font-mono font-bold">{progress.xp} XP</span>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Bookmark shortcut */}
            <button
              onClick={() => setActiveTab('bookmarks')}
              className="md:hidden relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Bookmark className="w-5 h-5" />
              {totalBookmarks > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {totalBookmarks}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/60">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium ${
              activeTab === 'vocab' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Từ Vựng
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium ${
              activeTab === 'grammar' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Ngữ Pháp
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium ${
              activeTab === 'quiz' ? 'text-indigo-400 font-bold' : 'text-slate-400'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Luyện Tập
          </button>
        </div>
      </div>
    </header>
  </>
  );
}
