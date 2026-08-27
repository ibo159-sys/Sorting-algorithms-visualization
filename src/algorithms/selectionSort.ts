import { AnimationStep, AlgorithmInfo } from './types';

export function* selectionSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield {
      type: 'boundary',
      indices: [i],
      description: `Starting pass ${i + 1}. Assuming minimum element is at index ${i} (${a[i]})`,
      highlightLine: 3,
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        type: 'compare',
        indices: [minIdx, j],
        description: `Comparing current min (${a[minIdx]} at index ${minIdx}) with candidate (${a[j]} at index ${j})`,
        highlightLine: 5,
      };

      if (a[j] < a[minIdx]) {
        minIdx = j;
        yield {
          type: 'pivot',
          indices: [minIdx],
          description: `Found new minimum: ${a[minIdx]} at index ${minIdx}`,
          highlightLine: 6,
        };
      }
    }

    if (minIdx !== i) {
      yield {
        type: 'swap',
        indices: [i, minIdx],
        values: { [i]: a[minIdx], [minIdx]: a[i] },
        description: `Swapping minimum element ${a[minIdx]} into position ${i}`,
        highlightLine: 8,
      };
      const temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;
    }

    yield {
      type: 'sorted',
      indices: [i],
      description: `Position ${i} is now sorted with value ${a[i]}`,
      highlightLine: 9,
    };
  }

  yield {
    type: 'sorted',
    indices: [n - 1],
    description: `Final element at index ${n - 1} (${a[n - 1]}) is sorted`,
    highlightLine: 10,
  };
}

export const selectionSortInfo: AlgorithmInfo = {
  id: 'selection-sort',
  name: 'Selection Sort',
  shortName: 'Selection',
  badge: 'In-Place Selection',
  color: 'from-blue-500 to-indigo-600',
  bestTime: 'O(n²)',
  avgTime: 'O(n²)',
  worstTime: 'O(n²)',
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  description: 'Divides the input list into two parts: a sorted sublist of items built up from left to right and a sublist of the remaining unsorted items. It repeatedly selects the smallest unsorted element and swaps it to the front.',
  howItWorks: [
    'Find the minimum element in the unsorted portion of the array.',
    'Swap it with the leftmost unsorted element.',
    'Advance the boundary between sorted and unsorted elements by one.',
    'Repeat until the entire array is sorted.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure selectionSort(A : list of sortable items)' },
    { line: 2, text: '  n := length(A)' },
    { line: 3, text: '  for i := 0 to n-2 do' },
    { line: 4, text: '    minIdx := i' },
    { line: 5, text: '    for j := i+1 to n-1 do' },
    { line: 6, text: '      if A[j] < A[minIdx] then minIdx := j' },
    { line: 7, text: '    if minIdx != i then' },
    { line: 8, text: '      swap(A[i], A[minIdx])' },
    { line: 9, text: '    mark A[i] as sorted' },
  ],
  pros: [
    'Simple in-place algorithm requiring O(1) extra memory.',
    'Makes at most O(n) swaps, making it useful when memory write operations are expensive.',
    'Consistent predictable performance across all inputs.'
  ],
  cons: [
    'Always executes O(n²) comparisons even if the array is already sorted.',
    'Unstable in standard array implementations.'
  ],
  realWorldUse: 'Systems where flash memory writes have high wear cycles or write costs, because it minimizes total memory writes to at most n-1 swaps.',
  generator: selectionSort,
};
