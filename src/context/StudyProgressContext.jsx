import React, { createContext, useContext, useState, useEffect } from 'react';

const StudyProgressContext = createContext(null);

const STORAGE_KEY = 'english_surge_progress_v1';

const RANKS = [
  { level: 1, name: 'Tân binh Hiếu học', minXp: 0, icon: '🌱' },
  { level: 2, name: 'Chiến binh Từ vựng', minXp: 100, icon: '⚡' },
  { level: 3, name: 'Chuyên gia Ngữ pháp', minXp: 300, icon: '🔥' },
  { level: 4, name: 'Bậc thầy Giao tiếp', minXp: 600, icon: '💎' },
  { level: 5, name: 'Huyền thoại Anh ngữ', minXp: 1000, icon: '👑' },
];

export function StudyProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse progress from storage', e);
    }
    return {
      xp: 50, // initial bonus
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      completedVocab: [],
      bookmarkedVocab: [],
      completedGrammar: [],
      bookmarkedGrammar: [],
      quizScores: {
        totalAnswered: 0,
        correctCount: 0,
      }
    };
  });

  // Calculate Streak on load
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = progress.lastActiveDate;

    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let newStreak = progress.streak;

      if (lastDate === yesterday) {
        newStreak += 1;
      } else if (lastDate < yesterday) {
        newStreak = 1;
      }

      setProgress((prev) => ({
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      }));
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [progress]);

  const addXp = (amount) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const toggleVocabLearned = (vocabId) => {
    setProgress((prev) => {
      const isCompleted = prev.completedVocab.includes(vocabId);
      const newCompleted = isCompleted
        ? prev.completedVocab.filter((id) => id !== vocabId)
        : [...prev.completedVocab, vocabId];
      
      return {
        ...prev,
        completedVocab: newCompleted,
        xp: isCompleted ? prev.xp : prev.xp + 20, // +20 XP on learning
      };
    });
  };

  const toggleVocabBookmark = (vocabId) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedVocab.includes(vocabId);
      return {
        ...prev,
        bookmarkedVocab: isBookmarked
          ? prev.bookmarkedVocab.filter((id) => id !== vocabId)
          : [...prev.bookmarkedVocab, vocabId],
      };
    });
  };

  const toggleGrammarComplete = (grammarId) => {
    setProgress((prev) => {
      const isCompleted = prev.completedGrammar.includes(grammarId);
      const newCompleted = isCompleted
        ? prev.completedGrammar.filter((id) => id !== grammarId)
        : [...prev.completedGrammar, grammarId];

      return {
        ...prev,
        completedGrammar: newCompleted,
        xp: isCompleted ? prev.xp : prev.xp + 35, // +35 XP on grammar completion
      };
    });
  };

  const toggleGrammarBookmark = (grammarId) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedGrammar.includes(grammarId);
      return {
        ...prev,
        bookmarkedGrammar: isBookmarked
          ? prev.bookmarkedGrammar.filter((id) => id !== grammarId)
          : [...prev.bookmarkedGrammar, grammarId],
      };
    });
  };

  const recordQuizResult = (isCorrect) => {
    setProgress((prev) => ({
      ...prev,
      xp: isCorrect ? prev.xp + 15 : prev.xp + 5, // participation XP
      quizScores: {
        totalAnswered: prev.quizScores.totalAnswered + 1,
        correctCount: prev.quizScores.correctCount + (isCorrect ? 1 : 0),
      },
    }));
  };

  // Determine current Rank
  const currentRank = [...RANKS].reverse().find((r) => progress.xp >= r.minXp) || RANKS[0];
  const nextRank = RANKS.find((r) => r.minXp > progress.xp);
  const currentRankMin = currentRank.minXp;
  const nextRankMin = nextRank ? nextRank.minXp : currentRankMin + 500;
  const progressPercent = Math.min(
    100,
    Math.round(((progress.xp - currentRankMin) / (nextRankMin - currentRankMin)) * 100)
  );

  return (
    <StudyProgressContext.Provider
      value={{
        progress,
        currentRank,
        nextRank,
        progressPercent,
        addXp,
        toggleVocabLearned,
        toggleVocabBookmark,
        toggleGrammarComplete,
        toggleGrammarBookmark,
        recordQuizResult,
      }}
    >
      {children}
    </StudyProgressContext.Provider>
  );
}

export function useStudyProgress() {
  const context = useContext(StudyProgressContext);
  if (!context) {
    throw new Error('useStudyProgress must be used within a StudyProgressProvider');
  }
  return context;
}
