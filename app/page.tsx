import { ArrowRight, BriefcaseBusiness, Code2 } from "lucide-react";
import Link from "next/link";

import { BlogPreviewCard } from "@/components/blog-preview-card";
import { BoidHeroBackground } from "@/components/boid-hero-background";
import { ContactButton } from "@/components/contact-button";
import { FadeIn } from "@/components/fade-in";
import { ProjectCarousel } from "@/components/project-carousel";
import { Button } from "@/components/ui/button";
import { PROFILE_COPY, SITE } from "@/lib/constants";
import {
  coursework,
  courseworkYears,
  getCourseworkYearLabel,
} from "@/lib/coursework";
import { getBlogPosts, getProjects } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);
  const featuredProjects = projects.slice(0, 6);
  const latestPost = posts[0];

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border bg-background text-foreground">
        <BoidHeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-background/20" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl content-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <FadeIn className="max-w-3xl">
            <p className="hero-text-shadow mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {SITE.role}
            </p>
            <h1 className="hero-text-shadow text-balance text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              {SITE.name}
            </h1>
            <p className="hero-text-shadow mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              {PROFILE_COPY.shortIntro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="hero-control-shadow" size="lg">
                <Link href="/projects">
                  View projects <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <ContactButton
                className="hero-control-shadow"
                label="Contact me"
                size="lg"
                variant="secondary"
              />
              <Button
                asChild
                className="hero-button-surface hero-control-shadow"
                size="lg"
                variant="outline"
              >
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="grid content-center gap-4">
            <div className="grid grid-cols-2 border border-border bg-card/85 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-sm">
              <div className="border-b border-r border-border p-5">
                <p className="text-3xl font-semibold">UBC</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  2nd Year - Computer Engineering
                </p>
              </div>
              <div className="p-5">
                <p className="text-3xl font-semibold">BC</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {SITE.location}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <ContactButton
                className="hero-button-surface hero-control-shadow"
                label="Email"
                size="sm"
                variant="outline"
              />
              <Button
                asChild
                className="hero-button-surface hero-control-shadow"
                variant="outline"
                size="sm"
              >
                <Link href={SITE.github} target="_blank" rel="noreferrer">
                  GitHub <Code2 aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                className="hero-button-surface hero-control-shadow"
                variant="outline"
                size="sm"
              >
                <Link href={SITE.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <BriefcaseBusiness aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Recent work
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Project Highlight</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/projects">
                All projects <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ProjectCarousel projects={featuredProjects} />
        </div>
      </section>

      <section className="border-b border-border bg-secondary/25">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Academic work
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Coursework</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              A compact index of courses across academic years. The full
              coursework browser includes labs, projects, and reflections.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/coursework">
                Browse coursework <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {courseworkYears.map((year) => {
              const courses = coursework.filter((course) => course.year === year);

              return (
                <div
                  className="border border-border bg-card p-4"
                  key={year}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold">
                      {getCourseworkYearLabel(year)}
                    </h3>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {courses.length} courses
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {courses.map((course) => (
                      <Link
                        className="group border border-border bg-background p-3 transition-colors hover:border-accent/60 hover:bg-secondary"
                        href="/coursework"
                        key={course.code}
                      >
                        <span className="block font-semibold text-foreground group-hover:text-accent">
                          {course.code}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                          {course.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Latest writing
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Blog Highlight</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Notes on technical projects, algorithms, browser experiments, and
              the decisions behind the builds.
            </p>
          </div>
          {latestPost ? <BlogPreviewCard post={latestPost} /> : null}
        </div>
      </section>
    </div>
  );
}
