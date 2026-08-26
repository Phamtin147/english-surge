import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Volume2, Plus, Check, Loader2, ExternalLink, BookmarkCheck, Sparkles } from 'lucide-react';
import { lookupWordOnline } from '../../services/dictionaryApi';
import AudioButton from '../common/AudioButton';
import { useStudyProgress } from '../../context/StudyProgressContext';
import confetti from 'canvas-confetti';

export default function DictionaryLookupModal({ isOpen, onClose, initialQuery = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const { progress } = useStudyProgress();

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);

    const data = await lookupWordOnline(searchTerm);
    setLoading(false);

    if (data.error) {
      setError(data.message);
    } else {
      setResult(data);
    }
  };

  const handleSaveToDeck = () => {
    if (!result) return;
    setSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/80 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Từ Điển Quốc Tế Trực Tuyến</h3>
                <p className="text-xs text-slate-400">Tra cứu định nghĩa, phát âm & ví dụ cho bất kỳ từ vựng tiếng Anh nào</p>
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
          <form onSubmit={handleSearch} className="my-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập từ tiếng Anh cần tra (vd: serendipity, quantum, ubiquitous)..."
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
              <span>Tra từ</span>
            </button>
          </form>

          {/* Result Content */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm text-center">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-5 animate-fade-in">
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

                {/* Meanings & Definitions */}
                {result.meanings.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {m.partOfSpeech}
                    </span>

                    <div className="space-y-2.5 pt-1">
                      {m.definitions.map((def, dIdx) => (
                        <div key={dIdx} className="text-xs sm:text-sm text-slate-300 space-y-1">
                          <p className="leading-relaxed">
                            <span className="font-semibold text-indigo-400">{dIdx + 1}.</span> {def.definition}
                          </p>
                          {def.example && (
                            <p className="text-xs text-slate-400 italic pl-3 border-l border-indigo-500/40">
                              "{def.example}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Synonyms */}
                    {m.synonyms && m.synonyms.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Từ đồng nghĩa:</span>
                        {m.synonyms.map((syn, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              setSearchTerm(syn);
                              lookupWordOnline(syn).then((d) => {
                                if (!d.error) setResult(d);
                              });
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer font-mono"
                          >
                            {syn}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Sparkles className="w-8 h-8 text-indigo-500/50 mx-auto animate-pulse" />
                <p className="text-sm">Gõ bất kỳ từ tiếng Anh nào để tra nghĩa và nghe phát âm chuẩn quốc tế.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
