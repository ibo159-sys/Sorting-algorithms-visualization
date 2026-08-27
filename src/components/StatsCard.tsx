'use client';

import React from 'react';
import { 
  Clock, 
  GitCompare, 
  ArrowLeftRight, 
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AlgorithmStats } from '../algorithms/types';

interface StatsCardProps {
  stats: AlgorithmStats;
  status: 'idle' | 'running' | 'paused' | 'completed';
  stepDescription: string;
  algorithmName: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  stats,
  status,
  stepDescription,
  algorithmName,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'running':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <Activity className="w-3 h-3 mr-1" />
            Sorting Active
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Paused
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Sorted & Verified
          </span>
        );
      case 'idle':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            Ready
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Comparisons */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Comparisons</span>
            <GitCompare className="w-4 h-4 text-amber-400/80" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-white tracking-tight">
            {stats.comparisons.toLocaleString()}
          </div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all" />
        </div>

        {/* Swaps / Overwrites */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Swaps / Writes</span>
            <ArrowLeftRight className="w-4 h-4 text-rose-400/80" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-white tracking-tight">
            {stats.swaps.toLocaleString()}
          </div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all" />
        </div>

        {/* Time Elapsed */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Elapsed Time</span>
            <Clock className="w-4 h-4 text-indigo-400/80" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-white tracking-tight">
            {stats.timeElapsedMs >= 1000 
              ? `${(stats.timeElapsedMs / 1000).toFixed(2)}s` 
              : `${Math.round(stats.timeElapsedMs)}ms`}
          </div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all" />
        </div>

        {/* Status */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pipeline State</span>
            <Activity className="w-4 h-4 text-emerald-400/80" />
          </div>
          <div className="mt-2">
            {getStatusBadge()}
          </div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
        </div>
      </div>

      {/* Live Step Explanation Bar */}
      <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl px-4 py-3 flex items-start space-x-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-semibold text-slate-200 mr-2">[{algorithmName} Step]:</span>
          <span className="font-mono text-slate-300">
            {stepDescription || 'Select an algorithm and click "Start Sort" or "Step" to begin visualization.'}
          </span>
        </div>
      </div>
    </div>
  );
};
