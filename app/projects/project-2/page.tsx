"use client"

import Link from 'next/link'
import { GravitySketch, PREDICTION_LENGTH } from './GravitySketch'

export default function GravitySimulationPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-black dark:text-white">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
          <Link href="/" className="rounded-none border border-black/10 px-3 py-1 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
            / Back to portfolio
          </Link>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">p5.js</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Physics sim</span>
          <span className="rounded-none border border-black/10 px-3 py-1 dark:border-white/10">Orbit prediction</span>
        </div>
        <h1 className="text-3xl font-semibold">2D Gravity Simulation</h1>
        <p className="max-w-3xl text-base text-black/70 dark:text-white/70">
          Interactive Newtonian sandbox that lets you spawn bodies, pan the origin, and watch how gravity shapes their orbits.
          Field vectors, velocity indicators, and long-range predictions make the dynamics easy to read at a glance.
        </p>
      </div>

      <div className="overflow-hidden rounded-none border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <GravitySketch />
      </div>

      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Description</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
          <li>Implements Newton's law of gravitation across movable bodies while handling reaction forces on anchored masses.</li>
          <li>
            Predicts the next {PREDICTION_LENGTH} simulation ticks and renders blue trajectory trails so you can spot stable orbits versus escapes.
          </li>
          <li>Draws a low-detail gravitational vector field to reveal how nearby accelerations bend space around heavy bodies.</li>
        </ul>
      </div>

      <div className="space-y-3 rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Controls</h2>
        <div className="space-y-2 text-sm text-black/70 dark:text-white/70">
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Click</span> to insert a new gravity object.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">Drag</span> to pan the origin and explore the field.
          </p>
          <p>
            <span className="rounded-none bg-black/10 px-2 py-1 font-semibold uppercase dark:bg-white/10">R</span> randomizes current object positions and velocities.
          </p>
        </div>
      </div>
    </main>
  )
}
