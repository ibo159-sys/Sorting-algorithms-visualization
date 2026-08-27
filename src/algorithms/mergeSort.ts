import { AnimationStep, AlgorithmInfo } from './types';

export function* mergeSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  function* merge(start: number, mid: number, end: number): Generator<AnimationStep, void, unknown> {
    const leftArr = a.slice(start, mid + 1);
    const rightArr = a.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    yield {
      type: 'boundary',
      indices: [start, end],
      description: `Merging sub-arrays [${start}..${mid}] and [${mid + 1}..${end}]`,
      highlightLine: 6,
    };

    while (i < leftArr.length && j < rightArr.length) {
      const origLeftIdx = start + i;
      const origRightIdx = mid + 1 + j;

      yield {
        type: 'compare',
        indices: [origLeftIdx, origRightIdx],
        description: `Comparing left element ${leftArr[i]} and right element ${rightArr[j]}`,
        highlightLine: 8,
      };

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        yield {
          type: 'overwrite',
          indices: [k],
          values: { [k]: leftArr[i] },
          description: `Placing ${leftArr[i]} from left sub-array into position ${k}`,
          highlightLine: 9,
        };
        i++;
      } else {
        a[k] = rightArr[j];
        yield {
          type: 'overwrite',
          indices: [k],
          values: { [k]: rightArr[j] },
          description: `Placing ${rightArr[j]} from right sub-array into position ${k}`,
          highlightLine: 11,
        };
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];
      yield {
        type: 'overwrite',
        indices: [k],
        values: { [k]: leftArr[i] },
        description: `Flushing remaining left element ${leftArr[i]} into position ${k}`,
        highlightLine: 13,
      };
      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];
      yield {
        type: 'overwrite',
        indices: [k],
        values: { [k]: rightArr[j] },
        description: `Flushing remaining right element ${rightArr[j]} into position ${k}`,
        highlightLine: 15,
      };
      j++;
      k++;
    }

    if (start === 0 && end === n - 1) {
      for (let idx = 0; idx < n; idx++) {
        yield {
          type: 'sorted',
          indices: [idx],
          description: `Element at index ${idx} (${a[idx]}) is fully sorted`,
          highlightLine: 16,
        };
      }
    }
  }

  function* mergeSortHelper(start: number, end: number): Generator<AnimationStep, void, unknown> {
    if (start >= end) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    yield* mergeSortHelper(start, mid);
    yield* mergeSortHelper(mid + 1, end);
    yield* merge(start, mid, end);
  }

  yield* mergeSortHelper(0, n - 1);
}

export const mergeSortInfo: AlgorithmInfo = {
  id: 'merge-sort',
  name: 'Merge Sort',
  shortName: 'Merge',
  badge: 'Divide & Conquer',
  color: 'from-violet-500 to-purple-600',
  bestTime: 'O(n log n)',
  avgTime: 'O(n log n)',
  worstTime: 'O(n log n)',
  spaceComplexity: 'O(n)',
  stable: true,
  inPlace: false,
  description: 'An efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort using a divide-and-conquer strategy.',
  howItWorks: [
    'Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).',
    'Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.',
    'During merge, compare the smallest elements of each sublist and place the smaller one into the combined array.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure mergeSort(A, left, right)' },
    { line: 2, text: '  if left < right then' },
    { line: 3, text: '    mid := floor((left + right) / 2)' },
    { line: 4, text: '    mergeSort(A, left, mid)' },
    { line: 5, text: '    mergeSort(A, mid + 1, right)' },
    { line: 6, text: '    merge(A, left, mid, right)' },
    { line: 7, text: 'procedure merge(A, left, mid, right)' },
    { line: 8, text: '  copy subarrays and merge sorted items back to A' },
  ],
  pros: [
    'Guaranteed O(n log n) time complexity in all cases (best, average, and worst).',
    'Stable sorting: preserves original ordering of equal keys.',
    'Highly parallelizable and well-suited for external sorting and linked lists.'
  ],
  cons: [
    'Requires O(n) auxiliary memory space for temporary buffers during merge.',
    'Higher memory allocation overhead on array structures compared to in-place QuickSort.'
  ],
  realWorldUse: 'Standard sorting algorithm for linked lists, external disk-based merges, and browsers for stable Array.prototype.sort implementations.',
  generator: mergeSort,
};
