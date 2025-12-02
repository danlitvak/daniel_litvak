'use client'

import { useEffect, useRef } from 'react'

const CANVAS_HEIGHT = 400
const BOID_COUNT = 500
const BOID_VISION = 25
const EDGE_WEIGHT = 100
const COHESION_WEIGHT = 5
const SEPARATION_WEIGHT = 2
const ALIGNMENT_WEIGHT = 1

interface P5Vector {
  x: number
  y: number
  add: (vector: P5Vector) => P5Vector
  sub: (vector: P5Vector) => P5Vector
  copy: () => P5Vector
  div: (value: number) => P5Vector
  mult: (value: number) => P5Vector
  setMag: (value: number) => P5Vector
  mag: () => number
  dist: (vector: P5Vector) => number
  rotate: (angle: number) => P5Vector
  heading: () => number
  limit: (value: number) => P5Vector
}

interface P5Constructor {
  Vector: {
    random2D: () => P5Vector
    dist: (v1: P5Vector, v2: P5Vector) => number
    sub: (v1: P5Vector, v2: P5Vector) => P5Vector
  }
  new(sketch: (p: P5) => void, node?: HTMLElement): P5
}

type WindowWithP5 = Window & { p5?: P5Constructor }

type Boid = { pos: P5Vector; vel: P5Vector; neighbours: number }

interface P5 {
  width: number
  height: number
  keyCode: number
  mouseIsPressed: boolean
  mouseX: number
  mouseY: number
  frameCount: number
  LEFT: number
  RIGHT: number
  TOP: number
  BOTTOM: number
  BLEND: string | number
  createCanvas: (w: number, h: number) => void
  resizeCanvas: (w: number, h: number) => void
  createVector: (x: number, y: number) => P5Vector
  random: (max: number) => number
  textAlign: (horizontal: number | string, vertical: number | string) => void
  push: () => void
  pop: () => void
  noFill: () => void
  noStroke: () => void
  stroke: (r: number, g?: number, b?: number, a?: number) => void
  strokeWeight: (w: number) => void
  circle: (x: number, y: number, d: number) => void
  line: (x1: number, y1: number, x2: number, y2: number) => void
  fill: (r: number, g?: number, b?: number, a?: number) => void
  background: (r: number, g?: number, b?: number, a?: number) => void
  blendMode: (mode: number | string) => void
  frameRate: (rate?: number) => number
  textSize: (size: number) => void
  text: (str: string, x: number, y: number) => void
  map: (n: number, start1: number, stop1: number, start2: number, stop2: number) => number
  rect: (x: number, y: number, w: number, h: number) => void
  beginShape: () => void
  vertex: (x: number, y: number) => void
  endShape: () => void
  translate: (x: number, y: number) => void
  rotate: (angle: number) => void
  triangle: (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => void
  windowResized: () => void
  setup: () => void
  draw: () => void
  keyPressed: () => void
  remove?: () => void
}

class Bound {
  x: number
  y: number
  w: number
  h: number

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  containsPos(object: { pos: P5Vector }) {
    const { x, y } = object.pos
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
  }

  containsBound(range: Bound) {
    return (
      range.x + range.w >= this.x &&
      range.x <= this.x + this.w &&
      range.y + range.h >= this.y &&
      range.y <= this.y + this.h
    )
  }
}

class QuadTree<T extends { pos: P5Vector }> {
  objects: T[]
  maxObjects: number
  bound: Bound
  divided: boolean
  tl?: QuadTree<T>
  tr?: QuadTree<T>
  bl?: QuadTree<T>
  br?: QuadTree<T>
  searched: boolean

  constructor(maxObjects: number, bound: Bound) {
    this.objects = []
    this.maxObjects = maxObjects
    this.bound = bound
    this.divided = false
    this.searched = false
  }

  query(range: Bound, found: T[] = []) {
    this.searched = false

    if (this.bound.containsBound(range)) {
      if (this.divided) {
        this.tl?.query(range, found)
        this.tr?.query(range, found)
        this.bl?.query(range, found)
        this.br?.query(range, found)
      } else {
        this.searched = true
        this.objects.forEach((object) => {
          if (range.containsPos(object)) {
            found.push(object)
          }
        })
      }
    }

    return found
  }

  insert(object: T) {
    if (!this.bound.containsPos(object)) return

    if (this.divided) {
      const x = object.pos.x
      const y = object.pos.y

      const mx = this.bound.x + this.bound.w / 2
      const my = this.bound.y + this.bound.h / 2

      switch ((x >= mx ? 1 : 0) + 2 * (y >= my ? 1 : 0)) {
        case 0:
          this.tl?.insert(object)
          break
        case 1:
          this.tr?.insert(object)
          break
        case 2:
          this.bl?.insert(object)
          break
        case 3:
          this.br?.insert(object)
          break
        default:
          break
      }
    } else {
      this.objects.push(object)
      if (this.objects.length >= this.maxObjects) this.divide()
    }
  }

