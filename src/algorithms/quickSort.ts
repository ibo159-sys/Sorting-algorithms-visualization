import { AnimationStep, AlgorithmInfo } from './types';

export function* quickSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  function* partition(low: number, high: number): Generator<AnimationStep, number, unknown> {
    const pivot = a[high];
    yield {
      type: 'pivot',
      indices: [high],
      description: `Selected pivot element ${pivot} at index ${high}`,
      highlightLine: 4,
    };

    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield {
        type: 'compare',
        indices: [j, high],
        description: `Comparing element ${a[j]} with pivot ${pivot}`,
        highlightLine: 6,
      };

      if (a[j] < pivot) {
        i++;
        if (i !== j) {
          yield {
            type: 'swap',
            indices: [i, j],
            values: { [i]: a[j], [j]: a[i] },
            description: `Swapping smaller element ${a[j]} with ${a[i]} at partition index ${i}`,
            highlightLine: 8,
          };
          const temp = a[i];
          a[i] = a[j];
          a[j] = temp;
        }
      }
    }

    if (i + 1 !== high) {
      yield {
        type: 'swap',
        indices: [i + 1, high],
        values: { [i + 1]: a[high], [high]: a[i + 1] },
        description: `Placing pivot ${pivot} into its correct partition index ${i + 1}`,
        highlightLine: 10,
      };
      const temp = a[i + 1];
      a[i + 1] = a[high];
      a[high] = temp;
    }

    yield {
      type: 'sorted',
      indices: [i + 1],
      description: `Pivot element ${a[i + 1]} is now at its final sorted position`,
      highlightLine: 11,
    };

    return i + 1;
  }

  function* quickSortHelper(low: number, high: number): Generator<AnimationStep, void, unknown> {
    if (low < high) {
      const pi: number = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    } else if (low === high) {
      yield {
        type: 'sorted',
        indices: [low],
        description: `Single element at index ${low} (${a[low]}) is sorted`,
        highlightLine: 12,
      };
    }
  }

  yield* quickSortHelper(0, n - 1);

  // Final check to mark any remaining indices
  for (let k = 0; k < n; k++) {
    yield {
      type: 'sorted',
      indices: [k],
      description: `Array element ${k} verified sorted`,
      highlightLine: 13,
    };
  }
}

export const quickSortInfo: AlgorithmInfo = {
  id: 'quick-sort',
  name: 'Quick Sort',
  shortName: 'Quick',
  badge: 'Partition Exchange',
  color: 'from-pink-500 to-rose-600',
  bestTime: 'O(n log n)',
  avgTime: 'O(n log n)',
  worstTime: 'O(n²)',
  spaceComplexity: 'O(log n)',
  stable: false,
  inPlace: true,
  description: 'An efficient divide-and-conquer sorting algorithm that works by selecting a "pivot" element and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
  howItWorks: [
    'Choose a pivot element from the array (e.g., the last element).',
    'Partitioning: reorder the array so that all elements smaller than the pivot come before it, and all greater elements come after it.',
    'Recursively apply the above steps to the sub-array of smaller elements and the sub-array of larger elements.',
    'Base case: arrays of size zero or one are already sorted.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure quickSort(A, low, high)' },
    { line: 2, text: '  if low < high then' },
    { line: 3, text: '    pi := partition(A, low, high)' },
    { line: 4, text: '    quickSort(A, low, pi - 1)' },
    { line: 5, text: '    quickSort(A, pi + 1, high)' },
    { line: 6, text: 'procedure partition(A, low, high)' },
    { line: 7, text: '  pivot := A[high]; i := low - 1' },
    { line: 8, text: '  for j := low to high-1 do' },
    { line: 9, text: '    if A[j] < pivot then i++; swap(A[i], A[j])' },
    { line: 10, text: '  swap(A[i+1], A[high]); return i + 1' },
  ],
  pros: [
    'Extremely fast in practice with low constant factors and excellent cache locality.',
    'In-place partitioning requires only O(log n) stack memory.',
    'Default choice for standard library primitives (e.g. C qsort, C++ std::sort).'
  ],
  cons: [
    'Worst-case time complexity degrades to O(n²) with poor pivot choices (e.g., already-sorted arrays with naive pivot).',
    'Unstable sorting algorithm.'
  ],
  realWorldUse: 'Core engine in system level programming, embedded devices, and numeric computing libraries.',
  generator: quickSort,
};
