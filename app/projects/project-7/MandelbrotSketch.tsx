'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_VIEW = { xmin: -2.5, xmax: 1.5, ymin: -1.5, ymax: 1.5 }
const DEFAULT_ITERATIONS = 1000
const ASPECT_RATIO = 0.8 // height = width * ASPECT_RATIO
const ZOOM_FACTOR = 0.5
const DEFAULT_PIXEL_SIZE = 4

interface P5Vector {
  x: number
  y: number
}

interface P5Constructor {
  new(sketch: (p: P5) => void, node?: HTMLElement): P5
}

type WindowWithP5 = Window & { p5?: P5Constructor }

interface P5 {
  TOP: string | number
  width: number
  height: number
  key: string
  keyCode: number
  mouseX: number
  mouseY: number
  pmouseX: number
  pmouseY: number
  mouseButton: number
  LEFT: number
  HSB: number
  RGB: number
  createCanvas: (w: number, h: number) => void
  resizeCanvas: (w: number, h: number) => void
  loadPixels: () => void
  updatePixels: () => void
  pixelDensity: (value?: number) => number
  colorMode: (mode: number | string) => void
  color: (h: number, s?: number, b?: number) => unknown
  red: (color: unknown) => number
  green: (color: unknown) => number
  blue: (color: unknown) => number
  noLoop: () => void
  redraw: () => void
  map: (n: number, start1: number, stop1: number, start2: number, stop2: number) => number
  abs: (n: number) => number
  pow: (n: number, e: number) => number
  millis: () => number
  rect: (x: number, y: number, w: number, h: number) => void
  text: (str: string, x: number, y: number) => void
  textSize: (size: number) => void
  textAlign: (horizontal: number | string, vertical: number | string) => void
  fill: (r: number, g?: number, b?: number, a?: number) => void
  noStroke: () => void
  stroke: (r: number, g?: number, b?: number, a?: number) => void
  background: (r: number, g?: number, b?: number, a?: number) => void
  windowResized: () => void
  setup: () => void
  draw: () => void
  mousePressed: () => void
  keyPressed: () => void
  remove?: () => void
}