  divide() {
    if (this.bound.w <= 1 || this.bound.h <= 1) return

    const hw = this.bound.w / 2
    const hh = this.bound.h / 2

    this.tl = new QuadTree<T>(this.maxObjects, new Bound(this.bound.x, this.bound.y, hw, hh))
    this.tr = new QuadTree<T>(this.maxObjects, new Bound(this.bound.x + hw, this.bound.y, hw, hh))
    this.bl = new QuadTree<T>(this.maxObjects, new Bound(this.bound.x, this.bound.y + hh, hw, hh))
    this.br = new QuadTree<T>(this.maxObjects, new Bound(this.bound.x + hw, this.bound.y + hh, hw, hh))

    this.objects.forEach((object) => {
      const x = object.pos.x
      const y = object.pos.y
      const mx = this.bound.x + hw
      const my = this.bound.y + hh

      switch ((x >= mx ? 1 : 0) + 2 * (y >= my ? 1 : 0)) {
        case 0:
          this.tl?.insert(object)
          break
        case 1:
          this.tr?.insert(object)
          break
        case 2:
          this.bl?.insert(object)
          break
        case 3:
          this.br?.insert(object)
          break
        default:
          break
      }
    })

    this.objects = []
    this.divided = true
  }

  returnObjects(): T[] {
    if (this.divided) {
      return [
        ...(this.tl?.returnObjects() ?? []),
        ...(this.tr?.returnObjects() ?? []),
        ...(this.bl?.returnObjects() ?? []),
        ...(this.br?.returnObjects() ?? []),
      ]
    }

    return [...this.objects]
  }

  show(p: P5) {
    p.push()
    if (this.divided) {
      this.tl?.show(p)
      this.tr?.show(p)
      this.bl?.show(p)
      this.br?.show(p)
    } else {
      p.strokeWeight(1)
      p.stroke(255, 150)
      p.noFill()
      p.rect(this.bound.x, this.bound.y, this.bound.w, this.bound.h)
    }
    p.pop()

    this.searched = false
  }
}

export function FlockingSketch() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let instance: P5 | undefined
    let resizeObserver: ResizeObserver | null = null

