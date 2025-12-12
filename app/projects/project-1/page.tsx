"use client"

import { useRouter } from 'next/navigation'
import { FlockingSketch } from './FlockingSketch'

export default function FlockingBirdsPage() {
  const router = useRouter()

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-black dark:text-white">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">p5.js</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Interactive simulation</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Spatial indexing</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Boids</span>
        </div>
        <h1 className="text-3xl font-semibold">Flocking Birds</h1>
        <p className="max-w-3xl text-base text-black/70 dark:text-white/70">
          This is a combination of my two favourite projects, flocking boids and the quadtree.
          Interact with the canvas, and explore how the spatial indexing of a quadtree data can be used to speed up such simulations.
        </p>
      </div>

      <div className="overflow-hidden rounded-none border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <FlockingSketch />
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
          href={FLOCKING_CODE_URL}
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
          <li>Each boid samples neighbours within a {BOID_VISION}px radius and applies cohesion, alignment, and separation forces.</li>
          <li>A quadtree accelerates spatial queries so the flock stays performant even with {BOID_COUNT} agents.</li>
          <li>Edge repulsion keeps the flock near the center while mouse input temporarily attracts nearby boids.</li>
        </ul>
      </div>
      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Controls</h2>
        <div className="space-y-2 text-sm text-black/70 dark:text-white/70">
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Space</span> toggles the quadtree debug overlay.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">F</span> toggles an FPS graph to track performance.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Click + Hold</span> Mess with the birds.
          </p>
        </div>
      </div>
    </main>
  )
}

const BOID_VISION = 25
const BOID_COUNT = 500
const FLOCKING_CODE_URL = 'https://editor.p5js.org/DanielLitvak/sketches/iFt_7ZoNQ'
