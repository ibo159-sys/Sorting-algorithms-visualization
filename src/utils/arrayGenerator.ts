import { ArrayDistribution } from '../algorithms/types';

export function generateArray(size: number, distribution: ArrayDistribution = 'random'): number[] {
  const min = 5;
  const max = 100;
  const result: number[] = [];

  switch (distribution) {
    case 'nearly-sorted': {
      // Step values linearly from min to max
      for (let i = 0; i < size; i++) {
        result.push(Math.round(min + (i / (size - 1 || 1)) * (max - min)));
      }
      // Swap ~8% of random pairs
      const swaps = Math.max(1, Math.floor(size * 0.08));
      for (let s = 0; s < swaps; s++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.min(size - 1, Math.max(0, idx1 + (Math.random() > 0.5 ? 2 : -2)));
        const temp = result[idx1];
        result[idx1] = result[idx2];
        result[idx2] = temp;
      }
      break;
    }

    case 'reversed': {
      // Strictly descending order
      for (let i = 0; i < size; i++) {
        result.push(Math.round(max - (i / (size - 1 || 1)) * (max - min)));
      }
      break;
    }

    case 'few-unique': {
      // Only 4 distinct values repeated throughout
      const uniqueValues = [15, 38, 65, 92];
      for (let i = 0; i < size; i++) {
        const val = uniqueValues[Math.floor(Math.random() * uniqueValues.length)];
        result.push(val);
      }
      break;
    }

    case 'sine-wave': {
      // Sine wave pattern
      for (let i = 0; i < size; i++) {
        const normalized = (Math.sin((i / size) * Math.PI * 2) + 1) / 2; // 0 to 1
        result.push(Math.round(min + normalized * (max - min)));
      }
      break;
    }

    case 'random':
    default: {
      // Uniform random integers
      for (let i = 0; i < size; i++) {
        result.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      break;
    }
  }

  return result;
}
