'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shuffle, 
  Trophy, 
  Zap, 
  Clock, 
  GitCompare, 
  ArrowLeftRight,
  CheckCircle2,
  Swords
} from 'lucide-react';
import { ALGORITHMS } from '../algorithms/registry';
import { AlgorithmInfo, ArrayDistribution, StepType } from '../algorithms/types';
import { generateArray } from '../utils/arrayGenerator';
import { soundController } from '../utils/sound';
import confetti from 'canvas-confetti';

interface RunnerState {
  info: AlgorithmInfo;
  array: number[];
  activeIndices: number[];
  activeType: StepType | null;
  sortedIndices: Set<number>;
  comparisons: number;
  swaps: number;
  isFinished: boolean;
  finishTime: number | null;
  rank: number | null;
  generator: Generator<any, void, unknown> | null;
}

export const VisualizerArena: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(30);
  const [speed, setSpeed] = useState<number>(50);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [selectedAlgoIds, setSelectedAlgoIds] = useState<string[]>([
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ]);

  const [baseArray, setBaseArray] = useState<number[]>([]);
  const [runners, setRunners] = useState<RunnerState[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [raceFinished, setRaceFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number>(0);
  const runnersRef = useRef<RunnerState[]>([]);

  runnersRef.current = runners;

  // Initialize or re-create runners
  const initRace = useCallback((arr?: number[]) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRunning(false);
    setRaceFinished(false);
    setStartTime(null);

    const initialArr = arr || generateArray(arraySize, distribution);
    setBaseArray(initialArr);

    const initialRunners: RunnerState[] = selectedAlgoIds.map((id) => {
      const info = ALGORITHMS.find((a) => a.id === id) || ALGORITHMS[0];
      return {
        info,
        array: [...initialArr],
        activeIndices: [],
        activeType: null,
        sortedIndices: new Set<number>(),
        comparisons: 0,
        swaps: 0,
        isFinished: false,
        finishTime: null,
        rank: null,
        generator: info.generator([...initialArr]),
      };
    });

    setRunners(initialRunners);
  }, [arraySize, distribution, selectedAlgoIds]);

  // Initial load
  useEffect(() => {
    initRace();
  }, [initRace]);

  const toggleAlgoSelection = (id: string) => {
    if (isRunning) return;
    if (selectedAlgoIds.includes(id)) {
      if (selectedAlgoIds.length > 2) {
        setSelectedAlgoIds(selectedAlgoIds.filter((x) => x !== id));
      }
    } else {
      setSelectedAlgoIds([...selectedAlgoIds, id]);
    }
  };

  const handleStartRace = () => {
    if (raceFinished) {
      initRace(baseArray);
    }
    setIsRunning(true);
    if (!startTime) {
      setStartTime(performance.now());
    }
  };

  const handlePauseRace = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleResetRace = () => {
    initRace(baseArray);
  };

  const handleGenerateNew = () => {
    const newArr = generateArray(arraySize, distribution);
    initRace(newArr);
  };

  // Main animation loop for simultaneous execution
  useEffect(() => {
    if (!isRunning) return;

    // Map speed (1..100) to frame interval (50ms down to 0ms for turbo)
    const intervalMs = Math.max(0, Math.round((100 - speed) * 0.8));

    let finishCounter = runnersRef.current.filter((r) => r.isFinished).length;

    const tick = (currentTime: number) => {
      if (currentTime - lastStepTimeRef.current >= intervalMs) {
        lastStepTimeRef.current = currentTime;

        let anyActive = false;
        const updatedRunners = runnersRef.current.map((runner) => {
          if (runner.isFinished || !runner.generator) {
            return runner;
          }

          anyActive = true;
          const next = runner.generator.next();

          if (next.done) {
            finishCounter++;
            const finishTimeMs = performance.now() - (startTime || performance.now());
            const finalSorted = new Set<number>();
            for (let i = 0; i < runner.array.length; i++) finalSorted.add(i);

            soundController.playCompletionChime();

            return {
              ...runner,
              isFinished: true,
              activeIndices: [],
              activeType: null,
              sortedIndices: finalSorted,
              finishTime: finishTimeMs,
              rank: finishCounter,
              generator: null,
            };
          }

          const step = next.value;
          const newArray = [...runner.array];
          let newComparisons = runner.comparisons;
          let newSwaps = runner.swaps;
          const newSorted = new Set(runner.sortedIndices);

          if (step.values) {
            Object.entries(step.values).forEach(([idxStr, val]) => {
              newArray[Number(idxStr)] = val as number;
            });
          }

          if (step.type === 'compare') {
            newComparisons++;
            if (step.indices[0] !== undefined) {
              soundController.playTone(runner.array[step.indices[0]] || 50);
            }
          } else if (step.type === 'swap' || step.type === 'overwrite') {
            newSwaps++;
          } else if (step.type === 'sorted') {
            step.indices.forEach((idx: number) => newSorted.add(idx));
          }

          return {
            ...runner,
            array: newArray,
            activeIndices: step.indices,
            activeType: step.type,
            sortedIndices: newSorted,
            comparisons: newComparisons,
            swaps: newSwaps,
          };
        });

        setRunners(updatedRunners);

        const allDone = updatedRunners.every((r) => r.isFinished);
        if (allDone) {
          setIsRunning(false);
          setRaceFinished(true);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, speed, startTime]);

  const sortedLeaderboard = [...runners].sort((a, b) => {
    if (a.isFinished && b.isFinished) return (a.rank || 0) - (b.rank || 0);
    if (a.isFinished) return -1;
    if (b.isFinished) return 1;
    return a.comparisons - b.comparisons;
  });

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-indigo-400" />
              Algorithm Comparison Arena
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Benchmark multiple algorithms executing side-by-side simultaneously on the exact same array dataset.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isRunning ? (
              <button
                onClick={handlePauseRace}
                className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Arena</span>
              </button>
            ) : (
              <button
                onClick={handleStartRace}
                className="flex items-center space-x-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{raceFinished ? 'Replay Race' : 'Start Race'}</span>
              </button>
            )}

            <button
              onClick={handleResetRace}
              title="Reset"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleGenerateNew}
              disabled={isRunning}
              title="Generate New Dataset"
              className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium disabled:opacity-40"
            >
              <Shuffle className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">New Data</span>
            </button>
          </div>
        </div>

        {/* Algorithm Selectors & Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Active Algorithms Toggle */}
          <div className="lg:col-span-7 flex flex-wrap gap-2">
            {ALGORITHMS.map((algo) => {
              const isSelected = selectedAlgoIds.includes(algo.id);
              return (
                <button
                  key={algo.id}
                  onClick={() => toggleAlgoSelection(algo.id)}
                  disabled={isRunning}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:text-slate-300'
                  } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {algo.shortName}
                </button>
              );
            })}
          </div>

          {/* Size & Speed */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Pattern</label>
              <select
                value={distribution}
                disabled={isRunning}
                onChange={(e) => setDistribution(e.target.value as ArrayDistribution)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200"
              >
                <option value="random">Random</option>
                <option value="nearly-sorted">Nearly Sorted</option>
                <option value="reversed">Reversed</option>
                <option value="few-unique">Few Unique</option>
                <option value="sine-wave">Sine Wave</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>N</span>
                <span className="font-mono text-indigo-300">{arraySize}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={arraySize}
                disabled={isRunning}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>Speed</span>
                <span className="font-mono text-amber-300">{speed}%</span>
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

      {/* Arena Grid: Side-by-Side Visualizers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {runners.map((runner) => {
          const getBarBg = (idx: number) => {
            if (runner.activeIndices.includes(idx)) {
              if (runner.activeType === 'swap') return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]';
              if (runner.activeType === 'compare') return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]';
              return 'bg-cyan-400';
            }
            if (runner.sortedIndices.has(idx)) {
              return 'bg-emerald-400/90 shadow-[0_0_4px_rgba(52,211,153,0.3)]';
            }
            return 'bg-indigo-500/70';
          };

          return (
            <div
              key={runner.info.id}
              className={`bg-slate-900/80 border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden backdrop-blur-md transition-all ${
                runner.isFinished
                  ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'border-slate-800/80'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{runner.info.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{runner.info.avgTime}</span>
                </div>

                {runner.isFinished ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Trophy className="w-3 h-3 mr-1 text-amber-400" />
                    Rank #{runner.rank}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">
                    {isRunning ? 'Running...' : 'Ready'}
                  </span>
                )}
              </div>

              {/* Mini Array Canvas */}
              <div className="h-44 flex items-end justify-center gap-[1.5px] py-2">
                {runner.array.map((val, idx) => {
                  const height = Math.max(8, Math.min(100, (val / 100) * 100));
                  return (
                    <div
                      key={idx}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-sm transition-all duration-75 ${getBarBg(idx)}`}
                    />
                  );
                })}
              </div>

              {/* Metrics Footer */}
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800/60 font-mono text-[11px] text-center">
                <div className="bg-slate-950/60 rounded-lg py-1 px-1">
                  <span className="text-[9px] text-slate-500 block">Comparisons</span>
                  <span className="text-amber-400 font-bold">{runner.comparisons}</span>
                </div>
                <div className="bg-slate-950/60 rounded-lg py-1 px-1">
                  <span className="text-[9px] text-slate-500 block">Swaps</span>
                  <span className="text-rose-400 font-bold">{runner.swaps}</span>
                </div>
                <div className="bg-slate-950/60 rounded-lg py-1 px-1">
                  <span className="text-[9px] text-slate-500 block">Time</span>
                  <span className="text-indigo-300 font-bold">
                    {runner.finishTime !== null ? `${Math.round(runner.finishTime)}ms` : '-'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Podium Table */}
      {raceFinished && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3 animate-fade-in">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Race Leaderboard & Benchmark Summary</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-slate-400 uppercase text-[10px] bg-slate-950/80 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2 font-sans">Algorithm</th>
                  <th className="px-4 py-2">Comparisons</th>
                  <th className="px-4 py-2">Swaps / Writes</th>
                  <th className="px-4 py-2">Execution Time</th>
                  <th className="px-4 py-2 font-sans">Worst Time Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedLeaderboard.map((r, i) => (
                  <tr key={r.info.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-2.5 font-bold">
                      {i === 0 && '🥇 1st'}
                      {i === 1 && '🥈 2nd'}
                      {i === 2 && '🥉 3rd'}
                      {i > 2 && `#${i + 1}`}
                    </td>
                    <td className="px-4 py-2.5 font-sans font-semibold text-white">
                      {r.info.name}
                    </td>
                    <td className="px-4 py-2.5 text-amber-400 font-semibold">
                      {r.comparisons.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-rose-400 font-semibold">
                      {r.swaps.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-indigo-300 font-semibold">
                      {r.finishTime !== null ? `${Math.round(r.finishTime)}ms` : '-'}
                    </td>
                    <td className="px-4 py-2.5 font-sans text-slate-400">
                      {r.info.worstTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
