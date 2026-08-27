'use client';

import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shuffle, 
  StepForward, 
  Zap, 
  Sliders,
  Layers
} from 'lucide-react';
import { ALGORITHMS } from '../algorithms/registry';
import { ArrayDistribution } from '../algorithms/types';

interface ControlsProps {
  selectedAlgorithmId: string;
  onSelectAlgorithm: (id: string) => void;
  status: 'idle' | 'running' | 'paused' | 'completed';
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onGenerateNew: () => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  distribution: ArrayDistribution;
  setDistribution: (dist: ArrayDistribution) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  selectedAlgorithmId,
  onSelectAlgorithm,
  status,
  onStart,
  onPause,
  onStep,
  onReset,
  onGenerateNew,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  distribution,
  setDistribution,
}) => {
  const isRunning = status === 'running';

  const distributions: { id: ArrayDistribution; label: string }[] = [
    { id: 'random', label: 'Random' },
    { id: 'nearly-sorted', label: 'Nearly Sorted' },
    { id: 'reversed', label: 'Reversed' },
    { id: 'few-unique', label: 'Few Unique' },
    { id: 'sine-wave', label: 'Sine Wave' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Top Algorithm Selection Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Sorting Algorithm
          </label>
          <span className="text-[11px] text-slate-500 font-mono">
            {ALGORITHMS.length} Algorithms Available
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ALGORITHMS.map((algo) => {
            const isSelected = selectedAlgorithmId === algo.id;
            return (
              <button
                key={algo.id}
                onClick={() => onSelectAlgorithm(algo.id)}
                disabled={isRunning}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-400/50 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="font-semibold truncate">{algo.name}</div>
                <div className="text-[10px] opacity-70 font-mono mt-0.5">{algo.avgTime}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Buttons & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 border-t border-slate-800/80 items-center">
        {/* Playback Controls */}
        <div className="lg:col-span-6 flex flex-wrap items-center gap-2">
          {isRunning ? (
            <button
              onClick={onPause}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/30"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{status === 'paused' ? 'Resume' : 'Start Sort'}</span>
            </button>
          )}

          <button
            onClick={onStep}
            disabled={isRunning}
            title="Execute single animation step"
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <StepForward className="w-4 h-4" />
            <span className="hidden sm:inline">Step</span>
          </button>

          <button
            onClick={onReset}
            title="Reset to initial unsorted state"
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onGenerateNew}
            disabled={isRunning}
            title="Generate new array dataset"
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Shuffle className="w-4 h-4 text-indigo-400" />
            <span>New Array</span>
          </button>
        </div>

        {/* Sliders and Distribution Selector */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Distribution */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Pattern
            </label>
            <select
              value={distribution}
              disabled={isRunning}
              onChange={(e) => setDistribution(e.target.value as ArrayDistribution)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            >
              {distributions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 mb-1">
              <span>Size</span>
              <span className="font-mono text-indigo-300">{arraySize}</span>
            </div>
            <input
              type="range"
              min="8"
              max="80"
              value={arraySize}
              disabled={isRunning}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
            />
          </div>

          {/* Speed Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Speed
              </span>
              <span className="font-mono text-amber-300">
                {speed >= 80 ? 'Turbo' : `${speed}%`}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
