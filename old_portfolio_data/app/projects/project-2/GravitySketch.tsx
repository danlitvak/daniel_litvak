'use client'

import { useEffect, useRef } from 'react'

const CANVAS_HEIGHT = 400
const GRAVITY_CONSTANT = 6.67 / 10
const TIME_SCALE = 1
const SCALE_FACTOR = 0.1

export const PREDICTION_LENGTH = 1000

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
  limit: (value: number) => P5Vector
  lerp: (vector: P5Vector, amount: number) => P5Vector
}

interface P5Constructor {
  Vector: {
    random2D: () => P5Vector
  }
  new (sketch: (p: P5) => void, node?: HTMLElement): P5
}

type WindowWithP5 = Window & { p5?: P5Constructor }

interface P5 {
  width: number
  height: number
  keyCode: number
  mouseIsPressed: boolean
  mouseX: number
  mouseY: number
  pmouseX: number
  pmouseY: number
  LEFT: number
  RIGHT: number
  TOP: number
  BOTTOM: number
  createCanvas: (w: number, h: number) => void
  resizeCanvas: (w: number, h: number) => void
  createVector: (x: number, y: number) => P5Vector
  random: (...args: number[]) => number
  textAlign: (horizontal: number | string, vertical: number | string) => void
  push: () => void
  pop: () => void
  resetMatrix: () => void
  noStroke: () => void
  stroke: (r: number, g?: number, b?: number, a?: number) => void
  strokeWeight: (w: number) => void
  circle: (x: number, y: number, d: number) => void
  line: (x1: number, y1: number, x2: number, y2: number) => void
  fill: (r: number, g?: number, b?: number, a?: number) => void
  background: (r: number, g?: number, b?: number, a?: number) => void
  translate: (x: number, y: number) => void
  scale: (value: number) => void
  frameRate: (rate?: number) => number
  textSize: (size: number) => void
  text: (str: string, x: number, y: number) => void
  map: (n: number, start1: number, stop1: number, start2: number, stop2: number) => number
  windowResized: () => void
  setup: () => void
  draw: () => void
  keyPressed: () => void
  mouseClicked: () => void
  mouseDragged: () => void
  remove?: () => void
}

class GravityObject {
  isMoving: boolean
  mass: number
  radius: number
  position: P5Vector
  velocity: P5Vector
  acceleration: P5Vector
  future: P5Vector[]

  constructor(isMoving: boolean, mass: number, radius: number, position: P5Vector, velocity: P5Vector, acceleration: P5Vector) {
    this.isMoving = isMoving
    this.mass = mass
    this.radius = radius
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.future = []
  }

  updatePosition(timeScale: number) {
    const step = Math.max(timeScale, 1)
    if (this.isMoving) {
      const newVelocity = this.velocity.copy().add(this.acceleration)
      this.velocity.lerp(newVelocity, 1 / step)
      const newPosition = this.position.copy().add(this.velocity)
      this.position.lerp(newPosition, 1 / step)
    }
    this.acceleration.setMag(0)
  }

  addForce(force: P5Vector) {
    this.acceleration.add(force.copy().div(this.mass))
  }

  draw(p: P5, scaleFactor: number) {
    p.push()
    p.translate(this.position.x, this.position.y)
    if (this.isMoving) {
      p.fill(255)
      p.noStroke()
    } else {
      p.fill(0)
      p.stroke(255)
      p.strokeWeight(1 / scaleFactor)
    }
    p.circle(0, 0, this.radius / scaleFactor)
    p.stroke(255, 0, 0)
    p.strokeWeight(2 / scaleFactor)
    p.line(0, 0, (this.velocity.x / scaleFactor) * 5, (this.velocity.y / scaleFactor) * 5)
    p.pop()
  }
}

class GravitySystemHandler {
  objects: GravityObject[]
  nullObject: GravityObject
  p: P5

  constructor(p: P5, objects: GravityObject[] = []) {
    this.p = p
    this.objects = objects
    this.nullObject = new GravityObject(true, 1, 1, p.createVector(0, 0), p.createVector(0, 0), p.createVector(0, 0))
  }

