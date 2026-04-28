import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectEulerSolutions } from "@/lib/project-euler-solutions";

export const metadata: Metadata = {
  title: "Project Euler Practice",
  description:
    "Java Project Euler practice solutions by Daniel Litvak, shown from the local project archive.",
};

export default function ProjectEulerPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-8">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" /> Projects
          </Link>
        </Button>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Local Java Archive
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Project Euler Practice
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          A compact code showcase for the local Java practice folder. The
          practice problems run as Java CLI programs locally, so this page keeps
          the source visible from the portfolio.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline">{projectEulerSolutions.length} files</Badge>
          <Badge variant="outline">Java</Badge>
          <Badge variant="outline">Algorithms</Badge>
          <Badge variant="outline">Math practice</Badge>
        </div>
      </FadeIn>

      <div className="mt-10 space-y-3">
        {projectEulerSolutions.map((solution) => (
          <details
            className="group border border-border bg-card text-card-foreground"
            key={solution.filename}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-semibold hover:bg-muted/50 sm:px-5">
              <span className="min-w-0">
                Problem {solution.problem}: {solution.filename}
              </span>
              <Code2
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition group-open:rotate-90"
              />
            </summary>
            <div className="border-t border-border bg-background/65 p-4 sm:p-5">
              <pre className="max-h-[32rem] overflow-auto text-xs leading-5 text-foreground/90">
                <code>{solution.source}</code>
              </pre>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
