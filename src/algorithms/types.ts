export type StepType = 
  | 'compare'     // Elements being compared (yellow/cyan)
  | 'swap'        // Elements being swapped (red/rose)
  | 'overwrite'   // Element at index overwritten with new value (purple)
  | 'pivot'       // Pivot element selected in quick sort (amber/orange)
  | 'boundary'    // Left/right bounds or subarray partition (blue)
  | 'sorted'      // Element confirmed in its final sorted position (emerald/green)
  | 'final-sweep';// Final sweep highlighting all elements as sorted

export interface AnimationStep {
  type: StepType;
  indices: number[];
  values?: { [index: number]: number };
  description: string;
  highlightLine?: number;
}

export type ArrayDistribution = 'random' | 'nearly-sorted' | 'reversed' | 'few-unique' | 'sine-wave';

export interface AlgorithmStats {
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  timeElapsedMs: number;
}

export interface AlgorithmInfo {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  color: string;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  description: string;
  howItWorks: string[];
  pseudoCode: { line: number; text: string }[];
  pros: string[];
  cons: string[];
  realWorldUse: string;
  generator: (arr: number[]) => Generator<AnimationStep, void, unknown>;
}
