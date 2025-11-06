'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
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
    'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'

  const variants = {
    primary:
      'bg-blue-600 text-white shadow-sm hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400',
    secondary:
      'bg-white/80 text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-white dark:bg-zinc-900/70 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-900',
  }

  return (
    <Magnetic intensity={0.25} springOptions={{ bounce: 0.2 }}>
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {label}
      </a>
    </Magnetic>
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
        className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-white/90 p-8 shadow-sm dark:border-blue-500/20 dark:bg-slate-950/60"
      >
        <Spotlight
          className="-top-10 right-0 h-64 w-64 from-blue-500/40 via-blue-400/20 to-transparent blur-3xl"
          size={200}
        />
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
            <span>{HERO.role}</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 md:text-4xl">
              {HERO.name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              {HERO.headline}
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              {HERO.statement}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-900/70 dark:ring-zinc-800">
              {HERO.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-900/70 dark:ring-zinc-800">
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
        className="rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
      >
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-12">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              About & education snapshot
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              I approach complex civic and climate challenges by weaving together research, storytelling, and hands-on prototyping. My work spans spatial analysis, service design, and accessible interface engineering—always anchored in measurable community outcomes and inclusive facilitation.
            </p>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Outside the lab you’ll find me sketching speculative futures, mentoring first-gen technologists, and speaking about responsible innovation at student meetups.
            </p>
          </div>
          <div className="space-y-4">
            {EDUCATION.map((item) => (
              <div
                key={item.institution}
                className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {item.credential}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.institution} · {item.start} — {item.end}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
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
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Projects and case studies
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Selected collaborations that highlight research synthesis, prototyping, and measurable impact.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col gap-3 rounded-3xl border border-zinc-200/80 bg-white/80 p-4 shadow-sm transition hover:border-blue-200/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-blue-500/20"
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
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
                    className="inline-flex items-center gap-2 text-base font-medium text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-300"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                    <span aria-hidden className="text-sm">↗</span>
                  </a>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {project.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {project.impact}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-200"
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
        className="rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60"
      >
        <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Skills & tools matrix
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {group.category}
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
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
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Experience timeline & résumé access
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              A snapshot of internships, fellowships, and community leadership.
            </p>
          </div>
          <CTAButton href={RESUME_URL} target="_blank" label="Download full CV" variant="secondary" />
        </div>
        <div className="space-y-4">
          {WORK_EXPERIENCE.map((job) => (
            <div
              key={job.id}
              className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/60"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                    {job.title}
                  </h3>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    {job.company}
                  </a>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {job.start} — {job.end}
                </p>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                {job.summary}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-500/80" />
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
        <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Social proof & extracurricular highlights
          </h2>
          <div className="mt-4 space-y-4">
            {SOCIAL_PROOF.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm italic text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
              >
                “{testimonial.quote}”
                <footer className="mt-2 text-xs font-medium not-italic text-zinc-500 dark:text-zinc-400">
                  — {testimonial.name}, {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/60">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Awards & leadership
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            {SOCIAL_PROOF.highlights.map((highlight) => (
              <li key={highlight.title}>
                <p className="font-medium text-zinc-800 dark:text-zinc-100">
                  {highlight.title}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">{highlight.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Writing samples & blog posts</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Field notes and reflections on coursework, research, and industry collaborations.
            </p>
          </div>
          <CTAButton href="/blog" label="Browse the archive" variant="secondary" />
        </div>
        <AnimatedBackground
          enableHover
          className="mt-6 grid gap-3 rounded-2xl bg-zinc-100 p-2 dark:bg-zinc-900"
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
        >
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.uid}
              className="rounded-xl px-3 py-3 text-left"
              href={post.link}
              data-id={post.uid}
            >
              <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {post.date}
              </p>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{post.description}</p>
            </Link>
          ))}
        </AnimatedBackground>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-3xl border border-zinc-200/70 bg-white/90 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Contact methods & calendar
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Prefer an intro call? Reach out via email or grab time directly on my calendar.
              </p>
            </div>
            <div className="space-y-3">
              {CONTACT_LINKS.map((item) => (
                <Magnetic key={item.label} intensity={0.25} springOptions={{ bounce: 0.2 }}>
                  <a
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 transition-colors hover:border-blue-200 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-500/20 dark:hover:bg-zinc-900"
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.description}</span>
                  </a>
                </Magnetic>
              ))}
            </div>
            <CTAButton href={CALENDAR_URL} target="_blank" label="Book time on my calendar" />
          </div>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="How should I address you?"
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
                <input
                  type="email"
                  name="contact-email"
                  placeholder="you@example.com"
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Project or role overview
              <input
                type="text"
                name="project"
                placeholder="Tell me a sentence about what you need"
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message
              <textarea
                name="message"
                rows={4}
                placeholder="Share goals, timelines, or links. I respond within two business days."
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/30"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Send message
            </button>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Prefer email? Reach me directly at{' '}
              <a className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </form>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-3xl border border-blue-100/60 bg-blue-50/80 p-8 text-center shadow-sm dark:border-blue-500/20 dark:bg-blue-500/10"
      >
        <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-200">
          Let’s co-create resilient experiences.
        </h2>
        <p className="mt-2 text-sm text-blue-900/70 dark:text-blue-200/80">
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
