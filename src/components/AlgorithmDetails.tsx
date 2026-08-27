'use client';

import React from 'react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  BookOpen, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { AlgorithmInfo } from '../algorithms/types';

interface AlgorithmDetailsProps {
  algorithm: AlgorithmInfo;
}

export const AlgorithmDetails: React.FC<AlgorithmDetailsProps> = ({ algorithm }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl backdrop-blur-md">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white tracking-tight">{algorithm.name}</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {algorithm.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {algorithm.description}
          </p>
        </div>

        {/* In-Place & Stability Flags */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center space-x-1.5 ${
            algorithm.stable 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{algorithm.stable ? 'Stable Sort' : 'Unstable'}</span>
          </div>

          <div className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center space-x-1.5 ${
            algorithm.inPlace 
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}>
            <Cpu className="w-3.5 h-3.5" />
            <span>{algorithm.inPlace ? 'In-Place O(1)' : 'Auxiliary Space'}</span>
          </div>
        </div>
      </div>

      {/* Complexity Breakdown Badges */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Asymptotic Complexity Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">Best Case Time</span>
            <span className="text-emerald-400 font-bold text-base mt-1 block">{algorithm.bestTime}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">Average Time</span>
            <span className="text-indigo-400 font-bold text-base mt-1 block">{algorithm.avgTime}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">Worst Case Time</span>
            <span className="text-rose-400 font-bold text-base mt-1 block">{algorithm.worstTime}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">Worst Space</span>
            <span className="text-cyan-400 font-bold text-base mt-1 block">{algorithm.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* How it Works Step List */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Algorithmic Step-by-Step Procedure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          {algorithm.howItWorks.map((step, idx) => (
            <div key={idx} className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3 flex items-start space-x-2.5">
              <span className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons & Real-World Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            Key Advantages
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {algorithm.pros.map((p, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <X className="w-4 h-4" />
            Trade-offs & Limitations
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {algorithm.cons.map((c, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Real World Application */}
      <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 flex items-start space-x-3 text-xs">
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-indigo-300 mr-2">Industry & Production Context:</span>
          <span className="text-slate-300">{algorithm.realWorldUse}</span>
        </div>
      </div>
    </div>
  );
};
