'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  HERO,
  EDUCATION,
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  SKILL_GROUPS,
  SOCIAL_PROOF,
  EMAIL,
  CONTACT_LINKS,
  RESUME_URL,
  CALENDAR_URL,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.4,
  ease: 'easeOut',
}

function CTAButton({
  href,
  label,
  variant = 'primary',
  target,
}: {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  target?: string
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white'

  const variants = {
    primary:
      'bg-black text-white shadow-sm hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80',
    secondary:
      'bg-white text-black ring-1 ring-inset ring-black/10 hover:bg-black/5 dark:bg-black dark:text-white dark:ring-white/20 dark:hover:bg-white/10',
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
    </a>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24 pb-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <Spotlight
          className="-top-10 right-0 h-64 w-64 from-white/40 via-white/10 to-transparent blur-3xl"
          size={200}
        />
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-black dark:bg-white/10 dark:text-white">
            <span>{HERO.role}</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-black dark:text-white md:text-4xl">
              {HERO.name}
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70 md:text-xl">
              {HERO.headline}
            </p>
            <p className="text-base text-black/70 dark:text-white/60">
              {HERO.statement}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-black/60 dark:text-white/60">
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-black/70 ring-1 ring-inset ring-black/10 dark:bg-black dark:text-white/70 dark:ring-white/20">
              {HERO.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-black/70 ring-1 ring-inset ring-black/10 dark:bg-black dark:text-white/70 dark:ring-white/20">
              {HERO.availability}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={`mailto:${EMAIL}`} label="Email me" />
            <CTAButton href={RESUME_URL} target="_blank" label="Download résumé" variant="secondary" />
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-12">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              About & education snapshot
            </h2>
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              I approach complex civic and climate challenges by weaving together research, storytelling, and hands-on prototyping. My work spans spatial analysis, service design, and accessible interface engineering—always anchored in measurable community outcomes and inclusive facilitation.
            </p>
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              Outside the lab you’ll find me sketching speculative futures, mentoring first-gen technologists, and speaking about responsible innovation at student meetups.
            </p>
          </div>
          <div className="space-y-4">
            {EDUCATION.map((item) => (
              <div
                key={item.institution}
                className="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black/40"
              >
                <h3 className="text-base font-medium text-black dark:text-white">
                  {item.credential}
                </h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {item.institution} · {item.start} — {item.end}
                </p>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-6"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Projects and case studies
          </h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Selected collaborations that highlight research synthesis, prototyping, and measurable impact.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-black/40 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40"
            >
              <div className="relative overflow-hidden rounded-lg bg-black/5 dark:bg-white/10">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <a
                    className="inline-flex items-center gap-2 text-base font-medium text-black transition-colors hover:text-black/70 dark:text-white dark:hover:text-white/70"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                    <span aria-hidden className="text-sm">↗</span>
                  </a>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {project.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-black/80 dark:text-white/80">
                  {project.impact}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-md bg-black/5 px-3 py-1 text-xs font-medium text-black dark:bg-white/10 dark:text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
          Skills & tools matrix
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black/40"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                {group.category}
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-black/70 dark:text-white/70">
                {group.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-6"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Experience timeline & résumé access
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              A snapshot of internships, fellowships, and community leadership.
            </p>
          </div>
          <CTAButton href={RESUME_URL} target="_blank" label="Download full CV" variant="secondary" />
        </div>
        <div className="space-y-4">
          {WORK_EXPERIENCE.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black/40"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-base font-medium text-black dark:text-white">
                    {job.title}
                  </h3>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/70 underline-offset-2 hover:underline dark:text-white/70"
                  >
                    {job.company}
                  </a>
                </div>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {job.start} — {job.end}
                </p>
              </div>
              <p className="mt-3 text-sm text-black/70 dark:text-white/70">
                {job.summary}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70 dark:text-white/70">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-sm bg-black dark:bg-white" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black/40">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Social proof & extracurricular highlights
          </h2>
          <div className="mt-4 space-y-4">
            {SOCIAL_PROOF.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-lg border border-black/10 bg-white p-4 text-sm italic text-black/80 dark:border-white/10 dark:bg-black/40 dark:text-white/80"
              >
                “{testimonial.quote}”
                <footer className="mt-2 text-xs font-medium not-italic text-black/60 dark:text-white/60">
                  — {testimonial.name}, {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black/40">
          <h3 className="text-base font-semibold text-black dark:text-white">
            Awards & leadership
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-black/70 dark:text-white/70">
            {SOCIAL_PROOF.highlights.map((highlight) => (
              <li key={highlight.title}>
                <p className="font-medium text-black dark:text-white">
                  {highlight.title}
                </p>
                <p className="text-black/70 dark:text-white/70">{highlight.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">Writing samples & blog posts</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Field notes and reflections on coursework, research, and industry collaborations.
            </p>
          </div>
          <CTAButton href="/blog" label="Browse the archive" variant="secondary" />
        </div>
        <AnimatedBackground
          enableHover
          className="mt-6 grid gap-3 rounded-lg bg-black/5 p-2 dark:bg-white/10"
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
        >
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.uid}
              className="rounded-xl px-3 py-3 text-left"
              href={post.link}
              data-id={post.uid}
            >
              <p className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
                {post.date}
              </p>
              <h3 className="text-base font-medium text-black dark:text-white">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">{post.description}</p>
            </Link>
          ))}
        </AnimatedBackground>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                Contact methods & calendar
              </h2>
              <p className="text-sm text-black/70 dark:text-white/70">
                Prefer an intro call? Reach out via email or grab time directly on my calendar.
              </p>
            </div>
            <div className="space-y-3">
              {CONTACT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col rounded-lg border border-black/10 bg-white px-4 py-3 transition-colors hover:border-black/40 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40 dark:hover:bg-white/10"
                >
                  <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                  <span className="text-xs text-black/60 dark:text-white/60">{item.description}</span>
                </a>
              ))}
            </div>
            <CTAButton href={CALENDAR_URL} target="_blank" label="Book time on my calendar" />
          </div>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-black dark:text-white">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="How should I address you?"
                  className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/60 dark:focus:ring-white/20"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-black dark:text-white">
                Email
                <input
                  type="email"
                  name="contact-email"
                  placeholder="you@example.com"
                  className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/60 dark:focus:ring-white/20"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-medium text-black dark:text-white">
              Project or role overview
              <input
                type="text"
                name="project"
                placeholder="Tell me a sentence about what you need"
                className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/60 dark:focus:ring-white/20"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-black dark:text-white">
              Message
              <textarea
                name="message"
                rows={4}
                placeholder="Share goals, timelines, or links. I respond within two business days."
                className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/60 dark:focus:ring-white/20"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-white/80 dark:focus-visible:outline-white"
            >
              Send message
            </button>
            <p className="text-xs text-black/60 dark:text-white/60">
              Prefer email? Reach me directly at{' '}
              <a className="font-medium text-black underline-offset-2 hover:underline dark:text-white" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </form>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-xl border border-black/10 bg-black/5 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/10"
      >
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Let’s co-create resilient experiences.
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          I’m excited to collaborate with teams who value inclusive design, honest research, and measurable impact.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <CTAButton href={`mailto:${EMAIL}`} label="Start a conversation" />
          <CTAButton href={CALENDAR_URL} target="_blank" label="Schedule an intro" variant="secondary" />
        </div>
      </motion.section>
    </motion.main>
  )
}
