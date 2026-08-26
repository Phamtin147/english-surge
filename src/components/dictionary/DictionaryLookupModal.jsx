import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Volume2, Plus, Check, Loader2, Sparkles, Database, ArrowRight } from 'lucide-react';
import { lookupWordOnline, getWordSuggestions } from '../../services/dictionaryApi';
import AudioButton from '../common/AudioButton';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

export default function DictionaryLookupModal({ isOpen, onClose, initialQuery = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      handleSearch(null, initialQuery);
    }
  }, [initialQuery]);

  // Dynamic prefix suggestions as user types
  useEffect(() => {
    let active = true;
    if (searchTerm.trim().length >= 2) {
      getWordSuggestions(searchTerm).then((list) => {
        if (active) setSuggestions(list);
      });
    } else {
      setSuggestions([]);
    }
    return () => {
      active = false;
    };
  }, [searchTerm]);

  const handleSearch = async (e, wordToSearch = null) => {
    if (e) e.preventDefault();
    const query = (wordToSearch || searchTerm).trim();
    if (!query) return;

    setLoading(true);
    setError('');
    setResult(null);
    setSuggestions([]);

    const data = await lookupWordOnline(query);
    setLoading(false);

    if (data.error) {
      setError(data.message);
    } else {
      setResult(data);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/80 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">Từ Điển Anh - Việt 103.000+ Từ</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Full 109K Dict
                  </span>
                </div>
                <p className="text-xs text-slate-400">Tra cứu tức thì nghĩa tiếng Việt, phiên âm IPA & ví dụ song ngữ</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="my-3 relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nhập bất kỳ từ tiếng Anh nào (vd: scalability, deployment, serendipity)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-900/40"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Tra</span>
              </button>
            </div>

            {/* Live Autocomplete Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-950 border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-30 flex flex-wrap gap-1">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchTerm(s);
                      handleSearch(null, s);
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-indigo-600/30 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{s}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400 opacity-60" />
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Result Content */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm text-center">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Word Title & Audio */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/20">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-heading capitalize">
                      {result.word}
                    </h2>
                    {result.ipa && (
                      <span className="text-sm font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20 mt-1 inline-block">
                        {result.ipa}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <AudioButton text={result.word} audioUrl={result.audio} size="lg" />
                  </div>
                </div>

                {/* Vietnamese Sections (from 103K Dictionary) */}
                {result.vietnameseSections && result.vietnameseSections.length > 0 ? (
                  result.vietnameseSections.map((sec, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {sec.pos}
                      </span>

                      <div className="space-y-3 pt-1">
                        {sec.meanings.map((mObj, mIdx) => (
                          <div key={mIdx} className="text-xs sm:text-sm text-slate-200 space-y-1.5 pl-2 border-l-2 border-indigo-500/40">
                            <p className="font-semibold text-emerald-300 leading-relaxed">
                              • {mObj.m}
                            </p>

                            {/* Examples */}
                            {mObj.ex && mObj.ex.length > 0 && (
                              <div className="space-y-1 pl-2 text-xs text-slate-400">
                                {mObj.ex.map((ex, exIdx) => (
                                  <div key={exIdx} className="italic">
                                    <span className="text-indigo-300 font-medium">{ex.e}</span>
                                    {ex.v && <span className="text-slate-400"> : {ex.v}</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  /* Fallback to online meanings if local was empty */
                  result.onlineMeanings?.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {m.partOfSpeech}
                      </span>
                      {m.definitions?.map((def, dIdx) => (
                        <p key={dIdx} className="text-xs sm:text-sm text-slate-300">
                          <span className="font-semibold text-indigo-400">{dIdx + 1}.</span> {def.definition}
                        </p>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center py-6 text-slate-500 space-y-4">
                <Database className="w-8 h-8 text-indigo-500/50 mx-auto animate-pulse" />
                <p className="text-sm">Đã nạp toàn bộ cơ sở dữ liệu <strong>103.376 từ vựng Anh - Việt</strong>. Gõ bất kỳ từ nào để tra cứu.</p>

                {/* Popular Trending Words */}
                <div className="pt-4 border-t border-slate-800/80 text-left">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">🔥 Từ vựng gợi ý tra nhanh:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'scalability', 'vulnerability', 'deployment', 'refactoring', 'concurrency',
                      'serendipity', 'epiphany', 'resilience', 'procrastination', 'metabolism',
                      'cardiovascular', 'synergy', 'ubiquitous', 'paradigm', 'empathy'
                    ].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => {
                          setSearchTerm(w);
                          handleSearch(null, w);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 hover:border-indigo-500/40 text-xs text-indigo-300 transition-colors cursor-pointer"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
