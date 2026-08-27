'use client';

import React from 'react';
import { ALGORITHMS } from '../algorithms/registry';
import { ShieldCheck, ShieldAlert, Cpu, Sparkles, Check, X } from 'lucide-react';

export const ComplexityTable: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Algorithm Complexity & Characterization Matrix</h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparative analysis across time complexities, auxiliary memory constraints, and stability behaviors.
          </p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Algorithm</th>
              <th className="px-4 py-3.5">Best Time</th>
              <th className="px-4 py-3.5">Average Time</th>
              <th className="px-4 py-3.5">Worst Time</th>
              <th className="px-4 py-3.5">Space (Auxiliary)</th>
              <th className="px-4 py-3.5">Stability</th>
              <th className="px-4 py-3.5">In-Place</th>
              <th className="px-4 py-3.5">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
            {ALGORITHMS.map((algo) => {
              return (
                <tr key={algo.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-sans font-bold text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{algo.name}</span>
                  </td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">{algo.bestTime}</td>
                  <td className="px-4 py-3 text-indigo-300 font-semibold">{algo.avgTime}</td>
                  <td className="px-4 py-3 text-rose-400 font-semibold">{algo.worstTime}</td>
                  <td className="px-4 py-3 text-cyan-300">{algo.spaceComplexity}</td>
                  <td className="px-4 py-3 font-sans">
                    {algo.stable ? (
                      <span className="inline-flex items-center text-emerald-400 font-medium gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Stable
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-rose-400 font-medium gap-1 text-[11px]">
                        <X className="w-3.5 h-3.5" /> Unstable
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-sans">
                    {algo.inPlace ? (
                      <span className="inline-flex items-center text-cyan-400 font-medium gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-amber-400 font-medium gap-1 text-[11px]">
                        <X className="w-3.5 h-3.5" /> No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-sans text-slate-400 text-[11px]">
                    {algo.badge}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            What is Stability?
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            A sorting algorithm is <strong>stable</strong> if two objects with equal keys appear in the same order in sorted output as they appear in the input array. Critical when sorting multi-attribute data (e.g. sort by Name, then by Date).
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            In-Place Sorting
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            An <strong>in-place</strong> algorithm transforms input without using substantial extra data structures, requiring only \(O(1)\) or \(O(\log n)\) auxiliary stack space, making it memory-efficient on constrained systems.
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Hybrid Sorting in Modern Languages
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Modern standard libraries employ hybrid algorithms: <strong>Timsort</strong> (Python, Java) combines Merge Sort + Insertion Sort, while <strong>Introsort</strong> (C++) combines Quick Sort, Heap Sort, and Insertion Sort.
          </p>
        </div>
      </div>
    </div>
  );
};
