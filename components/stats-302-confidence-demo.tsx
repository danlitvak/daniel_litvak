"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sampleSizes = [8, 16, 32, 64];
const confidenceLevels = [
  { label: "90%", value: 0.9, z: 1.645 },
  { label: "95%", value: 0.95, z: 1.96 },
  { label: "99%", value: 0.99, z: 2.576 },
];

function createRng(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

function randomNormal(rng: () => number) {
  const u1 = Math.max(rng(), Number.EPSILON);
  const u2 = rng();

  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function buildIntervals(sampleSize: number, zScore: number) {
  const rng = createRng(sampleSize * 997 + Math.round(zScore * 1000));
  const trueMean = 50;
  const sigma = 10;
  const standardError = sigma / Math.sqrt(sampleSize);
  const margin = zScore * standardError;

  return Array.from({ length: 24 }, (_, index) => {
    const total = Array.from({ length: sampleSize }).reduce<number>(
      (sum) => sum + trueMean + sigma * randomNormal(rng),
      0,
    );
    const mean = total / sampleSize;
    const low = mean - margin;
    const high = mean + margin;

    return {
      high,
      index,
      low,
      mean,
      covered: low <= trueMean && trueMean <= high,
    };
  });
}

export function Stats302ConfidenceDemo() {
  const [sampleSize, setSampleSize] = useState(16);
  const [confidenceIndex, setConfidenceIndex] = useState(1);
  const confidence = confidenceLevels[confidenceIndex];
  const intervals = useMemo(
    () => buildIntervals(sampleSize, confidence.z),
    [confidence.z, sampleSize],
  );
  const coveredCount = intervals.filter((interval) => interval.covered).length;
  const domainMin = 38;
  const domainMax = 62;
  const trueMeanPosition = ((50 - domainMin) / (domainMax - domainMin)) * 100;

  return (
    <div className="border border-border bg-background p-4">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Interactive example
          </p>
          <h3 className="mt-1 font-semibold">Confidence interval coverage</h3>
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Sample size
            </span>
            {sampleSizes.map((size) => (
              <Button
                aria-pressed={sampleSize === size}
                key={size}
                onClick={() => setSampleSize(size)}
                size="sm"
                type="button"
                variant={sampleSize === size ? "secondary" : "outline"}
              >
                n={size}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Confidence
            </span>
            {confidenceLevels.map((level, index) => (
              <Button
                aria-pressed={confidenceIndex === index}
                key={level.label}
                onClick={() => setConfidenceIndex(index)}
                size="sm"
                type="button"
                variant={confidenceIndex === index ? "secondary" : "outline"}
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative grid gap-1 border border-border bg-secondary/35 p-3">
          <div
            className="absolute bottom-3 top-3 w-px bg-foreground/50"
            style={{ left: `${trueMeanPosition}%` }}
          />
          {intervals.map((interval) => {
            const left =
              ((interval.low - domainMin) / (domainMax - domainMin)) * 100;
            const right =
              ((interval.high - domainMin) / (domainMax - domainMin)) * 100;
            const mean =
              ((interval.mean - domainMin) / (domainMax - domainMin)) * 100;

            return (
              <div
                className="relative h-3"
                key={`${sampleSize}-${confidence.label}-${interval.index}`}
              >
                <div
                  className={cn(
                    "absolute top-1/2 h-px -translate-y-1/2",
                    interval.covered ? "bg-accent" : "bg-destructive",
                  )}
                  style={{
                    left: `${clampPercent(left)}%`,
                    width: `${Math.max(1, clampPercent(right) - clampPercent(left))}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-foreground"
                  style={{ left: `${clampPercent(mean)}%` }}
                />
              </div>
            );
          })}
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          {coveredCount} of {intervals.length} simulated intervals captured the
          true mean. Larger samples narrow the intervals; higher confidence
          widens them.
        </p>
      </div>
    </div>
  );
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}
