import React from 'react';
import { Zap, Globe, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import ShinyText from '../reactbits/ShinyText';
import { useStudyProgress } from '../../context/StudyProgressContext';

export default function Footer() {
  const { progress } = useStudyProgress();

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ tiến độ học và XP không?')) {
      localStorage.removeItem('english_surge_progress_v1');
      window.location.reload();
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">English Surge</span>
                <span className="text-xs text-slate-400">⚡ Ôn tập thông minh</span>
              </div>
              <p className="text-xs text-slate-400">
                Sử dụng animation phong cách React Bits • Sẵn sàng deploy Surge.sh
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deploy: <code className="text-indigo-300">surge dist/ english-surge.surge.sh</code></span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors cursor-pointer"
              title="Đặt lại dữ liệu học"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset tiến độ</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-400">
          <p>© 2026 English Surge • Luyện tập Từ vựng theo Chuyên ngành & Ngữ pháp Logic</p>
        </div>
      </div>
    </footer>
  );
}
