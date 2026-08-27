# SortPulse — Sorting Algorithms Visualizer & Benchmarking Arena

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Live Application**: [https://ibo159-sys.github.io/Sorting-algorithms-visualization/](https://ibo159-sys.github.io/Sorting-algorithms-visualization/)  
> **GitHub Repository**: [https://github.com/ibo159-sys/Sorting-algorithms-visualization](https://github.com/ibo159-sys/Sorting-algorithms-visualization)

---

## 📌 Project Overview & Evolution

**SortPulse** is a high-performance, interactive data structures and algorithms visualizer engineered to make fundamental sorting algorithms intuitive, audible, and comparable in real-time.

### ⏳ Project Genesis: The v1 to v2 Architecture Evolution

```
┌────────────────────────────────────────────────────────┐
│  v1.0 (Legacy Vanilla JS Prototype - 1 Year Ago)       │
│  • Pure HTML5 canvas / DOM manipulation                │
│  • Basic CSS3 stylesheets                              │
│  • Vanilla JavaScript (ES6) with setTimeout callbacks   │
└──────────────────────────┬─────────────────────────────┘
                           │
             Complete Re-engineering
                           ▼
┌────────────────────────────────────────────────────────┐
│  v2.0 (Modern Next.js Architecture)                    │
│  • Next.js 14 App Router & React 18 Components         │
│  • Strict TypeScript with Immutable State Machines     │
│  • ES6 Generator Functions for Step-by-Step Traversal  │
│  • Multi-Algorithm Concurrent Race & Benchmark Arena   │
│  • Real-Time Web Audio API Pitch Synthesizer           │
│  • Tailwind CSS Glassmorphism Dark UI                  │
└────────────────────────────────────────────────────────┘
```

The project was originally developed **one year ago** as a client-side prototype using **Vanilla HTML5, CSS3, and JavaScript**. While functional, the original implementation relied on global state and `setTimeout` loops, which made pausing, single-stepping, and synchronized multi-algorithm benchmarking difficult to coordinate.

To elevate code quality, modularity, and responsiveness, the application was completely re-architected and upgraded into **Next.js 14 with TypeScript and React 18**. The core algorithmic engine was refactored into **ES6 Generator Pipelines (`function*`)**, enabling deterministic animation stepping, instantaneous pause/resume, auditory feedback via the **Web Audio API**, and synchronized side-by-side race comparisons.

---

## ✨ Key Features

- **🎮 Single-Algorithm Deep Dive Visualizer**:
  - Step-by-step visual animation for individual algorithms with color-coded array states (Unsorted, Comparing, Swapping/Overwriting, Pivot/Key, and Sorted).
  - Variable animation speed slider (from slow step-by-step to Turbo 60fps mode).
  - Adjustable array size ($N = 8$ to $80$ items).
  - Play, Pause, Single-Step Forward, and Instant Reset controls.

- **⚔️ Multi-Algorithm Race Arena (Comparison Mode)**:
  - Benchmark multiple sorting algorithms executing **simultaneously** on the exact same input dataset.
  - Real-time tracking of **Comparisons**, **Swaps / Memory Writes**, and **Execution Time (ms)**.
  - Live finishing leaderboard and podium rankings (🥇 1st, 🥈 2nd, 🥉 3rd).

- **📜 Synchronized Pseudocode Execution Trace**:
  - View real-time line-by-line pseudocode highlighting synchronized with the exact instruction executing on the array canvas.

- **📊 Comprehensive Data Distributions**:
  - Test algorithms across diverse array conditions: **Random**, **Nearly Sorted** (best-case validation), **Reversed** (worst-case stress test), **Few Unique** (duplicate handling), and **Sine Wave**.

- **🔊 Web Audio API Frequency Synthesizer**:
  - Dynamically synthesizes musical pitches mapped to element values ($200\text{ Hz} - 950\text{ Hz}$) on every comparison and swap, providing intuitive auditory reinforcement of array entropy and order.

- **📚 Asymptotic Complexity & Theory Matrix**:
  - Detailed reference cards covering Best, Average, and Worst Time Complexities, Auxiliary Space constraints, Stability guarantees, and In-Place attributes.

---

## 🧮 Implemented Algorithms & Comparison

| Algorithm | Best Time | Average Time | Worst Time | Space (Auxiliary) | Stability | In-Place | Classification |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Stable | ✅ Yes | Exchanging |
| **Selection Sort** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ❌ Unstable | ✅ Yes | Selection |
| **Insertion Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Stable | ✅ Yes | Insertion |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | ✅ Stable | ❌ No | Divide & Conquer |
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | ❌ Unstable | ✅ Yes | Partition Exchange |
| **Heap Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ | ❌ Unstable | ✅ Yes | Binary Heap Selection |

---

### Algorithm Deep Dives

#### 1. Bubble Sort
Repeatedly steps through the array, comparing adjacent elements and swapping them if they are in the wrong order. Features an early-exit pass flag that delivers optimal $\mathcal{O}(n)$ linear performance when the array is already sorted.

#### 2. Selection Sort
Divides the array into sorted and unsorted regions. In each iteration, it searches the unsorted portion for the minimum element and swaps it to the end of the sorted prefix. Performs at most $n - 1$ swaps, minimizing memory write cycles.

#### 3. Insertion Sort
Iteratively builds a sorted prefix by taking each unsorted element (the key) and inserting it into its correct relative position among the sorted elements. Highly adaptive and widely used in hybrid algorithms (e.g., Timsort, Introsort) for small sub-partitions ($n \le 32$).

#### 4. Merge Sort
A divide-and-conquer algorithm that recursively divides the array into halves until single-element subarrays remain, then merges them back together in sorted order. Guarantees deterministic $\mathcal{O}(n \log n)$ time complexity in all cases and preserves relative element order (stable).

#### 5. Quick Sort
Selects a pivot element and partitions the array such that all elements smaller than the pivot precede it and all greater elements succeed it, then recursively sorts the subarrays. Offers industry-standard real-world speed and optimal cache locality.

#### 6. Heap Sort
Converts the array into a Max-Heap binary tree structure, extracts the maximum element to the end of the array, and repeatedly performs `heapify` operations. Provides guaranteed $\mathcal{O}(n \log n)$ performance with strict $\mathcal{O}(1)$ auxiliary space.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Native Browser [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Particles**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Bundler / Deployment**: Static HTML Export (`next export`), compatible with GitHub Pages and Vercel.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended, tested with Node 20 / 24)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ibo159-sys/Sorting-algorithms-visualization.git
   cd Sorting-algorithms-visualization
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to interact with the visualizer.

---

## 📦 Build & Production Export

To create an optimized production build or export static HTML for GitHub Pages:

```bash
# Type check and build production bundle
npm run build

# Start local production server
npm run start
```

Static build artifacts will be generated in the `.next` and `out` directories.

---

## 📂 Project Structure

```
Sorting-algorithms-visualization/
├── src/
│   ├── algorithms/               # Algorithmic step generator engine
│   │   ├── types.ts              # TypeScript interfaces & step schemas
│   │   ├── registry.ts           # Algorithm definitions & lookup
│   │   ├── bubbleSort.ts         # Bubble sort generator
│   │   ├── selectionSort.ts      # Selection sort generator
│   │   ├── insertionSort.ts      # Insertion sort generator
│   │   ├── mergeSort.ts          # Merge sort generator
│   │   ├── quickSort.ts          # Quick sort generator
│   │   └── heapSort.ts           # Heap sort generator
│   ├── components/               # React UI components
│   │   ├── Navbar.tsx            # Navigation header & sound toggle
│   │   ├── VisualizerSingle.tsx  # Single algorithm visualizer engine
│   │   ├── VisualizerArena.tsx   # Multi-algorithm concurrent race arena
│   │   ├── ArrayCanvas.tsx       # Dynamic reactive canvas for array bars
│   │   ├── Controls.tsx          # Playback, speed, size & pattern controls
│   │   ├── StatsCard.tsx         # Live metrics (comps, swaps, time)
│   │   ├── CodeHighlight.tsx     # Synchronized pseudocode trace
│   │   ├── AlgorithmDetails.tsx  # Deep-dive theory, pros/cons, applications
│   │   ├── ComplexityTable.tsx   # Asymptotic complexity matrix
│   │   └── LegacyComparison.tsx  # Architectural v1 to v2 evolution showcase
│   ├── utils/
│   │   ├── arrayGenerator.ts     # Dataset generator (random, reversed, etc.)
│   │   ├── sound.ts              # Web Audio API pitch synthesis
│   │   └── cn.ts                 # ClassName utility
│   └── app/
│       ├── layout.tsx            # Root layout & SEO metadata
│       ├── page.tsx              # Main application page
│       └── globals.css           # Tailwind base styles & theme config
├── public/                       # Static public assets
├── package.json                  # Dependencies & project scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── tailwind.config.ts            # Tailwind CSS design system configuration
└── README.md                     # Project documentation
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
