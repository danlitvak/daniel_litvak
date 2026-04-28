import type { Metadata } from "next";

import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { projectSections } from "@/lib/constants";
import { getProjects } from "@/lib/sanity/fetch";
import type { ProjectPreview } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Daniel Litvak, including simulations, visualizations, and machine learning experiments.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const [webApplications, ...otherProjectSections] = projectSections;
  const p5Projects = projects.filter((project) =>
    project.techStack.some((tech) => ["p5.js", "p5js"].includes(tech.toLowerCase())),
  );
  const nonP5Projects = projects.filter(
    (project) => !p5Projects.includes(project),
  );
  const webApplicationProjects = [
    ...nonP5Projects,
    ...(webApplications?.projects ?? []),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Projects
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Interactive systems, web tools, and technical experiments.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          A working index of simulations, personal tools, course-adjacent web
          apps, and smaller practice projects. Some entries are public demos;
          others are documented from local project folders until they are ready
          to publish.
        </p>
      </FadeIn>

      {p5Projects.length ? (
        <ProjectSection
          className="mt-12"
          description="Canvas-based simulation and visualization projects from the old portfolio, built around p5.js sketches and interactive browser experiments."
          projects={p5Projects}
          title="p5.js Projects"
        />
      ) : null}

      {webApplications ? (
        <ProjectSection
          className={p5Projects.length ? undefined : "mt-12"}
          description={webApplications.description}
          projects={webApplicationProjects}
          title={webApplications.title}
        />
      ) : null}

      {otherProjectSections.map((section) => (
        <ProjectSection
          description={section.description}
          key={section.title}
          projects={section.projects}
          title={section.title}
        />
      ))}
    </div>
  );
}

function ProjectSection({
  className,
  description,
  projects,
  title,
}: {
  className?: string;
  description: string;
  projects: ProjectPreview[];
  title: string;
}) {
  return (
    <section className={className ? className : "mt-14"}>
      <div className="mb-5 max-w-3xl">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