    const startSketch = () => {
      if (instance || !containerRef.current) return

      const P5Ctor = (window as WindowWithP5).p5
      if (!P5Ctor) return

      const frHistory: number[] = []

      const sketch = (p: P5) => {
        let boids: Boid[] = []
        let initBound = new Bound(0, 0, 0, 0)
        let qt = new QuadTree<Boid>(5, initBound)
        let debug = false
        let showFrames = false

        const getWidth = () => containerRef.current?.getBoundingClientRect().width ?? 400

        const resetQuadTree = () => {
          initBound = new Bound(0, 0, p.width, p.height)
          const rebuilt = new QuadTree<Boid>(10, initBound)
          boids.forEach((boid) => rebuilt.insert(boid))
          qt = rebuilt
        }

        p.setup = () => {
          p.createCanvas(getWidth(), CANVAS_HEIGHT)
          initBound = new Bound(0, 0, p.width, p.height)
          qt = new QuadTree<Boid>(5, initBound)

          for (let i = 0; i < BOID_COUNT; i++) {
            qt.insert({
              pos: p.createVector(p.random(p.width), p.random(p.height)),
              vel: P5Ctor.Vector.random2D(),
              neighbours: 0,
            })
          }

          boids = qt.returnObjects()
          p.textAlign(p.LEFT, p.TOP)
        }

        p.windowResized = () => {
          p.resizeCanvas(getWidth(), CANVAS_HEIGHT)
          resetQuadTree()
        }

        const updateBoidVelocity = () => {
          boids.forEach((boid) => {
            const pos = boid.pos
            const vel = boid.vel

            if (debug) {
              p.push()
              p.noFill()
              p.stroke(255, 30)
              p.circle(pos.x, pos.y, BOID_VISION)
              p.pop()
            }

            const com = p.createVector(0, 0)
            const avv = p.createVector(0, 0)
            const rep = p.createVector(0, 0)

            const close = qt.query(new Bound(pos.x - BOID_VISION, pos.y - BOID_VISION, BOID_VISION * 2, BOID_VISION * 2))
            boid.neighbours = close.length

            let count = 0

            close.forEach((other) => {
              if (boid === other) return

              const oPos = other.pos
              const oVel = other.vel
              const d = Math.max(pos.dist(oPos), 1)

              if (d < BOID_VISION) {
                com.add(oPos)
                avv.add(oVel)
                rep.add(pos.copy().sub(oPos).div(Math.pow(d, 0.3)))
                count++

                if (debug) {
                  p.push()
                  p.stroke(0, 255, 0, 20)
                  p.strokeWeight(1)
                  p.line(pos.x, pos.y, oPos.x, oPos.y)
                  p.pop()
                }
              }
            })

            const edg = p.createVector(
              -100 * Math.exp(-Math.min(pos.x, Math.abs(p.width - pos.x))) * Math.sign(pos.x - p.width / 2),
              -100 * Math.exp(-Math.min(pos.y, Math.abs(p.height - pos.y))) * Math.sign(pos.y - p.height / 2),
            )
            const tlt = p.createVector(0, 0)

            if (count !== 0) {
              com.div(count).sub(pos)
              tlt
                .add(com.mult(COHESION_WEIGHT))
                .add(avv.mult(ALIGNMENT_WEIGHT))
                .add(rep.mult(SEPARATION_WEIGHT))
                .add(edg.mult(EDGE_WEIGHT))
            }

            if (debug) {
              p.push()
              p.stroke(0, 0, 255)
              edg.limit(10)
              p.line(pos.x, pos.y, pos.x + edg.x, pos.y + edg.y)
              p.pop()
            }

            const s = Math.sign(tlt.x * vel.y - vel.x * tlt.y)
            vel.rotate(-0.03 * s)

            if (p.mouseIsPressed) {
              const mp = p.createVector(p.mouseX, p.mouseY)
              const d = P5Ctor.Vector.dist(mp, pos)
              if (d < BOID_VISION * 4 && d > BOID_VISION * 2) {
                boid.vel = P5Ctor.Vector.sub(mp, pos).setMag(vel.mag()).mult(2).limit(80)
              }
            }
          })
        }

        const updateBoidPosition = () => {
          boids.forEach((boid) => {
            const pos = boid.pos
            const vel = boid.vel

            pos.add(vel)

            if (pos.x < 0) pos.x = 0
            if (pos.y < 0) pos.y = 0
            if (pos.x > p.width) pos.x = p.width
            if (pos.y > p.height) pos.y = p.height

            if (vel.mag() > 1) vel.mult(0.8)
            if (vel.mag() < 1) vel.setMag(1)
          })
        }

        const drawBoids = () => {
          p.push()
          p.fill(255)
          p.noStroke()

          if (debug) {
            boids.forEach((b) => {
              const pos = b.pos
              const vel = b.vel
              p.circle(pos.x, pos.y, 3)
              p.stroke(255, 0, 0, 150)
              p.line(pos.x, pos.y, pos.x + vel.x * 10, pos.y + vel.y * 10)
            })
          } else {
            boids.forEach((b) => {
              const pos = b.pos
              const vel = b.vel
              p.push()
              p.translate(pos.x, pos.y)
              p.rotate(vel.heading())

              const nrm = vel.copy().setMag(255)
              p.fill(
                Math.abs(nrm.x) + b.neighbours * 1,
                (pos.x / p.width) * 200 + b.neighbours * 1,
                Math.abs(nrm.y) - 20 + b.neighbours * 1,
                0.1,
              )
              p.circle(0, 0, BOID_VISION)

              p.fill(Math.abs(nrm.x), (pos.x / p.width) * 200, Math.abs(nrm.y))
              p.triangle(5, 0, -5, -5, -5, 5)
              p.pop()
            })
          }

          p.pop()
        }

        const drawFrameRateGraph = () => {
          if (!showFrames) return

          const HISTORY_SIZE = 100
          const GRAPH_WIDTH = p.width - 20
          const GRAPH_HEIGHT = 60

          frHistory.push(p.frameRate())
          if (frHistory.length > HISTORY_SIZE) frHistory.shift()

          const xPos = 10
          const yPos = p.height - GRAPH_HEIGHT - 10

          p.push()
          p.noStroke()
          p.fill(0, 150)
          p.rect(xPos, yPos, GRAPH_WIDTH, GRAPH_HEIGHT)

          p.fill(255)
          p.textSize(12)
          p.textAlign(p.LEFT, p.BOTTOM)
          const average = frHistory.reduce((sum, val) => sum + val, 0) / frHistory.length
          p.text(`FPS: ${p.frameRate().toFixed(5)}, Average: ${average.toFixed(5)}`, xPos + 5, yPos + 15)

          const maxFR = Math.max(60, ...frHistory)

          p.stroke(255)
          p.noFill()
          p.beginShape()
          frHistory.forEach((fr, idx) => {
            const x = p.map(idx, 0, frHistory.length - 1, xPos, xPos + GRAPH_WIDTH)
            const y = p.map(fr, 0, maxFR, yPos + GRAPH_HEIGHT, yPos)
            p.vertex(x, y)
          })
          p.endShape()
          p.pop()
        }

        p.keyPressed = () => {
          if (p.keyCode === 32) {
            debug = !debug
          }

          if (p.keyCode === 70) {
            showFrames = !showFrames
          }
        }

        p.draw = () => {
          p.blendMode(p.BLEND)
          p.frameRate(60)
          if (debug) {
            p.background(0)
            qt.show(p)
          } else {
            p.background(0, 10)
          }

          updateBoidVelocity()
          updateBoidPosition()
          drawBoids()
          drawFrameRateGraph()

          if (p.frameCount % 30 === 0) {
            qt = new QuadTree<Boid>(10, initBound)
            boids.forEach((boid) => qt.insert(boid))
          }
        }
      }

      instance = new P5Ctor(sketch, containerRef.current)

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
    }
  }, [])

  return (
    <div className="relative rounded-none border border-black/10 bg-gradient-to-b from-zinc-900 via-black to-black shadow-md dark:border-white/10">
      <div ref={containerRef} className="h-full w-full" aria-label="Interactive flocking boids simulation canvas" />
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-4 text-white">
        { }
      </div>
    </div>
  )
}