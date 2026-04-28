import type { Metadata } from "next";

import { CourseworkBrowser } from "@/components/coursework-browser";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Coursework",
  description:
    "Browsable coursework by year, course, projects, and labs from Daniel Litvak.",
};

export default function CourseworkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Coursework
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Projects and labs from engineering coursework.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Browse by academic year, then drill into each course to see the
          projects, labs, tools, and concepts connected to that class.
        </p>
      </FadeIn>

      <div className="mt-12">
        <CourseworkBrowser />
      </div>
    </div>
  );
}
