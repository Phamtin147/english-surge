import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudyProgressProvider } from './context/StudyProgressContext';
import AuroraBackground from './components/reactbits/AuroraBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VocabView from './components/vocabulary/VocabView';
import GrammarView from './components/grammar/GrammarView';
import QuizArenaView from './components/quiz/QuizArenaView';
import BookmarksView from './components/bookmarks/BookmarksView';

function MainContent() {
  const [activeTab, setActiveTab] = useState('vocab');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'vocab' && (
            <motion.div
              key="vocab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <VocabView />
            </motion.div>
          )}

          {activeTab === 'grammar' && (
            <motion.div
              key="grammar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <GrammarView />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <QuizArenaView />
            </motion.div>
          )}

          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BookmarksView
                onNavigateToVocab={() => setActiveTab('vocab')}
                onNavigateToGrammar={() => setActiveTab('grammar')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StudyProgressProvider>
      <AuroraBackground>
        <MainContent />
      </AuroraBackground>
    </StudyProgressProvider>
  );
}
