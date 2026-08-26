import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, Layers, LayoutGrid, Search, Code, Briefcase, Plane, Coffee, 
  GraduationCap, HeartPulse, Filter, CheckCircle2, BookOpen, 
  Loader2, Database, PlusCircle, Leaf, Scale, Wrench, Shield, Palette, Trophy 
} from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_LIST } from '../../data/vocabData';
import VocabFlashcardView from './VocabFlashcardView';
import VocabCard from './VocabCard';
import TrueFocus from '../reactbits/TrueFocus';
import ParticleBanner from '../reactbits/ParticleBanner';
import ScrollMask from '../reactbits/ScrollMask';
import DictionaryLookupModal from '../dictionary/DictionaryLookupModal';
import { useStudyProgress } from '../../context/StudyProgressContext';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const dictLetterCache = new Map();
const domainCache = new Map();
const ALL_DOMAINS = ['it', 'business', 'health', 'academic', 'biology', 'law', 'engineering', 'military', 'travel', 'arts', 'sports', 'daily'];

export default function VocabView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('flashcard'); // 'flashcard' or 'grid'
  const [isDictOpen, setIsDictOpen] = useState(false);

  // 103K Dict Browser State
  const [dictLetter, setDictLetter] = useState('a');
  const [activeWordsRaw, setActiveWordsRaw] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [gridVisibleCount, setGridVisibleCount] = useState(30);

  const { progress } = useStudyProgress();

  // Helper to fetch letter dictionary words
  const fetchLetterWords = async (letter) => {
    if (dictLetterCache.has(letter)) {
      return dictLetterCache.get(letter);
    }
    const res = await fetch(`/dict/${letter}.json`);
    if (!res.ok) throw new Error('Load failed');
    const data = await res.json();
    
    const list = Object.entries(data).map(([key, val], idx) => {
      let pos = 'noun';
      let vnMeaning = '';
      let exEn = '';
      let exVi = '';

      if (val.s && val.s.length > 0) {
        pos = val.s[0].pos || 'noun';
        if (val.s[0].meanings && val.s[0].meanings.length > 0) {
          vnMeaning = val.s[0].meanings[0].m || '';
          if (val.s[0].meanings[0].ex && val.s[0].meanings[0].ex.length > 0) {
            exEn = val.s[0].meanings[0].ex[0].e || '';
            exVi = val.s[0].meanings[0].ex[0].v || '';
          }
        }
      }

      return {
        id: `dict-${letter}-${idx + 1}`,
        word: val.w || key,
        ipa: val.p || `/${key}/`,
        partOfSpeech: pos,
        vietnamese: vnMeaning || 'Xem chi tiết định nghĩa tiếng Việt',
        category: 'dict',
        level: 'B1',
        definition: `${val.w || key} (${pos}): ${vnMeaning}`,
        example: exEn || `This is an example context for ${val.w || key}.`,
        exampleVi: exVi || `Đây là ngữ cảnh ví dụ của từ ${val.w || key}.`,
        collocations: [`learn ${key}`, `use ${key}`, `${key} in context`],
        mnemonic: `Từ vựng trong kho 103.376 từ điển Anh - Việt.`
      };
    });

    dictLetterCache.set(letter, list);
    return list;
  };

  // Helper to fetch domain specialized words
  const fetchDomainWords = async (domainKey) => {
    if (domainCache.has(domainKey)) {
      return domainCache.get(domainKey);
    }
    const res = await fetch(`/domain/${domainKey}.json`);
    if (!res.ok) throw new Error('Domain load failed');
    const list = await res.json();
    domainCache.set(domainKey, list);
    return list;
  };

  // Load words when category or letter changes
  useEffect(() => {
    let active = true;

    if (selectedCategory === 'all') {
      setActiveWordsRaw(VOCAB_LIST);
      setDataLoading(false);
      return;
    }

    if (ALL_DOMAINS.includes(selectedCategory)) {
      setDataLoading(true);
      fetchDomainWords(selectedCategory)
        .then((list) => {
          if (!active) return;
          setActiveWordsRaw(list);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error('Error loading domain words:', err);
          if (active) {
            setActiveWordsRaw(VOCAB_LIST.filter((w) => w.category === selectedCategory));
            setDataLoading(false);
          }
        });
      return;
    }

    if (selectedCategory === 'dict') {
      setDataLoading(true);
      if (dictLetter === 'all') {
        Promise.all(['a', 'b', 'c', 's'].map(fetchLetterWords))
          .then((results) => {
            if (!active) return;
            const combined = results.flat();
            setActiveWordsRaw(combined);
            setDataLoading(false);
          })
          .catch((err) => {
            console.error(err);
            if (active) setDataLoading(false);
          });
      } else {
        fetchLetterWords(dictLetter)
          .then((list) => {
            if (!active) return;
            setActiveWordsRaw(list);
            setDataLoading(false);
          })
          .catch((err) => {
            console.error(err);
            if (active) setDataLoading(false);
          });
      }
    }

    return () => {
      active = false;
    };
  }, [selectedCategory, dictLetter]);

  // Handle switching category
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setGridVisibleCount(30);
    setSearchQuery('');
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Leaf': return <Leaf className="w-4 h-4" />;
      case 'Scale': return <Scale className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Full Uncut List of words matching search and category
  const allFilteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activeWordsRaw.filter((item) => {
      const matchLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const matchSearch =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.vietnamese.toLowerCase().includes(q) ||
        (item.definition && item.definition.toLowerCase().includes(q));
      
      return matchLevel && matchSearch;
    });
  }, [activeWordsRaw, selectedLevel, searchQuery]);

  // Paginated/Sliced subset only for Grid list view performance
  const gridWords = useMemo(() => {
    return allFilteredWords.slice(0, gridVisibleCount);
  }, [allFilteredWords, gridVisibleCount]);

  const totalCompletedInCategory = useMemo(() => {
    return allFilteredWords.filter((w) => progress.completedVocab.includes(w.id)).length;
  }, [allFilteredWords, progress.completedVocab]);

  return (
    <div className="space-y-8">
      {/* Full-Width Interactive Particle Canvas Banner */}
      <ParticleBanner height={260} mouseRadius={120} force={14} className="w-full" />

      {/* Hero Header with TrueFocus Animation */}
      <div className="text-center space-y-3 pt-1 pb-2 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kho 103.376+ Từ Vựng & 12 Lĩnh Vực Chuyên Ngành Toàn Diện</span>
        </div>

        <TrueFocus
          sentence="TỪ VỰNG CHUYÊN SÂU THEO NGÀNH"
          borderColor="#818cf8"
          glowColor="rgba(99, 102, 241, 0.5)"
        />

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Trau dồi vốn từ không giới hạn qua 12 chuyên ngành sâu sắc với âm thanh chuẩn Oxford, phiên âm IPA và chế độ lật thẻ 3D xáo trộn thông minh.
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
                onClick={() => handleCategoryChange(cat.id)}
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

      {/* A-Z Letter Navigation Bar when in 103K Dict Category */}
      {selectedCategory === 'dict' && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Database className="w-4 h-4" />
              <span>Duyệt Từ Điển 103K Theo Chữ Cái:</span>
            </div>
            <span className="text-xs text-slate-400">
              Đang chọn: <strong>{dictLetter === 'all' ? 'TẤT CẢ (A, B, C, S)' : `Chữ ${dictLetter.toUpperCase()}`}</strong> ({allFilteredWords.length} từ)
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            <button
              onClick={() => {
                setDictLetter('all');
                setGridVisibleCount(30);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                dictLetter === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              ALL (TẤT CẢ)
            </button>

            {ALPHABET.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setDictLetter(l);
                  setGridVisibleCount(30);
                }}
                className={`w-8 h-8 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  dictLetter === l
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters & View Mode Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        {/* Search Bar with Online Dictionary Shortcut */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setGridVisibleCount(30);
              }}
              placeholder={`Tìm trong ${allFilteredWords.length} từ...`}
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Flashcard</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mastery Progress Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            Đang hiển thị: <strong className="text-emerald-400">{allFilteredWords.length}</strong> từ vựng chuyên ngành
          </span>
        </div>

        <div className="text-slate-500 text-xs">
          Phím tắt: <strong>[Space]</strong> Lật • <strong>[V]</strong> Nghe loa • <strong>[→]</strong> Chuyển từ • <strong>[X]</strong> Xáo trộn
        </div>
      </div>

      {/* Main Content Render */}
      {dataLoading ? (
        <div className="text-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
          <p className="text-sm text-slate-400">Đang tải toàn bộ dữ liệu từ vựng chuyên ngành...</p>
        </div>
      ) : allFilteredWords.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-base text-slate-300 font-medium">Không tìm thấy từ vựng phù hợp</p>
          <p className="text-xs text-slate-500">Hãy thử tìm từ khác hoặc bấm "Tra Online" để tra trực tiếp từ điển quốc tế.</p>
        </div>
      ) : viewMode === 'flashcard' ? (
        <VocabFlashcardView words={allFilteredWords} onSwitchToList={() => setViewMode('grid')} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridWords.map((word) => (
              <VocabCard key={word.id} word={word} />
            ))}
          </div>

          {gridVisibleCount < allFilteredWords.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setGridVisibleCount((prev) => prev + 30)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-sm font-semibold transition-all shadow-lg hover:scale-102 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tải thêm 30 từ tiếp theo (Còn {allFilteredWords.length - gridVisibleCount} từ)</span>
              </button>
            </div>
          )}
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
