import { AnimationStep, AlgorithmInfo } from './types';

export function* insertionSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  yield {
    type: 'sorted',
    indices: [0],
    description: `First element (${a[0]}) is trivially sorted by itself`,
    highlightLine: 2,
  };

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    yield {
      type: 'pivot',
      indices: [i],
      description: `Picking key element ${key} at index ${i} to insert into sorted prefix`,
      highlightLine: 4,
    };

    while (j >= 0) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing key (${key}) with sorted element ${a[j]} at index ${j}`,
        highlightLine: 6,
      };

      if (a[j] > key) {
        yield {
          type: 'overwrite',
          indices: [j + 1],
          values: { [j + 1]: a[j] },
          description: `Shifting element ${a[j]} right to index ${j + 1}`,
          highlightLine: 7,
        };
        a[j + 1] = a[j];
        j = j - 1;
      } else {
        break;
      }
    }

    a[j + 1] = key;
    yield {
      type: 'overwrite',
      indices: [j + 1],
      values: { [j + 1]: key },
      description: `Inserted key (${key}) into target position ${j + 1}`,
      highlightLine: 9,
    };

    for (let k = 0; k <= i; k++) {
      yield {
        type: 'sorted',
        indices: [k],
        description: `Prefix [0..${i}] is now sorted`,
        highlightLine: 10,
      };
    }
  }
}

export const insertionSortInfo: AlgorithmInfo = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  shortName: 'Insertion',
  badge: 'Adaptive Insertion',
  color: 'from-emerald-500 to-teal-600',
  bestTime: 'O(n)',
  avgTime: 'O(n²)',
  worstTime: 'O(n²)',
  spaceComplexity: 'O(1)',
  stable: true,
  inPlace: true,
  description: 'Iteratively builds a sorted array one element at a time by taking each element from the unsorted part and inserting it into its correct relative position within the sorted part.',
  howItWorks: [
    'Assume the first element is already sorted.',
    'Pick the next unsorted element (the key).',
    'Compare the key with elements in the sorted portion from right to left.',
    'Shift all larger elements one position to the right.',
    'Insert the key into the newly vacant spot.',
    'Repeat for all remaining unsorted elements.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure insertionSort(A : list of sortable items)' },
    { line: 2, text: '  for i := 1 to length(A)-1 do' },
    { line: 3, text: '    key := A[i]' },
    { line: 4, text: '    j := i - 1' },
    { line: 5, text: '    while j >= 0 and A[j] > key do' },
    { line: 6, text: '      A[j + 1] := A[j]' },
    { line: 7, text: '      j := j - 1' },
    { line: 8, text: '    A[j + 1] := key' },
  ],
  pros: [
    'Highly adaptive: Runs in near O(n) linear time on almost-sorted data.',
    'Stable and in-place with O(1) auxiliary space.',
    'Very low overhead, making it faster than QuickSort/MergeSort on small collections (n < 20-30).'
  ],
  cons: [
    'O(n²) average and worst-case performance on random or reversed arrays.',
    'High number of element shifts on large datasets.'
  ],
  realWorldUse: 'Used as the base-case fallback in hybrid sorting algorithms like Timsort (Python/Java) and Introsort (C++ std::sort) for small partitions.',
  generator: insertionSort,
};
