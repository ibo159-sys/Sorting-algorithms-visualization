'use client';

import React from 'react';
import { 
  History, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Cpu, 
  Code, 
  Boxes,
  Gauge
} from 'lucide-react';

export const LegacyComparison: React.FC = () => {
  const evolutionPoints = [
    {
      area: 'Architecture & Framework',
      v1: 'Vanilla JavaScript ES6 DOM manipulation, static index.html with single-file script.js.',
      v2: 'Next.js 14 App Router, React 18, Strict TypeScript with type-safe state machines.',
      benefit: 'Maintainable, component-driven, reusable generator pipelines and zero runtime type errors.',
    },
    {
      area: 'Algorithm Stepping Engine',
      v1: 'Callback-based setTimeout sleep loops with shared global variables.',
      v2: 'ES6 Generator Functions (function*) yielding discrete immutable animation step snapshots.',
      benefit: 'Enables instant pause, true single-step debugging, backward history scrubbing, and turbo execution.',
    },
    {
      area: 'Concurrent Comparison Arena',
      v1: 'Single algorithm view only; required re-running sequentially.',
      v2: 'Multi-algorithm concurrent race arena executing up to 6 algorithms on identical shared datasets in real-time.',
      benefit: 'Direct visual benchmarking of time & swap trade-offs under identical input distributions.',
    },
    {
      area: 'Audio Synthesis & Feedback',
      v1: 'No audio feedback or basic pre-recorded audio beeps.',
      v2: 'Real-time Web Audio API synthesizer with dynamic frequency pitch modulation and smooth ramp envelopes.',
      benefit: 'Rich auditory reinforcement of array value distribution and sorting mechanics.',
    },
    {
      area: 'Styling & Design System',
      v1: 'Custom CSS stylesheet with fixed layout and basic CSS transitions.',
      v2: 'Tailwind CSS, Glassmorphism UI, Lucide vector icons, dynamic responsive grid canvas.',
      benefit: 'Flawless responsiveness across mobile, tablet, and ultra-wide displays with modern cyber dark aesthetic.',
    },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>Project Evolution & Architecture Log</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-1">From Vanilla JS Prototype to Modern Next.js Engine</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          This project was originally conceived and built 1 year ago as an exploratory HTML5, CSS3, and Vanilla JavaScript sorting visualizer. It has since undergone a complete architectural re-engineering into a modern, full-stack Next.js and TypeScript application with generator-based pipelines and real-time concurrent benchmarking.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-4">
        {evolutionPoints.map((item, idx) => (
          <div 
            key={idx}
            className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 transition-all hover:border-slate-700"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              {item.area}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
              {/* Legacy V1 */}
              <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  v1.0 (Vanilla HTML/CSS/JS)
                </span>
                <p className="text-slate-400 font-mono text-[11px]">{item.v1}</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex md:col-span-2 items-center justify-center text-indigo-400">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Modern V2 */}
              <div className="md:col-span-5 bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 block">
                  v2.0 (Next.js 14 + TypeScript)
                </span>
                <p className="text-slate-200 font-mono text-[11px]">{item.v2}</p>
              </div>
            </div>

            {/* Engineering Benefit */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{item.benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Badges */}
      <div className="pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Technologies & Ecosystem
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'ES6 Generators', 'Lucide React', 'Canvas Confetti'].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
