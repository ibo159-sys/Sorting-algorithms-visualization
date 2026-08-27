'use client';

import React from 'react';
import { Code2, Terminal } from 'lucide-react';
import { AlgorithmInfo } from '../algorithms/types';

interface CodeHighlightProps {
  algorithm: AlgorithmInfo;
  activeLine?: number;
}

export const CodeHighlight: React.FC<CodeHighlightProps> = ({
  algorithm,
  activeLine,
}) => {
  return (
    <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>Pseudocode Execution Trace</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          {algorithm.name}
        </span>
      </div>

      <div className="p-4 font-mono text-xs overflow-x-auto flex-1 bg-slate-950/60">
        <div className="space-y-1">
          {algorithm.pseudoCode.map((lineObj) => {
            const isHighlighted = activeLine === lineObj.line;
            return (
              <div
                key={lineObj.line}
                className={`flex items-center px-2 py-1 rounded transition-all duration-150 ${
                  isHighlighted
                    ? 'bg-indigo-600/30 text-indigo-200 border-l-2 border-indigo-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="w-6 shrink-0 text-[10px] text-slate-600 select-none">
                  {lineObj.line}
                </span>
                <span className="whitespace-pre">{lineObj.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
