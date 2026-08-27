import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SortPulse | Interactive Sorting Algorithms Visualizer & Arena',
  description: 'A high-performance interactive sorting algorithms visualizer, comparison arena, and complexity matrix built with Next.js, React, TypeScript, and Tailwind CSS.',
  keywords: [
    'Sorting Algorithms',
    'Algorithm Visualizer',
    'Bubble Sort',
    'Selection Sort',
    'Insertion Sort',
    'Merge Sort',
    'Quick Sort',
    'Heap Sort',
    'Next.js',
    'TypeScript',
    'React',
    'Data Structures and Algorithms'
  ],
  authors: [{ name: 'ibo159-sys', url: 'https://github.com/ibo159-sys' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
