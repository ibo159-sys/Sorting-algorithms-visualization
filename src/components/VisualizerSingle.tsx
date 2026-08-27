'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALGORITHMS, getAlgorithmById } from '../algorithms/registry';
import { ArrayDistribution, StepType, AlgorithmStats, AnimationStep } from '../algorithms/types';
import { generateArray } from '../utils/arrayGenerator';
import { soundController } from '../utils/sound';
import { ArrayCanvas } from './ArrayCanvas';
import { Controls } from './Controls';
import { StatsCard } from './StatsCard';
import { CodeHighlight } from './CodeHighlight';
import { AlgorithmDetails } from './AlgorithmDetails';
import confetti from 'canvas-confetti';

export const VisualizerSingle: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('quick-sort');
  const [arraySize, setArraySize] = useState<number>(24);
  const [speed, setSpeed] = useState<number>(60);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');

  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [activeType, setActiveType] = useState<StepType | null>(null);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [activeCodeLine, setActiveCodeLine] = useState<number | undefined>(undefined);
  const [stepDescription, setStepDescription] = useState<string>('');

  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [stats, setStats] = useState<AlgorithmStats>({
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
    timeElapsedMs: 0,
  });

  const generatorRef = useRef<Generator<AnimationStep, void, unknown> | null>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedOffsetRef = useRef<number>(0);

  const selectedAlgorithm = getAlgorithmById(selectedAlgoId);

  // Initialize array
  const resetArrayState = useCallback((arr: number[], algoId = selectedAlgoId) => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    const algo = getAlgorithmById(algoId);
    setInitialArray([...arr]);
    setCurrentArray([...arr]);
    setActiveIndices([]);
    setActiveType(null);
    setSortedIndices(new Set());
    setActiveCodeLine(undefined);
    setStepDescription('Array initialized. Click "Start Sort" to run or "Step" to advance one instruction.');
    setStatus('idle');
    setStats({
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      timeElapsedMs: 0,
    });
    elapsedOffsetRef.current = 0;
    startTimeRef.current = null;
    generatorRef.current = algo.generator([...arr]);
  }, [selectedAlgoId]);

  // Initial load
  useEffect(() => {
    const newArr = generateArray(arraySize, distribution);
    resetArrayState(newArr, selectedAlgoId);
  }, [arraySize, distribution, resetArrayState, selectedAlgoId]);

  const handleSelectAlgorithm = (id: string) => {
    if (status === 'running') return;
    setSelectedAlgoId(id);
    resetArrayState(initialArray, id);
  };

  const handleGenerateNew = () => {
    if (status === 'running') return;
    const newArr = generateArray(arraySize, distribution);
    resetArrayState(newArr, selectedAlgoId);
  };

  const handleReset = () => {
    resetArrayState(initialArray, selectedAlgoId);
  };

  // Perform single step of algorithm
  const executeStep = useCallback((): boolean => {
    if (!generatorRef.current) {
      generatorRef.current = selectedAlgorithm.generator([...currentArray]);
    }

    const next = generatorRef.current.next();

    if (next.done) {
      // Completed sorting
      const allSorted = new Set<number>();
      for (let i = 0; i < currentArray.length; i++) allSorted.add(i);
      setSortedIndices(allSorted);
      setActiveIndices([]);
      setActiveType(null);
      setActiveCodeLine(undefined);
      setStepDescription(`Sorting Complete! Array verified sorted in ${stats.comparisons} comparisons and ${stats.swaps} swaps.`);
      setStatus('completed');

      soundController.playCompletionChime();

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      return false; // Done
    }

    const step = next.value as AnimationStep;
    setActiveIndices(step.indices);
    setActiveType(step.type);
    setActiveCodeLine(step.highlightLine);
    setStepDescription(step.description);

    // Apply value mutations (swaps or overwrites)
    if (step.values) {
      setCurrentArray((prev) => {
        const nextArr = [...prev];
        Object.entries(step.values!).forEach(([idxStr, val]) => {
          nextArr[Number(idxStr)] = val as number;
        });
        return nextArr;
      });
    }

    // Update stats & audio
    setStats((prev) => {
      let comps = prev.comparisons;
      let swaps = prev.swaps;
      let accesses = prev.arrayAccesses + (step.indices.length || 1);

      if (step.type === 'compare') {
        comps++;
        if (step.indices[0] !== undefined) {
          soundController.playTone(currentArray[step.indices[0]] || 50);
        }
      } else if (step.type === 'swap' || step.type === 'overwrite') {
        swaps++;
        accesses += 2;
        if (step.indices[0] !== undefined) {
          soundController.playTone(currentArray[step.indices[0]] || 50);
        }
      } else if (step.type === 'sorted') {
        setSortedIndices((prevSet) => {
          const nextSet = new Set(prevSet);
          step.indices.forEach((idx) => nextSet.add(idx));
          return nextSet;
        });
      }

      const now = performance.now();
      const currentElapsed = startTimeRef.current
        ? elapsedOffsetRef.current + (now - startTimeRef.current)
        : elapsedOffsetRef.current;

      return {
        comparisons: comps,
        swaps,
        arrayAccesses: accesses,
        timeElapsedMs: currentElapsed,
      };
    });

    return true; // Still has more steps
  }, [currentArray, selectedAlgorithm, stats]);

  // Play loop
  useEffect(() => {
    if (status !== 'running') {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
      return;
    }

    const delayMs = Math.max(2, Math.round(300 * Math.pow(1 - speed / 100, 1.8)));

    const loop = () => {
      const hasMore = executeStep();
      if (hasMore && status === 'running') {
        animationTimerRef.current = setTimeout(loop, delayMs);
      }
    };

    animationTimerRef.current = setTimeout(loop, delayMs);

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [status, speed, executeStep]);

  const handleStart = () => {
    if (status === 'completed') {
      resetArrayState(initialArray, selectedAlgoId);
    }
    startTimeRef.current = performance.now();
    setStatus('running');
  };

  const handlePause = () => {
    if (startTimeRef.current) {
      elapsedOffsetRef.current += performance.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    setStatus('paused');
  };

  const handleStep = () => {
    if (status === 'running') return;
    if (status === 'completed') {
      resetArrayState(initialArray, selectedAlgoId);
      return;
    }
    setStatus('paused');
    executeStep();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <Controls
        selectedAlgorithmId={selectedAlgoId}
        onSelectAlgorithm={handleSelectAlgorithm}
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onStep={handleStep}
        onReset={handleReset}
        onGenerateNew={handleGenerateNew}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        distribution={distribution}
        setDistribution={setDistribution}
      />

      {/* Main Visualizer Canvas & Live Trace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Array Canvas + Stats */}
        <div className="lg:col-span-8 space-y-4">
          <ArrayCanvas
            array={currentArray}
            activeIndices={activeIndices}
            activeType={activeType}
            sortedIndices={sortedIndices}
            maxValue={100}
            heightClass="h-[380px] sm:h-[440px]"
            showLabels={true}
          />

          <StatsCard
            stats={stats}
            status={status}
            stepDescription={stepDescription}
            algorithmName={selectedAlgorithm.name}
          />
        </div>

        {/* Right 4 Cols: Code Highlight Trace */}
        <div className="lg:col-span-4 h-full">
          <CodeHighlight
            algorithm={selectedAlgorithm}
            activeLine={activeCodeLine}
          />
        </div>
      </div>

      {/* Deep-dive Algorithm Information */}
      <AlgorithmDetails algorithm={selectedAlgorithm} />
    </div>
  );
};
