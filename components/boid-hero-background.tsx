"use client";

import { Pause, Play, RotateCcw, Settings, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SimulationConfig = {
  boidRadius: number;
  minSpeed: number;
  maxSpeed: number;
  baseAngle: number;
  angleSpread: number;
  avoidRadius: number;
  mouseStrengthNear: number;
  mouseStrengthFar: number;
  returnStrength: number;
  pastMouseResteerStrength: number;
  pastMouseDistance: number;
  trailOpacity: number;
  drawGrid: boolean;
  gridOpacity: number;
};

const BOID_AREA_PIXELS = 2000;

const defaultConfig: SimulationConfig = {
  boidRadius: 1,
  minSpeed: 1,
  maxSpeed: 1.5,
  baseAngle: 45,
  angleSpread: 5,
  avoidRadius: 80,
  mouseStrengthNear: 0.2,
  mouseStrengthFar: 0.01,
  returnStrength: 0.03,
  pastMouseResteerStrength: 0.08,
  pastMouseDistance: 40,
  trailOpacity: 20,
  drawGrid: true,
  gridOpacity: 0.08,
};

const lightPalette = {
  background: "245, 244, 239",
  boid: "24, 24, 24",
  grid: "24, 24, 24",
};

const darkPalette = {
  background: "22, 22, 22",
  boid: "238, 238, 238",
  grid: "238, 238, 238",
};

type Boid = {
  angle: number;
  angleOffset: number;
  originalAngle: number;
  r: number;
  speed: number;
  x: number;
  y: number;
};

type MouseState = {
  inside: boolean;
  x: number;
  y: number;
};

type SliderProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
  value: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function lerpAngle(a: number, b: number, t: number) {
  const diff = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + diff * t;
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getViewportScale(width: number, height: number) {
  const shortSide = Math.min(width, height);
  const area = width * height;
  const shortSideScale = clamp(shortSide / 760, 0.58, 1.08);
  const areaScale = clamp(Math.sqrt(area / (1440 * 900)), 0.62, 1.08);

  return Math.min(shortSideScale, areaScale);
}

function getResponsiveConfig(
  config: SimulationConfig,
  width: number,
  height: number,
): SimulationConfig {
  const scale = getViewportScale(width, height);
  const speedScale = clamp(0.82 + scale * 0.18, 0.72, 1.04);
  const forceScale = clamp(0.7 + scale * 0.3, 0.66, 1);

  return {
    ...config,
    boidRadius: clamp(config.boidRadius * scale, 0.75, config.boidRadius),
    minSpeed: clamp(config.minSpeed * speedScale, 0.35, config.minSpeed),
    maxSpeed: clamp(config.maxSpeed * speedScale, 0.6, config.maxSpeed),
    avoidRadius: Math.max(24, Math.round(config.avoidRadius * scale)),
    mouseStrengthNear: config.mouseStrengthNear * forceScale,
    mouseStrengthFar: config.mouseStrengthFar * forceScale,
    pastMouseDistance: Math.max(
      16,
      Math.round(config.pastMouseDistance * scale),
    ),
    pastMouseResteerStrength: config.pastMouseResteerStrength * forceScale,
    returnStrength: config.returnStrength * clamp(0.88 + scale * 0.12, 0.82, 1),
  };
}

function getTargetBoidCount(width: number, height: number) {
  return Math.max(1, Math.round((width * height) / BOID_AREA_PIXELS));
}

function createAngleOffset(config: SimulationConfig) {
  return randomBetween(-radians(config.angleSpread), radians(config.angleSpread));
}

function createBoid(
  width: number,
  height: number,
  config: SimulationConfig,
  initial = false,
): Boid {
  const angleOffset = createAngleOffset(config);
  const originalAngle = radians(config.baseAngle) + angleOffset;

  return {
    x: initial || Math.random() < 0.5 ? Math.random() * width : 0,
    y: initial || Math.random() >= 0.5 ? Math.random() * height : 0,
    speed: randomBetween(config.minSpeed, config.maxSpeed),
    originalAngle,
    angle: originalAngle,
    angleOffset,
    r: config.boidRadius,
  };
}

function respawnBoid(
  boid: Boid,
  width: number,
  height: number,
  config: SimulationConfig,
) {
  if (Math.random() < 0.5) {
    boid.x = Math.random() * width;
    boid.y = 0;
  } else {
    boid.x = 0;
    boid.y = Math.random() * height;
  }

  boid.speed = randomBetween(config.minSpeed, config.maxSpeed);
  boid.angleOffset = createAngleOffset(config);
  boid.originalAngle = radians(config.baseAngle) + boid.angleOffset;
  boid.angle = boid.originalAngle;
  boid.r = config.boidRadius;
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: SimulationConfig,
  gridColor: string,
) {
  const rows = 20;
  const cols = rows;
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  ctx.strokeStyle = `rgba(${gridColor}, ${config.gridOpacity})`;
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let i = 0; i <= cols; i += 1) {
    const x = i * cellWidth;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (let j = 0; j <= rows; j += 1) {
    const y = j * cellHeight;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
}

function getPalette() {
  if (typeof document === "undefined") {
    return lightPalette;
  }

  return document.documentElement.classList.contains("dark")
    ? darkPalette
    : lightPalette;
}

function updateBoid(
  boid: Boid,
  mouse: MouseState,
  width: number,
  height: number,
  frameScale: number,
  config: SimulationConfig,
) {
  boid.r = config.boidRadius;
  boid.originalAngle = radians(config.baseAngle) + boid.angleOffset;

  if (mouse.inside) {
    const dx = boid.x - mouse.x;
    const dy = boid.y - mouse.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d < config.avoidRadius) {
      const awayAngle = Math.atan2(dy, dx);
      const strength = mapRange(
        d,
        0,
        config.avoidRadius,
        config.mouseStrengthNear,
        config.mouseStrengthFar,
      );

      boid.angle = lerpAngle(boid.angle, awayAngle, strength);
    } else {
      boid.angle = lerpAngle(
        boid.angle,
        boid.originalAngle,
        config.returnStrength,
      );
    }

    const baseDx = Math.cos(boid.originalAngle);
    const baseDy = Math.sin(boid.originalAngle);
    const mouseToBoidX = boid.x - mouse.x;
    const mouseToBoidY = boid.y - mouse.y;
    const pastAmount = mouseToBoidX * baseDx + mouseToBoidY * baseDy;

    if (
      pastAmount > 0 &&
      d < config.avoidRadius + config.pastMouseDistance
    ) {
      boid.angle = lerpAngle(
        boid.angle,
        boid.originalAngle,
        config.pastMouseResteerStrength,
      );
    }
  } else {
    boid.angle = lerpAngle(
      boid.angle,
      boid.originalAngle,
      config.returnStrength,
    );
  }

  boid.x += Math.cos(boid.angle) * boid.speed * frameScale;
  boid.y += Math.sin(boid.angle) * boid.speed * frameScale;

  if (boid.x > width || boid.y > height) {
    respawnBoid(boid, width, height, config);
  }
}

function SimulationSlider({
  label,
  max,
  min,
  onChange,
  step = 1,
  suffix,
  value,
}: SliderProps) {
  return (
    <label className="grid gap-1 text-xs">
      <span className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {suffix}
        </span>
      </span>
      <input
        className="accent-foreground"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

export function BoidHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef(defaultConfig);
  const [config, setConfig] = useState(defaultConfig);
  const [simulationEnabled, setSimulationEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    configRef.current = {
      ...config,
      maxSpeed: Math.max(config.maxSpeed, config.minSpeed),
      minSpeed: Math.min(config.minSpeed, config.maxSpeed),
    };
  }, [config]);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasElement;
    const canvasContext = canvas.getContext("2d");

    if (!canvasContext) {
      return;
    }

    const ctx: CanvasRenderingContext2D = canvasContext;
    const mouse: MouseState = { inside: false, x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let boids: Boid[] = [];
    let animationFrame = 0;
    let lastTimestamp = performance.now();

    function resetBoids(currentConfig: SimulationConfig) {
      boids = Array.from({ length: getTargetBoidCount(width, height) }, () =>
        createBoid(width, height, currentConfig, true),
      );
    }

    function drawStaticBackground(currentConfig: SimulationConfig) {
      const palette = getPalette();

      ctx.fillStyle = `rgb(${palette.background})`;
      ctx.fillRect(0, 0, width, height);

      if (currentConfig.drawGrid) {
        drawGrid(ctx, width, height, currentConfig, palette.grid);
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const currentConfig = getResponsiveConfig(configRef.current, width, height);
      resetBoids(currentConfig);
      drawStaticBackground(currentConfig);
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    }

    function handlePointerLeave() {
      mouse.inside = false;
    }

    function syncBoidCount(currentConfig: SimulationConfig) {
      const targetCount = getTargetBoidCount(width, height);

      if (boids.length < targetCount) {
        const missing = targetCount - boids.length;
        boids.push(
          ...Array.from({ length: missing }, () =>
            createBoid(width, height, currentConfig, true),
          ),
        );
      } else if (boids.length > targetCount) {
        boids.length = targetCount;
      }
    }

    function draw(timestamp: number) {
      const currentConfig = getResponsiveConfig(configRef.current, width, height);
      const palette = getPalette();
      const delta = timestamp - lastTimestamp;
      const frameScale = Math.min(2, Math.max(0.5, delta / 16.67));
      lastTimestamp = timestamp;

      syncBoidCount(currentConfig);
      ctx.fillStyle = `rgba(${palette.background}, ${currentConfig.trailOpacity / 255})`;
      ctx.fillRect(0, 0, width, height);

      if (currentConfig.drawGrid) {
        drawGrid(ctx, width, height, currentConfig, palette.grid);
      }

      ctx.fillStyle = `rgb(${palette.boid})`;
      for (const boid of boids) {
        updateBoid(boid, mouse, width, height, frameScale, currentConfig);
        ctx.beginPath();
        ctx.arc(boid.x, boid.y, boid.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);

    if (!simulationEnabled) {
      const observer = new MutationObserver(() => {
        drawStaticBackground(getResponsiveConfig(configRef.current, width, height));
      });

      observer.observe(document.documentElement, {
        attributeFilter: ["class"],
        attributes: true,
      });

      drawStaticBackground(getResponsiveConfig(configRef.current, width, height));

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
      };
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [simulationEnabled]);

  function updateConfig(key: keyof SimulationConfig, value: number | boolean) {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="absolute inset-0">
      <canvas
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-[#f5f4ef] dark:bg-neutral-900"
        ref={canvasRef}
      />

      <div className="pointer-events-auto absolute bottom-4 right-4 z-30">
        <div className="flex items-center justify-end gap-2">
          <div className="group relative">
            <button
              aria-describedby={
                simulationEnabled ? undefined : "simulation-play-tooltip"
              }
              aria-label={
                simulationEnabled ? "Turn off simulation" : "Turn on simulation"
              }
              aria-pressed={!simulationEnabled}
              className="grid size-10 place-items-center border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-secondary"
              onClick={() => {
                setSimulationEnabled((current) => !current);
                setSettingsOpen(false);
              }}
              type="button"
            >
              {simulationEnabled ? (
                <Pause className="size-4" aria-hidden="true" />
              ) : (
                <Play className="size-4" aria-hidden="true" />
              )}
            </button>
            {!simulationEnabled ? (
              <div
                className="pointer-events-none absolute bottom-12 right-0 w-56 border border-border bg-card px-3 py-2 text-xs leading-5 text-foreground opacity-0 shadow-xl transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                id="simulation-play-tooltip"
                role="tooltip"
              >
                Start an interactive boid simulation on the home screen.
              </div>
            ) : null}
          </div>
          <button
            aria-expanded={settingsOpen}
            aria-label="Simulation settings"
            className="grid size-10 place-items-center border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-secondary"
            onClick={() => setSettingsOpen((current) => !current)}
            type="button"
          >
            {settingsOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Settings className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {settingsOpen ? (
          <div className="absolute bottom-12 right-0 w-[min(calc(100vw-2rem),20rem)] border border-border bg-card p-4 text-foreground shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Boid controls
                </p>
                <h2 className="mt-1 text-base font-semibold">Simulation</h2>
              </div>
              <button
                className="inline-flex items-center gap-1 border border-border px-2 py-1 text-xs transition-colors hover:bg-secondary"
                onClick={() => setConfig(defaultConfig)}
                type="button"
              >
                <RotateCcw className="size-3" aria-hidden="true" />
                Reset
              </button>
            </div>

            <div className="grid max-h-[min(60vh,28rem)] gap-3 overflow-y-auto pr-4 [scrollbar-gutter:stable]">
              <SimulationSlider
                label="Radius"
                max={5}
                min={1}
                onChange={(value) => updateConfig("boidRadius", value)}
                step={0.5}
                value={config.boidRadius}
              />
              <SimulationSlider
                label="Min speed"
                max={6}
                min={0.5}
                onChange={(value) => updateConfig("minSpeed", value)}
                step={0.1}
                value={config.minSpeed}
              />
              <SimulationSlider
                label="Max speed"
                max={8}
                min={1}
                onChange={(value) => updateConfig("maxSpeed", value)}
                step={0.1}
                value={config.maxSpeed}
              />
              <SimulationSlider
                label="Base angle"
                max={135}
                min={-45}
                onChange={(value) => updateConfig("baseAngle", value)}
                suffix="°"
                value={config.baseAngle}
              />
              <SimulationSlider
                label="Angle spread"
                max={45}
                min={0}
                onChange={(value) => updateConfig("angleSpread", value)}
                suffix="°"
                value={config.angleSpread}
              />
              <SimulationSlider
                label="Avoid radius"
                max={180}
                min={0}
                onChange={(value) => updateConfig("avoidRadius", value)}
                value={config.avoidRadius}
              />
              <SimulationSlider
                label="Near strength"
                max={0.4}
                min={0}
                onChange={(value) => updateConfig("mouseStrengthNear", value)}
                step={0.01}
                value={config.mouseStrengthNear}
              />
              <SimulationSlider
                label="Far strength"
                max={0.12}
                min={0}
                onChange={(value) => updateConfig("mouseStrengthFar", value)}
                step={0.005}
                value={config.mouseStrengthFar}
              />
              <SimulationSlider
                label="Return"
                max={0.2}
                min={0}
                onChange={(value) => updateConfig("returnStrength", value)}
                step={0.01}
                value={config.returnStrength}
              />
              <SimulationSlider
                label="Past distance"
                max={120}
                min={0}
                onChange={(value) => updateConfig("pastMouseDistance", value)}
                value={config.pastMouseDistance}
              />
              <SimulationSlider
                label="Past resteer"
                max={0.25}
                min={0}
                onChange={(value) =>
                  updateConfig("pastMouseResteerStrength", value)
                }
                step={0.01}
                value={config.pastMouseResteerStrength}
              />
              <SimulationSlider
                label="Trail"
                max={120}
                min={5}
                onChange={(value) => updateConfig("trailOpacity", value)}
                value={config.trailOpacity}
              />
              <SimulationSlider
                label="Grid opacity"
                max={0.3}
                min={0}
                onChange={(value) => updateConfig("gridOpacity", value)}
                step={0.01}
                value={config.gridOpacity}
              />
              <label className="flex items-center justify-between border border-border bg-background px-3 py-2 text-xs">
                <span className="text-muted-foreground">Draw grid</span>
                <input
                  checked={config.drawGrid}
                  onChange={(event) =>
                    updateConfig("drawGrid", event.target.checked)
                  }
                  type="checkbox"
                />
              </label>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
