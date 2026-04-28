"use client"

import { useRouter } from 'next/navigation'
import { GameOfLifeSketch } from './GameOfLifeSketch'

export default function GameOfLifePage() {
  const router = useRouter()

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-black dark:text-white">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">p5.js</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Cellular automata</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Interactive grid</span>
        </div>
        <h1 className="text-3xl font-semibold">Conway&apos;s Game of Life</h1>
        <p className="max-w-3xl text-base text-black/70 dark:text-white/70">
          A faithful port of my legacy Game of Life demo: a 40x40 toroidal grid you can edit cell-by-cell, pause, and
          accelerate or slow down on the fly. Toggle the statistics overlay to watch live population trends as patterns
          collide and settle.
        </p>
      </div>

      <div className="overflow-hidden rounded-none border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <GameOfLifeSketch />
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
          href={GAME_OF_LIFE_CODE_URL}
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
          <li>Runs Conway&apos;s classic rules on a 40x40 wrapping grid so gliders loop endlessly across edges.</li>
          <li>
            Statistics mode (key S) tracks population history with a filled graph, matching the original portfolio build.
          </li>
          <li>Mouse interactions mirror the legacy version: click or drag to flip cells without breaking the loop.</li>
        </ul>
      </div>

      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Controls</h2>
        <div className="space-y-2 text-sm text-black/70 dark:text-white/70">
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Click</span>{' '}
            add/remove a cell. Drag to paint.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Space</span>{' '}
            pause/resume the automaton.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">R</span>{' '}
            randomizes the grid.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">S</span>{' '}
            toggles the population statistics overlay.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Scroll</span>{' '}
            adjusts the step speed (lower values run faster, higher values slow down).
          </p>
        </div>
      </div>
    </main>
  )
}

const GAME_OF_LIFE_CODE_URL = 'https://editor.p5js.org/DanielLitvak/sketches/kha5GXUWU'
