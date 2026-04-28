import type { Metadata } from "next";

import { FadeIn } from "@/components/fade-in";
import { ProjectCarousel } from "@/components/project-carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EDUCATION, PROFILE_COPY, SITE, SKILLS } from "@/lib/constants";
import { getProjects } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "About",
  description: "About Daniel Litvak, including bio, skills, and education.",
};

const aboutFaqs = [
  {
    question: "What kind of work are you looking for?",
    answer:
      "I am looking for software, web, systems, and technical-product work where I can build practical tools and keep improving my engineering judgment.",
  },
  {
    question: "What do you like building most?",
    answer:
      "I like projects where the implementation has a model underneath it: simulations, data views, circuit tools, course utilities, and interfaces that make a technical process easier to inspect.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "I usually start by making the core behavior visible, then I tighten the data model, test the awkward cases, and polish the UI only after the workflow is clear.",
  },
];

export default async function AboutPage() {
  const projectHighlights = (await getProjects()).slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          I like making technical ideas concrete enough to use.
        </h1>
      </FadeIn>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>{PROFILE_COPY.bio}</p>
            <p>
              My strongest projects tend to start as a question: can I simulate
              this, measure it, or make it easier to reason about? That is why a
              lot of my work sits near physics, circuits, algorithms, data
              visualization, and course tools. I care about the interface
              because a project is not really finished until someone else can
              follow what it is doing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-border pb-4">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{SITE.name}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-border pb-4">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{SITE.location}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">{PROFILE_COPY.availability}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.languages.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frameworks</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.frameworks.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SKILLS.domains.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {EDUCATION.map((item) => (
              <div key={item.institution} className="border border-border p-4">
                <h2 className="font-semibold">{item.institution}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.degree}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {item.dates}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Project trail
          </p>
          <h2 className="mt-3 text-3xl font-semibold">A few things I keep returning to</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            These are the kinds of projects that shaped the portfolio: small
            visual systems, tools with a clear use case, and technical ideas
            that become easier to understand once they are interactive.
          </p>
        </div>
        <ProjectCarousel projects={projectHighlights} />
      </section>

      <section className="mt-12">
        <div className="mb-5 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Frequently Asked Questions</h2>
        </div>
        <div className="grid gap-3">
          {aboutFaqs.map((item) => (
            <details
              className="group border border-border bg-card p-4"
              key={item.question}
            >
              <summary className="cursor-pointer list-none font-semibold">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  {item.question}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
