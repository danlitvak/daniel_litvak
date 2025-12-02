'use client'

import { useEffect, useRef } from 'react'

const GRID_COLS = 40
const GRID_ROWS = 20 // half the rows so cells stay square with a 2:1 canvas
const MAX_HISTORY_LENGTH = 50
const CANVAS_FALLBACK = 400
const ASPECT_RATIO = GRID_ROWS / GRID_COLS

interface P5Constructor {
  new(sketch: (p: P5) => void, node?: HTMLElement): P5
}

type WindowWithP5 = Window & { p5?: P5Constructor }

interface P5 {
  width: number
  height: number
  frameCount: number
  keyCode: number
  mouseX: number
  mouseY: number
  LEFT: number
  RIGHT: number
  CENTER: number
  TOP: number
  BOTTOM: number
  createCanvas: (w: number, h: number) => void
  resizeCanvas: (w: number, h: number) => void
  background: (r: number, g?: number, b?: number, a?: number) => void
  fill: (r: number, g?: number, b?: number, a?: number) => void
  stroke: (r: number, g?: number, b?: number, a?: number) => void
  strokeWeight: (w: number) => void
  rect: (x: number, y: number, w: number, h: number) => void
  text: (str: string, x: number, y: number) => void
  textAlign: (horizontal: number | string, vertical?: number | string) => void
  textSize: (size: number) => void
  translate: (x: number, y: number) => void
  push: () => void
  pop: () => void
  noStroke: () => void
  noFill: () => void
  random: (max?: number) => number
  frameRate: (fps?: number) => number
  map: (n: number, start1: number, stop1: number, start2: number, stop2: number) => number
  line: (x1: number, y1: number, x2: number, y2: number) => void
  beginShape: () => void
  vertex: (x: number, y: number) => void
  endShape: () => void
  setup: () => void
  draw: () => void
  mousePressed: () => void
  mouseDragged: () => void
  mouseWheel: (event: { delta: number }) => boolean | void
  keyPressed: () => void
  windowResized: () => void
  remove?: () => void
}

