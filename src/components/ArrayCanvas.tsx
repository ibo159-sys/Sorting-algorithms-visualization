'use client';

import React from 'react';
import { StepType } from '../algorithms/types';

interface ArrayCanvasProps {
  array: number[];
  activeIndices: number[];
  activeType: StepType | null;
  sortedIndices: Set<number>;
  maxValue?: number;
  heightClass?: string;
  showLabels?: boolean;
}

export const ArrayCanvas: React.FC<ArrayCanvasProps> = ({
  array,
  activeIndices,
  activeType,
  sortedIndices,
  maxValue = 100,
  heightClass = 'h-[360px] sm:h-[420px]',
  showLabels = true,
}) => {
  const getBarColor = (index: number, value: number) => {
    const isActive = activeIndices.includes(index);
    const isSorted = sortedIndices.has(index);

    if (isActive) {
      switch (activeType) {
        case 'compare':
          return 'bg-amber-400 border-amber-300 text-amber-950 shadow-[0_0_14px_rgba(251,191,36,0.6)] z-10 scale-[1.02]';
        case 'swap':
          return 'bg-rose-500 border-rose-400 text-white shadow-[0_0_18px_rgba(244,63,94,0.8)] z-20 scale-[1.05] animate-pulse';
        case 'overwrite':
          return 'bg-purple-500 border-purple-400 text-white shadow-[0_0_14px_rgba(168,85,247,0.7)] z-10 scale-[1.02]';
        case 'pivot':
          return 'bg-cyan-400 border-cyan-300 text-cyan-950 shadow-[0_0_14px_rgba(6,182,212,0.7)] z-10 font-bold';
        case 'boundary':
          return 'bg-indigo-400 border-indigo-300 text-indigo-950 shadow-[0_0_10px_rgba(129,140,248,0.5)]';
        case 'sorted':
        case 'final-sweep':
          return 'bg-emerald-400 border-emerald-300 text-emerald-950 shadow-[0_0_10px_rgba(52,211,153,0.5)]';
        default:
          return 'bg-sky-400 border-sky-300 text-sky-950';
      }
    }

    if (isSorted) {
      return 'bg-gradient-to-t from-emerald-600/80 to-emerald-400/90 border-emerald-400/40 text-emerald-100 shadow-[0_0_6px_rgba(16,185,129,0.2)]';
    }

    // Default bar state: dynamic hue based on value
    return 'bg-gradient-to-t from-indigo-950/90 via-indigo-600/80 to-sky-400/90 border-indigo-400/30 text-slate-200 hover:brightness-125';
  };

  const shouldRenderNumbers = showLabels && array.length <= 32;

  return (
    <div className={`relative w-full ${heightClass} bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md`}>
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Legend Indicator */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-2 text-[11px] text-slate-400 border-b border-slate-800/60">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-indigo-700 to-sky-400 border border-indigo-400/40" />
            <span>Unsorted</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 border border-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 border border-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.7)]" />
            <span>Swapping</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 border border-cyan-300" />
            <span>Pivot/Key</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-300" />
            <span>Sorted</span>
          </div>
        </div>
        <div className="font-mono text-slate-500">
          N = {array.length} items
        </div>
      </div>

      {/* Main Bars Canvas */}
      <div className="relative z-10 flex-1 flex items-end justify-center gap-[1px] sm:gap-[2px] pt-4 pb-2 px-1">
        {array.map((value, idx) => {
          const heightPercent = Math.max(6, Math.min(100, (value / maxValue) * 100));
          const colorClass = getBarColor(idx, value);

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full max-w-[40px] group transition-all duration-75"
            >
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-md border-t border-x transition-all duration-75 flex flex-col items-center justify-start pt-1 ${colorClass}`}
              >
                {shouldRenderNumbers && (
                  <span className="text-[10px] font-mono font-bold leading-none select-none opacity-90">
                    {value}
                  </span>
                )}
              </div>
              {shouldRenderNumbers && (
                <span className="text-[9px] font-mono text-slate-500 mt-1 select-none">
                  {idx}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