  updateSystem(timeScale: number) {
    this.updatePositions(timeScale)

    for (let i = 0; i < this.objects.length; i++) {
      const netForce = this.p.createVector(0, 0)

      for (let j = 0; j < this.objects.length; j++) {
        if (i === j) continue
        const force = this.calculateForce(this.objects[j], this.objects[i])
        netForce.add(force)

        if (!this.objects[i].isMoving) {
          const reaction = force.copy().mult(-1)
          this.objects[j].addForce(reaction)
        }
      }

      this.objects[i].addForce(netForce)
    }
  }

  calculateForce(object1: GravityObject, object2: GravityObject) {
    const numerator = GRAVITY_CONSTANT * object1.mass * object2.mass
    const radius = this.p.createVector(object1.position.x, object1.position.y).sub(object2.position)

    const distance = Math.max(object1.radius + object2.radius, radius.mag())
    if (distance === 0) return this.p.createVector(0, 0)

    radius.setMag(1 / (distance * distance))
    return radius.mult(numerator)
  }

  updatePositions(timeScale: number) {
    this.objects.forEach((object) => {
      object.updatePosition(timeScale)
    })
  }

  drawSystem(scaleFactor: number) {
    this.objects.forEach((object) => {
      object.draw(this.p, scaleFactor)
    })
  }

  calculateField(x: number, y: number) {
    const sum = this.p.createVector(0, 0)

    this.objects.forEach((object) => {
      this.nullObject.position.x = x
      this.nullObject.position.y = y

      sum.add(this.calculateForce(this.nullObject, object))
    })

    return sum.mult(-1)
  }

  drawField(scaleFactor: number) {
    this.p.push()
    const detail = 15

    for (let y = (-1 * this.p.height) / 2 / scaleFactor; y < this.p.height / 2 / scaleFactor; y += detail / scaleFactor) {
      for (let x = (-1 * this.p.width) / 2 / scaleFactor; x < this.p.width / 2 / scaleFactor; x += detail / scaleFactor) {
        const offset = this.calculateField(x, y).mult(500)
        const magnitude = offset.mag()
        const limit = (Math.SQRT2 * detail) / (scaleFactor * 2)

        this.p.strokeWeight(1 / scaleFactor)
        this.p.stroke(255)

        if (magnitude > limit) {
          const delta = magnitude - limit
          this.p.stroke(255, 255 - delta, 255 - delta)
        }

        if (magnitude < 0.5) {
          this.p.noStroke()
        } else {
          offset.limit(limit)
          this.p.line(x, y, x + offset.x, y + offset.y)
        }
      }
    }

    this.p.pop()
  }
}