export function GameOfLifeSketch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<P5 | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let instance: P5 | undefined
    let resizeObserver: ResizeObserver | null = null
    const containerEl = containerRef.current

    const startSketch = () => {
      if (instance || !containerRef.current) return

      // Clear any canvases left behind by React strict mode or hot reloads.
      containerRef.current.innerHTML = ''

      const P5Ctor = (window as WindowWithP5).p5
      if (!P5Ctor) return

      const sketch = (p: P5) => {
        let game: number[][] = []
        let paused = false
        let pauseLength = 10
        let debug = false
        let previousX = -1
        let previousY = -1
        let cellCountHistory: number[] = []
        let absMax = 0
        let cellCount = 0

        const randomCell = () => (p.random() < 0.2 ? 1 : 0)

        const initGame = () => {
          game = Array.from({ length: GRID_COLS }, () =>
            Array.from({ length: GRID_ROWS }, () => randomCell()),
          )
          cellCountHistory = []
          absMax = 0
          cellCount = 0
        }

        const neighbourCount = (xPos: number, yPos: number) => {
          const directions = [
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
          ]

          let count = 0
          directions.forEach(([dx, dy]) => {
            const newX = (GRID_COLS + xPos + dx) % GRID_COLS
            const newY = (GRID_ROWS + yPos + dy) % GRID_ROWS
            count += game[newX][newY]
          })

          return count
        }

        const stepGame = () => {
          cellCount = 0
          const future = Array.from({ length: GRID_COLS }, () => Array<number>(GRID_ROWS).fill(0))

          for (let x = 0; x < GRID_COLS; x++) {
            for (let y = 0; y < GRID_ROWS; y++) {
              const neighbours = neighbourCount(x, y)
              if (game[x][y] === 1) {
                future[x][y] = neighbours < 2 || neighbours > 3 ? 0 : 1
                if (future[x][y] === 1) cellCount++
              } else {
                future[x][y] = neighbours === 3 ? 1 : 0
                if (future[x][y] === 1) cellCount++
              }
            }
          }

          for (let x = 0; x < GRID_COLS; x++) {
            for (let y = 0; y < GRID_ROWS; y++) {
              game[x][y] = future[x][y]
            }
          }

          cellCountHistory.push(cellCount)
          if (cellCountHistory.length > MAX_HISTORY_LENGTH) {
            cellCountHistory.shift()
          }
        }

        const mouseToCell = () => {
          const clampedX = Math.min(Math.max(0, p.mouseX), p.width - 1)
          const clampedY = Math.min(Math.max(0, p.mouseY), p.height - 1)
          const x = Math.floor((clampedX * GRID_COLS) / p.width)
          const y = Math.floor((clampedY * GRID_ROWS) / p.height)
          return { x, y }
        }

        const toggleCellAtMouse = () => {
          const { x, y } = mouseToCell()
          game[x][y] = game[x][y] === 1 ? 0 : 1
          previousX = x
          previousY = y
        }

        const drawPauseText = () => {
          p.push()
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(30)
          p.strokeWeight(3)
          p.stroke(0)
          p.fill(232, 219, 200)
          if (paused) {
            p.text('PAUSED', p.width / 2, p.height / 2)
          }
          p.pop()
        }

        const drawText = () => {
          p.push()
          p.fill(255, 200)
          p.stroke(0, 200)
          p.strokeWeight(2)
          p.textSize(13)
          p.textAlign(p.LEFT, p.TOP)
          p.text(`FPS: ${p.frameRate().toFixed(0)}`, 0, 0)

          p.textAlign(p.LEFT, p.BOTTOM)
          p.text('SPACE: Pause Simulation', 0, p.height - 48)
          p.text('Mouse Click: Add/Remove cell', 0, p.height - 36)
          p.text('R: Reset', 0, p.height - 24)
          p.text('S: Statistics', 0, p.height - 12)
          p.text('Mouse Wheel: Change Step Speed', 0, p.height - 0)

          p.textAlign(p.RIGHT, p.BOTTOM)
          p.textSize(10)
          p.text('version 3.0 @ 12.29.24', p.width, p.height)
          p.pop()
        }

        const drawGame = () => {
          p.push()
          p.stroke(232, 219, 200)
          p.strokeWeight(1)

          const dx = p.width / GRID_COLS
          const dy = p.height / GRID_ROWS

          for (let x = 0; x < GRID_COLS; x++) {
            for (let y = 0; y < GRID_ROWS; y++) {
              if (game[x][y] === 1) {
                p.fill(232, 219, 200)
              } else {
                p.fill(0)
              }
              p.rect(x * dx, y * dy, dx, dy)
            }
          }

          p.pop()
        }

        const drawStats = () => {
          if (!cellCountHistory.length) return

          p.push()
          p.strokeWeight(4)
          p.stroke(232, 219, 200)
          p.fill(0, 220)

          const margin = 10
          const graphHeight = Math.max(p.height / 5, 50)
          p.translate(margin, 13 + margin)
          p.rect(0, 0, p.width - 2 * margin, graphHeight)

          const currentMax = cellCountHistory.length ? Math.max(...cellCountHistory) : 0
          absMax = Math.max(absMax, currentMax)

          for (let n = 0; n < cellCountHistory.length - 1; n++) {
            const h0 = Math.round(p.map(cellCountHistory[n], 0, absMax || 1, 0, graphHeight))
            const h1 = Math.round(p.map(cellCountHistory[n + 1], 0, absMax || 1, 0, graphHeight))

            const x0 = Math.round(p.map(n, 0, cellCountHistory.length - 1, 0, p.width - 2 * margin))
            const x1 = Math.round(p.map(n + 1, 0, cellCountHistory.length - 1, 0, p.width - 2 * margin))

            p.stroke(232, 219, 200)
            p.line(x0, graphHeight - h0, x1, graphHeight - h1)

            p.noStroke()
            p.fill(232, 219, 200, 200)
            p.beginShape()
            p.vertex(x0, graphHeight - h0)
            p.vertex(x1, graphHeight - h1)
            p.vertex(x1, graphHeight)
            p.vertex(x0, graphHeight)
            p.endShape()
          }

          p.pop()
        }

        const getWidth = () =>
          containerRef.current?.clientWidth ||
          containerRef.current?.getBoundingClientRect().width ||
          containerRef.current?.parentElement?.clientWidth ||
          containerRef.current?.parentElement?.getBoundingClientRect().width ||
          CANVAS_FALLBACK
        const resizeToContainer = () => {
          const w = getWidth()
          const h = w * ASPECT_RATIO
          p.resizeCanvas(w, h)
        }

        p.setup = () => {
          const w = getWidth()
          const h = w * ASPECT_RATIO
          p.createCanvas(w, h)
          resizeToContainer()
          initGame()
        }

        p.windowResized = resizeToContainer

        p.mousePressed = () => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return
          toggleCellAtMouse()
        }

        p.mouseDragged = () => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return
          const { x, y } = mouseToCell()
          if (x !== previousX || y !== previousY) {
            toggleCellAtMouse()
          }
        }

        p.mouseWheel = (event) => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return true
          pauseLength += event.delta < 0 ? 1 : -1
          pauseLength = Math.max(1, pauseLength)
          return false
        }

        p.keyPressed = () => {
          if (p.keyCode === 32) {
            paused = !paused
          } else if (p.keyCode === 82) {
            initGame()
          } else if (p.keyCode === 83) {
            debug = !debug
          }
        }

        p.draw = () => {
          p.background(0)
          drawGame()

          if (p.frameCount % pauseLength === 0 && !paused) {
            stepGame()
          }

          drawPauseText()
          drawText()

          if (debug) {
            drawStats()
          }
        }
      }

      instance = new P5Ctor(sketch, containerRef.current)
      instanceRef.current = instance

      resizeObserver = new ResizeObserver(() => {
        instance?.windowResized()
      })

      resizeObserver.observe(containerRef.current)
    }

    const ensureScript = () => {
      const existing = document.getElementById('p5-cdn') as HTMLScriptElement | null
      if (existing) {
        if ((window as WindowWithP5).p5) {
          startSketch()
        } else {
          existing.addEventListener('load', startSketch)
        }
        return existing
      }

      const script = document.createElement('script')
      script.id = 'p5-cdn'
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js'
      script.async = true
      script.onload = startSketch
      document.body.appendChild(script)
      return script
    }

    const script = ensureScript()

    return () => {
      script?.removeEventListener('load', startSketch)
      resizeObserver?.disconnect()
      instance?.remove?.()
      if (containerEl) {
        containerEl.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="relative rounded-none border border-black/10 bg-gradient-to-b from-zinc-900 via-black to-black shadow-md dark:border-white/10">
      <div
        ref={containerRef}
        className="w-full"
        style={{ aspectRatio: '2 / 1' }}
        aria-label="Conway's Game of Life canvas"
      />
      <div className="pointer-events-none absolute inset-0 border border-white/5 mix-blend-screen" />
    </div>
  )
}
