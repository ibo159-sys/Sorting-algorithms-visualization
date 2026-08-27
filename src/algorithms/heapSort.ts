import { AnimationStep, AlgorithmInfo } from './types';

export function* heapSort(arr: number[]): Generator<AnimationStep, void, unknown> {
  const a = [...arr];
  const n = a.length;

  function* heapify(size: number, rootIdx: number): Generator<AnimationStep, void, unknown> {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    yield {
      type: 'boundary',
      indices: [rootIdx],
      description: `Examining heap node at index ${rootIdx} (${a[rootIdx]}) with children`,
      highlightLine: 6,
    };

    if (left < size) {
      yield {
        type: 'compare',
        indices: [left, largest],
        description: `Comparing left child ${a[left]} with current largest ${a[largest]}`,
        highlightLine: 7,
      };
      if (a[left] > a[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      yield {
        type: 'compare',
        indices: [right, largest],
        description: `Comparing right child ${a[right]} with current largest ${a[largest]}`,
        highlightLine: 9,
      };
      if (a[right] > a[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIdx) {
      yield {
        type: 'swap',
        indices: [rootIdx, largest],
        values: { [rootIdx]: a[largest], [largest]: a[rootIdx] },
        description: `Swapping root ${a[rootIdx]} with largest child ${a[largest]}`,
        highlightLine: 11,
      };
      const temp = a[rootIdx];
      a[rootIdx] = a[largest];
      a[largest] = temp;

      yield* heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    yield {
      type: 'swap',
      indices: [0, i],
      values: { [0]: a[i], [i]: a[0] },
      description: `Extracting max element ${a[0]} to position ${i}`,
      highlightLine: 14,
    };
    const temp = a[0];
    a[0] = a[i];
    a[i] = temp;

    yield {
      type: 'sorted',
      indices: [i],
      description: `Element at index ${i} (${a[i]}) is in final sorted position`,
      highlightLine: 15,
    };

    yield* heapify(i, 0);
  }

  yield {
    type: 'sorted',
    indices: [0],
    description: `Root element (${a[0]}) is sorted`,
    highlightLine: 16,
  };
}

export const heapSortInfo: AlgorithmInfo = {
  id: 'heap-sort',
  name: 'Heap Sort',
  shortName: 'Heap',
  badge: 'Heap Tree Selection',
  color: 'from-cyan-500 to-blue-600',
  bestTime: 'O(n log n)',
  avgTime: 'O(n log n)',
  worstTime: 'O(n log n)',
  spaceComplexity: 'O(1)',
  stable: false,
  inPlace: true,
  description: 'A comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.',
  howItWorks: [
    'Build a Max Heap from the input array.',
    'At this point, the largest item is stored at the root of the heap.',
    'Replace it with the last item of the heap followed by reducing the size of heap by 1.',
    'Heapify the root of the tree to maintain max-heap property.',
    'Repeat steps while size of heap is greater than 1.'
  ],
  pseudoCode: [
    { line: 1, text: 'procedure heapSort(A)' },
    { line: 2, text: '  n := length(A)' },
    { line: 3, text: '  for i := n/2 - 1 down to 0 do heapify(A, n, i)' },
    { line: 4, text: '  for i := n - 1 down to 1 do' },
    { line: 5, text: '    swap(A[0], A[i]); heapify(A, i, 0)' },
    { line: 6, text: 'procedure heapify(A, n, i)' },
    { line: 7, text: '  largest := i; left := 2*i + 1; right := 2*i + 2' },
    { line: 8, text: '  if left < n and A[left] > A[largest] then largest := left' },
    { line: 9, text: '  if right < n and A[right] > A[largest] then largest := right' },
    { line: 10, text: '  if largest != i then swap(A[i], A[largest]); heapify(A, n, largest)' },
  ],
  pros: [
    'Guaranteed O(n log n) worst-case time complexity.',
    'In-place sort requiring strictly O(1) auxiliary memory.',
    'No risk of quadratic worst-case degradation unlike QuickSort.'
  ],
  cons: [
    'Poor cache locality due to heap array index jumping (2*i + 1).',
    'Unstable sorting algorithm.',
    'Typically slower than QuickSort in practice on modern CPU architectures.'
  ],
  realWorldUse: 'Used in real-time safety critical systems where strict guaranteed O(n log n) execution bounds and O(1) memory guarantees are required.',
  generator: heapSort,
};