export function GravitySketch() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let instance: P5 | undefined
    let resizeObserver: ResizeObserver | null = null
    const containerEl = containerRef.current

    const startSketch = () => {
      if (instance || !containerRef.current) return

      // Clear any previous canvases left behind by React strict mode or hot reloads.
      containerRef.current.innerHTML = ''

      const P5Ctor = (window as WindowWithP5).p5
      if (!P5Ctor) return

      const sketch = (p: P5) => {
        let dragging = false
        let system: GravitySystemHandler | null = null
        let predictionSystem: GravitySystemHandler | null = null
        let origin: P5Vector | null = null

        const getWidth = () => containerRef.current?.getBoundingClientRect().width ?? 400

        p.setup = () => {
          p.createCanvas(getWidth(), CANVAS_HEIGHT)
          p.textAlign(p.LEFT, p.TOP)

          const sun = new GravityObject(true, 500000, 30, p.createVector(0, 0), p.createVector(0, 0), p.createVector(0, 0))
          const earth = new GravityObject(true, 5000, 15, p.createVector(1500, 0), p.createVector(0, 15), p.createVector(0, 0))

          system = new GravitySystemHandler(p, [sun, earth])
          predictionSystem = new GravitySystemHandler(p)
          origin = p.createVector(p.width / 2, p.height / 2)
          // Match canvas to container on first paint to avoid duplicate sizing artifacts.
          p.windowResized()
        }

        p.windowResized = () => {
          p.resizeCanvas(getWidth(), CANVAS_HEIGHT)
        }

        const drawOverlay = () => {
          p.push()
          p.resetMatrix()
          p.fill(255, 200)
          p.stroke(0, 200)
          p.strokeWeight(2)
          p.textSize(15)

          p.textAlign(p.LEFT, p.TOP)
          p.text(`FPS: ${p.frameRate().toFixed(1)}`, 0, 0)

          p.textAlign(p.LEFT, p.BOTTOM)
          p.text('Mouse click: add gravity object', 0, p.height)
          p.text('R: randomize objects', 0, p.height - 14)
          p.text('Drag: pan the origin', 0, p.height - 28)

          p.textAlign(p.RIGHT, p.BOTTOM)
          p.textSize(10)
          p.text('version 1.0 @ 12.01.24', p.width, p.height)

          p.pop()
        }

        const predictAndDraw = () => {
          if (!system || !predictionSystem) return

          predictionSystem.objects = system.objects.map(
            (obj) =>
              new GravityObject(
                obj.isMoving,
                obj.mass,
                obj.radius,
                obj.position.copy(),
                obj.velocity.copy(),
                obj.acceleration.copy(),
              ),
          )

          system.objects.forEach((obj) => {
            obj.future = []
          })

          for (let n = 0; n < PREDICTION_LENGTH; n++) {
            for (let i = 0; i < system.objects.length; i++) {
              system.objects[i].future[n] = predictionSystem.objects[i].position.copy()
            }
            predictionSystem.updateSystem(TIME_SCALE)
          }

          p.push()
          system.objects.forEach((obj) => {
            for (let i = 0; i < obj.future.length - 1; i++) {
              const alpha = p.map(i, 0, PREDICTION_LENGTH, 100, 0)
              p.stroke(0, 0, 255, alpha)
              p.strokeWeight(p.map(i, 0, PREDICTION_LENGTH, 5, 0) / SCALE_FACTOR)

              const current = obj.future[i]
              const next = obj.future[i + 1]
              if (current && next) {
                p.line(current.x, current.y, next.x, next.y)
              }
            }
          })
          p.pop()
        }

        p.draw = () => {
          if (!system || !predictionSystem || !origin) return

          const steps = Math.max(1, Math.round(TIME_SCALE))
          for (let i = 0; i < steps; i++) {
            system.updateSystem(TIME_SCALE)
          }

          p.background(10)
          p.translate(origin.x, origin.y)
          p.scale(SCALE_FACTOR)

          predictAndDraw()
          system.drawField(SCALE_FACTOR)
          system.drawSystem(SCALE_FACTOR)

          if (!p.mouseIsPressed) {
            dragging = false
          }

          drawOverlay()
        }

        p.mouseDragged = () => {
          if (!origin) return
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return
          dragging = true
          // Use event deltas to avoid stacking with frame-based pmouse updates.
          const dx = (p as unknown as { movedX?: number }).movedX ?? p.mouseX - p.pmouseX
          const dy = (p as unknown as { movedY?: number }).movedY ?? p.mouseY - p.pmouseY
          origin.x += dx
          origin.y += dy
        }

        p.mouseClicked = () => {
          if (!system) return
          if (dragging) return

          system.objects.push(
            new GravityObject(
              true,
              p.random(10, 100000),
              p.random(10, 50),
              p.createVector((p.mouseX - p.width / 2) / SCALE_FACTOR, (p.mouseY - p.height / 2) / SCALE_FACTOR),
              P5Ctor.Vector.random2D().mult(10),
              p.createVector(0, 0),
            ),
          )
        }

        p.keyPressed = () => {
          if (!system) return
          if (p.keyCode === 82) {
            system.objects.forEach((object) => {
              object.position = p.createVector((p.random(-p.width, p.width) / 4) / SCALE_FACTOR, (p.random(-p.height, p.height) / 4) / SCALE_FACTOR)
              object.velocity.div(5)
              object.acceleration.setMag(0)
            })
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
      if (containerEl) {
        containerEl.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="relative rounded-none border border-black/10 bg-gradient-to-b from-slate-950 via-black to-black shadow-md dark:border-white/10">
      <div ref={containerRef} className="h-full w-full" aria-label="Interactive gravity simulation canvas" />
    </div>
  )
}
