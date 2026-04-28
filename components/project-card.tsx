import { Code2, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HoverCard } from "@/components/hover-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ProjectPreview } from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectPreview }) {
  const titleId = `project-${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
  const hasActions =
    project.liveUrl ||
    project.githubUrl ||
    project.detailUrl ||
    project.liveNote ||
    project.codeNote;

  return (
    <HoverCard>
      <Card
        aria-labelledby={titleId}
        className="project-card-shell group relative aspect-square w-full overflow-hidden bg-card"
        role="article"
      >
        <div className="absolute inset-0 bg-secondary">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105 group-focus-within:scale-105"
            />
          ) : (
            <div className="surface-grid h-full" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />

        <div
          aria-hidden="true"
          className="project-card-title absolute inset-x-0 bottom-0 z-10 p-5 text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Project
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight">
            {project.title}
          </h3>
        </div>

        <div className="project-card-details absolute inset-0 z-20 flex flex-col justify-end overflow-y-auto bg-card/55 p-5 shadow-2xl backdrop-blur-[2px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Details
          </p>
          <h3 id={titleId} className="mt-2 text-xl font-semibold leading-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-foreground/85">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          {hasActions ? (
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              {project.liveUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-accent/45 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Link
                    href={project.liveUrl}
                    target={isExternalUrl(project.liveUrl) ? "_blank" : undefined}
                    rel={isExternalUrl(project.liveUrl) ? "noreferrer" : undefined}
                  >
                    Live <ExternalLink aria-hidden="true" />
                  </Link>
                </Button>
              ) : project.liveNote ? (
                <span className="inline-flex min-h-8 min-w-0 items-center rounded-none border border-border/80 bg-background/55 px-3 py-1 text-left text-xs font-semibold text-foreground/75">
                  Live: {project.liveNote}
                </span>
              ) : null}

              {project.detailUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-border/80 bg-background/60 text-foreground hover:bg-foreground hover:text-background"
                >
                  <Link href={project.detailUrl}>
                    Details <FileText aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}

              {project.githubUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary/25 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code <Code2 aria-hidden="true" />
                  </Link>
                </Button>
              ) : project.codeNote ? (
                <span className="inline-flex min-h-8 min-w-0 items-center rounded-none border border-border/80 bg-background/55 px-3 py-1 text-left text-xs font-semibold text-foreground/75">
                  Code: {project.codeNote}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </Card>
    </HoverCard>
  );
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}
