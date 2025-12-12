"use client"

import { useRouter } from 'next/navigation'
import { MandelbrotSketch } from './MandelbrotSketch'

export default function MandelbrotPage() {
  const router = useRouter()

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-black dark:text-white">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">p5.js</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Fractals</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Interactive zoom</span>
        </div>
        <h1 className="text-3xl font-semibold">Mandelbrot Visualization</h1>
        <p className="max-w-3xl text-base text-black/70 dark:text-white/70">
          Click to dive deeper into the Mandelbrot set, undo your steps with Z, and toggle a lightweight HUD
          that reports center coordinates, zoom level, and iteration depth.
        </p>
      </div>

      <div className="overflow-hidden rounded-none border border-black/10 bg-white dark:border-white/10 dark:bg-white/5">
        <MandelbrotSketch />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="inline-flex items-center justify-center rounded-none border border-black/10 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10 dark:focus-visible:outline-white"
        >
          Back to portfolio
        </button>
        <a
          href={MANDELBROT_CODE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-none border border-black/10 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10 dark:focus-visible:outline-white"
        >
          View code
        </a>
      </div>

      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Description</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Renders the Mandelbrot set with 1,000 iterations per pixel using an HSB palette for smooth gradients.</li>
          <li>Aspect ratio stays locked to the viewport so zooms retain proportional scaling as you resize.</li>
          <li>Maintains a zoom stack so you can step backward through exploration paths without losing context.</li>
        </ul>
      </div>

      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Controls</h2>
        <div className="space-y-2 text-sm text-black/70 dark:text-white/70">
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Click</span> zooms into the set around the cursor.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Z</span> steps back to the previous zoom level.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Space</span> toggles the HUD overlay.
          </p>
        </div>
      </div>
    </main>
  )
}

const MANDELBROT_CODE_URL = 'https://editor.p5js.org/DanielLitvak/sketches/ZGehg9hRY'