export function MandelbrotSketch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<P5 | undefined>(undefined)
  const pixelSizeRef = useRef(DEFAULT_PIXEL_SIZE)
  const [pixelSize, setPixelSize] = useState(DEFAULT_PIXEL_SIZE)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let instance: P5 | undefined
    let resizeObserver: ResizeObserver | null = null

    const startSketch = () => {
      if (instance || !containerRef.current) return

      // Clear any canvases left behind by React strict mode or hot reloads.
      containerRef.current.innerHTML = ''

      const P5Ctor = (window as WindowWithP5).p5
      if (!P5Ctor) return

      const sketch = (p: P5) => {
        let xmin = DEFAULT_VIEW.xmin
        let xmax = DEFAULT_VIEW.xmax
        let ymin = DEFAULT_VIEW.ymin
        let ymax = DEFAULT_VIEW.ymax
        let maxIter = DEFAULT_ITERATIONS

        const zoomStack: Array<{ xmin: number; xmax: number; ymin: number; ymax: number }> = []
        let showHUD = true

        const getWidth = () => {
          const node = containerRef.current
          const measured = node?.clientWidth ?? node?.getBoundingClientRect().width ?? 0
          return Math.max(200, measured || 400)
        }
        const getHeight = () => getWidth() * ASPECT_RATIO

        const adjustAspectRatio = () => {
          const complexWidth = xmax - xmin
          const aspect = p.height / p.width
          const complexHeight = complexWidth * aspect

          const ymid = (ymin + ymax) / 2
          ymin = ymid - complexHeight / 2
          ymax = ymid + complexHeight / 2
        }

        p.setup = () => {
          p.pixelDensity(1)
          p.createCanvas(getWidth(), getHeight())
          p.noLoop()
          adjustAspectRatio()
          p.redraw()
        }

        p.windowResized = () => {
          p.pixelDensity(1)
          p.resizeCanvas(getWidth(), getHeight())
          adjustAspectRatio()
          p.redraw()
        }

        const drawHUD = () => {
          if (!showHUD) return

          const centerX = (xmin + xmax) / 2
          const centerY = (ymin + ymax) / 2
          const zoomLevel = 4 / (xmax - xmin)

          p.noStroke()
          p.fill(0, 150)
          p.rect(0, p.height - 50, 170, 50)

          p.fill(255)
          p.textSize(12)
          p.textAlign(p.LEFT, p.TOP)
          p.text(`Center: (${centerX.toFixed(5)}, ${centerY.toFixed(5)})`, 5, p.height - 45)
          p.text(`Zoom: ${zoomLevel.toFixed(2)}x`, 5, p.height - 30)
          p.text(`Max Iter: ${maxIter}`, 5, p.height - 15)
        }

        p.draw = () => {
          const startTime = p.millis()
          p.pixelDensity(1)
          const blockSize = Math.max(1, Math.floor(pixelSizeRef.current))

          p.loadPixels()
          p.colorMode(p.HSB)

          for (let x = 0; x < p.width; x += blockSize) {
            for (let y = 0; y < p.height; y += blockSize) {
              let a = p.map(x, 0, p.width, xmin, xmax)
              let b = p.map(y, 0, p.height, ymin, ymax)

              const ca = a
              const cb = b
              let n = 0

              while (n < maxIter) {
                const aa = a * a - b * b
                const bb = 2 * a * b
                a = aa + ca
                b = bb + cb
                if (p.abs(a + b) > 32) break
                n++
              }

              const norm = n / maxIter
              const sqhu = p.pow(norm, 0.5)
              const hu = p.map(sqhu, 0, 1, 0, 255)
              const col = p.color(hu, 255, n === maxIter ? 0 : 255)

              const r = p.red(col)
              const g = p.green(col)
              const bCol = p.blue(col)

              // Fill a block of size blockSize x blockSize with the same color to save work.
              for (let dx = 0; dx < blockSize && x + dx < p.width; dx++) {
                for (let dy = 0; dy < blockSize && y + dy < p.height; dy++) {
                  const idx = 4 * ((x + dx) + (y + dy) * p.width)
                  // @ts-expect-error p5 attaches pixels array dynamically
                  p.pixels[idx + 0] = r
                  // @ts-expect-error p5 attaches pixels array dynamically
                  p.pixels[idx + 1] = g
                  // @ts-expect-error p5 attaches pixels array dynamically
                  p.pixels[idx + 2] = bCol
                  // @ts-expect-error p5 attaches pixels array dynamically
                  p.pixels[idx + 3] = 255
                }
              }
            }
          }

          p.colorMode(p.RGB)
          p.updatePixels()

          drawHUD()

          const elapsed = p.millis() - startTime
          if (elapsed > 100) {
            // eslint-disable-next-line no-console
            console.log(`Mandelbrot redraw: ${elapsed.toFixed(1)} ms`)
          }
        }

        p.mousePressed = () => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return
          if (p.mouseButton !== p.LEFT) return

          zoomStack.push({ xmin, xmax, ymin, ymax })

          const cx = p.map(p.mouseX, 0, p.width, xmin, xmax)
          const cy = p.map(p.mouseY, 0, p.height, ymin, ymax)

          const currentWidth = xmax - xmin
          const currentHeight = ymax - ymin

          const newWidth = currentWidth * ZOOM_FACTOR
          const newHeight = currentHeight * ZOOM_FACTOR

          xmin = cx - newWidth / 2
          xmax = cx + newWidth / 2
          ymin = cy - newHeight / 2
          ymax = cy + newHeight / 2

          adjustAspectRatio()
          p.redraw()
        }

        p.keyPressed = () => {
          if (p.key === 'z' || p.key === 'Z') {
            const previous = zoomStack.pop()
            if (previous) {
              xmin = previous.xmin
              xmax = previous.xmax
              ymin = previous.ymin
              ymax = previous.ymax
              adjustAspectRatio()
              p.redraw()
            }
          }

          if (p.keyCode === 32) {
            showHUD = !showHUD
            p.redraw()
          }
        }

          ;
        (p as unknown as { refreshView?: () => void }).refreshView = () => {
          adjustAspectRatio()
          p.redraw()
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
      script.onload = () => {
        script.dataset.loaded = 'true'
        startSketch()
      }
      document.body.appendChild(script)
      return script
    }

    const script = ensureScript()

    return () => {
      if (script) {
        script.removeEventListener('load', startSketch)
      }
      resizeObserver?.disconnect()
      instance?.remove?.()
      instanceRef.current = undefined
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="space-y-0">
      <div className="relative w-full overflow-hidden rounded-none border border-black/10 bg-transparent dark:border-white/10">
        <div ref={containerRef} className="h-full w-full" aria-label="Interactive Mandelbrot visualization canvas" />
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-none border border-black/10 bg-white px-3 py-2 text-xs text-black dark:border-white/10 dark:bg-white/5 dark:text-white">
        <span className="font-semibold uppercase text-[11px]">Pixel size</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-none border border-black/20 bg-white text-sm font-semibold leading-[0] text-black transition hover:bg-black/5 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            onClick={() => {
              const next = Math.max(1, pixelSize - 1)
              setPixelSize(next)
              pixelSizeRef.current = next
                ; (instanceRef.current as unknown as { refreshView?: () => void })?.refreshView?.()
            }}
            aria-label="Decrease pixel size"
          >
            -
          </button>
          <span className="inline-flex h-7 items-center justify-center rounded-none border border-black/20 bg-white px-3 text-[11px] font-semibold uppercase tracking-wide text-black transition dark:border-white/30 dark:bg-transparent dark:text-white">
            {pixelSize}x{pixelSize}
          </span>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-none border border-black/20 bg-white text-sm font-semibold leading-[0] text-black transition hover:bg-black/5 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            onClick={() => {
              const next = Math.min(8, pixelSize + 1)
              setPixelSize(next)
              pixelSizeRef.current = next
                ; (instanceRef.current as unknown as { refreshView?: () => void })?.refreshView?.()
            }}
            aria-label="Increase pixel size"
          >
            +
          </button>
        </div>
        <span className="text-[11px] text-black/70 dark:text-white/70">Lower values = finer detail, higher = faster.</span>
      </div>
    </div>
  )
}
