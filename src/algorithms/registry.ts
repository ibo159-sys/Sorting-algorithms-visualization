import { AlgorithmInfo } from './types';
import { bubbleSortInfo } from './bubbleSort';
import { selectionSortInfo } from './selectionSort';
import { insertionSortInfo } from './insertionSort';
import { mergeSortInfo } from './mergeSort';
import { quickSortInfo } from './quickSort';
import { heapSortInfo } from './heapSort';

export const ALGORITHMS: AlgorithmInfo[] = [
  bubbleSortInfo,
  selectionSortInfo,
  insertionSortInfo,
  mergeSortInfo,
  quickSortInfo,
  heapSortInfo,
];

export const ALGORITHM_MAP: Record<string, AlgorithmInfo> = ALGORITHMS.reduce((acc, algo) => {
  acc[algo.id] = algo;
  return acc;
}, {} as Record<string, AlgorithmInfo>);

export function getAlgorithmById(id: string): AlgorithmInfo {
  return ALGORITHM_MAP[id] || ALGORITHMS[0];
}
