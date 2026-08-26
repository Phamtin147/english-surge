import React, { useState, useMemo } from 'react';
import { Sparkles, Layers, LayoutGrid, Search, Code, Briefcase, Plane, Coffee, GraduationCap, HeartPulse, Filter, CheckCircle2, Wand2, BookOpen } from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_LIST } from '../../data/vocabData';
import VocabFlashcardView from './VocabFlashcardView';
import VocabCard from './VocabCard';
import TrueFocus from '../reactbits/TrueFocus';
import ParticleBanner from '../reactbits/ParticleBanner';
import ScrollMask from '../reactbits/ScrollMask';
import DictionaryLookupModal from '../dictionary/DictionaryLookupModal';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function VocabView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('flashcard'); // 'flashcard' or 'grid'
  const [isDictOpen, setIsDictOpen] = useState(false);

  const { progress } = useStudyProgress();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filtered vocabulary list
  const filteredWords = useMemo(() => {
    return VOCAB_LIST.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const totalCompletedInCategory = useMemo(() => {
    return filteredWords.filter((w) => progress.completedVocab.includes(w.id)).length;
  }, [filteredWords, progress.completedVocab]);

  return (
    <div className="space-y-8">
      {/* Full-Width Interactive Particle Canvas Banner */}
      <ParticleBanner height={260} mouseRadius={120} force={14} className="w-full" />

      {/* Hero Header with TrueFocus Animation */}
      <div className="text-center space-y-3 pt-1 pb-2 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kho Từ Vựng Chuyên Ngành Chuẩn Quốc Tế</span>
        </div>

        <TrueFocus
          sentence="TỪ VỰNG CHUYÊN SÂU THEO NGÀNH"
          borderColor="#818cf8"
          glowColor="rgba(99, 102, 241, 0.5)"
        />

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Trau dồi vốn từ theo ngữ cảnh thực tế với phiên âm IPA, giọng đọc chuẩn, collocations và phương pháp lật thẻ 3D ghi nhớ ngắt quãng.
        </p>
      </div>

      {/* Category Pills Bar with Dynamic ScrollMask */}
      <ScrollMask direction="horizontal" fadeSize={40} className="w-full">
        <div className="flex items-center gap-2 py-1 px-1">
          {VOCAB_CATEGORIES.map((cat) => {
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

      {/* Filters & View Mode Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        {/* Search Bar with Online Dictionary Shortcut */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ vựng trong kho..."
              className="w-full pl-9.5 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            onClick={() => setIsDictOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
            title="Tra từ điển quốc tế trực tuyến"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tra Online</span>
          </button>
        </div>

        {/* Level filter & View Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Level Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Tất cả Level</option>
              <option value="A2">Level A2 (Sơ cấp)</option>
              <option value="B1">Level B1 (Trung cấp)</option>
              <option value="B2">Level B2 (Trung cao cấp)</option>
              <option value="C1">Level C1 (Nâng cao)</option>
            </select>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('flashcard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'flashcard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcard 3D</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Danh sách ({filteredWords.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mastery Progress Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            Đã thuộc: <strong className="text-emerald-400">{totalCompletedInCategory}</strong> / {filteredWords.length} từ trong nhóm này
          </span>
        </div>
        <span className="text-indigo-400 font-mono font-medium">
          {filteredWords.length > 0
            ? `${Math.round((totalCompletedInCategory / filteredWords.length) * 100)}% hoàn thành`
            : '0%'}
        </span>
      </div>

      {/* Main Content Render */}
      {viewMode === 'flashcard' ? (
        <VocabFlashcardView words={filteredWords} onSwitchToList={() => setViewMode('grid')} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => (
            <VocabCard key={word.id} word={word} />
          ))}
        </div>
      )}

      {/* Online Dictionary Lookup Modal */}
      <DictionaryLookupModal
        isOpen={isDictOpen}
        onClose={() => setIsDictOpen(false)}
        initialQuery={searchQuery}
      />
    </div>
  );
}
