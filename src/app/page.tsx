'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { VisualizerSingle } from '../components/VisualizerSingle';
import { VisualizerArena } from '../components/VisualizerArena';
import { ComplexityTable } from '../components/ComplexityTable';
import { LegacyComparison } from '../components/LegacyComparison';
import { Github, Sparkles, Layers, Cpu, Code2, Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'single' | 'arena' | 'theory' | 'evolution'>('single');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'single' && <VisualizerSingle />}
        {activeTab === 'arena' && <VisualizerArena />}
        {activeTab === 'theory' && <ComplexityTable />}
        {activeTab === 'evolution' && <LegacyComparison />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">SortPulse</span>
            <span>•</span>
            <span>Next.js Interactive Sorting Visualizer</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('evolution')}
              className="hover:text-indigo-400 transition-colors"
            >
              v1 to v2 Refactoring Log
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('theory')}
              className="hover:text-indigo-400 transition-colors"
            >
              Complexity Matrix
            </button>
            <span>•</span>
            <a
              href="https://github.com/ibo159-sys/Sorting-algorithms-visualization"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
