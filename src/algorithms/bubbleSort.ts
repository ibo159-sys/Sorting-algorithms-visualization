import { AnimationStep, AlgorithmInfo } from './types';

export function* bubbleSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing elements at index ${j} (${a[j]}) and ${j + 1} (${a[j + 1]})`,
        highlightLine: 4,
      };

      if (a[j] > a[j + 1]) {
        yield {
          type: 'swap',
          indices: [j, j + 1],
          values: { [j]: a[j + 1], [j + 1]: a[j] },
          description: `Swapping ${a[j]} and ${a[j + 1]} since ${a[j]} > ${a[j + 1]}`,
          highlightLine: 5,
        };
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        swapped = true;
      }
    }

    yield {
      type: 'sorted',
      indices: [n - 1 - i],
      description: `Element at index ${n - 1 - i} (${a[n - 1 - i]}) is in its final sorted position`,
      highlightLine: 7,
    };

    if (!swapped) {
      // Early exit optimization
      for (let k = 0; k < n - 1 - i; k++) {
        yield {
          type: 'sorted',
          indices: [k],
          description: `Array is fully sorted early at index ${k}`,
          highlightLine: 8,
        };
      }
      break;
    }
  }

  yield {
    type: 'sorted',
    indices: [0],
    description: `First element (${a[0]}) is naturally sorted`,
    highlightLine: 9,
  };
}

export const bubbleSortInfo: AlgorithmInfo = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  shortName: 'Bubble',
  badge: 'Simple Exchanging',
  color: 'from-amber-500 to-orange-600',
  bestTime: 'O(n)',
  avgTime: 'O(n²)',
  worstTime: 'O(n²)',
  spaceComplexity: 'O(1)',
  stable: true,
  inPlace: true,
  description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  howItWorks: [
    'Iterate through the array from left to right.',
    'Compare each pair of adjacent items.',
    'If the left element is greater than the right, swap them.',
    'After each pass, the largest unsorted element bubbles up to its final position.',
    'Optimize with an early-exit flag if no swaps occurred in a pass.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure bubbleSort(A : list of sortable items)' },
    { line: 2, text: '  n := length(A)' },
    { line: 3, text: '  repeat' },
    { line: 4, text: '    swapped := false' },
    { line: 5, text: '    for i := 1 to n-1 inclusive do' },
    { line: 6, text: '      if A[i-1] > A[i] then' },
    { line: 7, text: '        swap(A[i-1], A[i]); swapped := true' },
    { line: 8, text: '    n := n - 1' },
    { line: 9, text: '  until not swapped' },
  ],
  pros: [
    'Extremely simple to understand and implement.',
    'In-place sorting with O(1) auxiliary space.',
    'Stable: preserves the relative order of equal elements.',
    'Linear O(n) best-case performance on already-sorted arrays.'
  ],
  cons: [
    'Quadratic O(n²) average and worst-case time complexity.',
    'Poor performance on large datasets compared to O(n log n) algorithms.'
  ],
  realWorldUse: 'Mainly used for educational purposes and detecting if an array is already sorted with minimal overhead.',
  generator: bubbleSort,
};
