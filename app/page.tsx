'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ContactModal } from '../components/ContactModal'
import {
  HERO,
  EDUCATION,
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  SKILL_GROUPS,
  CONTACT_LINKS,
  CAROUSEL_ITEMS,
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
  onClick,
}: {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  target?: string
  onClick?: () => void
}) {
  const baseClasses =
    'inline-flex items-center justify-center px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white'

  const variants = {
    primary:
      'bg-black text-white shadow-sm hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80',
    secondary:
      'bg-white text-black ring-1 ring-inset ring-black/10 hover:bg-black/5 dark:bg-black dark:text-white dark:ring-white/20 dark:hover:bg-white/10',
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
        {label}
      </button>
    )
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
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  const totalItems = CAROUSEL_ITEMS.length

  const clampDisplayIndex = useCallback(
    (index: number) => {
      if (index < 0) return 0
      if (index > totalItems + 1) return totalItems + 1
      return index
    },
    [totalItems],
  )

  const carouselItems = useMemo(
    () => [CAROUSEL_ITEMS[totalItems - 1], ...CAROUSEL_ITEMS, CAROUSEL_ITEMS[0]],
    [totalItems],
  )

  const activeIndex = useMemo(() => {
    const normalized = (displayIndex - 1 + totalItems) % totalItems
    return normalized
  }, [displayIndex, totalItems])

  const activeItem = useMemo(() => CAROUSEL_ITEMS[activeIndex], [activeIndex])

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setDisplayIndex((prev) => clampDisplayIndex(prev + 1))
    }, 4200)

    return () => window.clearInterval(timer)
  }, [clampDisplayIndex, isPaused])

  useEffect(() => {
    if (isAnimating) return

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsAnimating(true))
    })

    return () => window.cancelAnimationFrame(id)
  }, [isAnimating])

  const handleSelect = (index: number) => {
    if (isPaused && index === activeIndex) {
      setIsPaused(false)
      return
    }

    setDisplayIndex(clampDisplayIndex(index + 1))
    setIsPaused(true)
  }

  const handleResume = () => setIsPaused(false)

  const handleStep = (direction: 1 | -1) => {
    setDisplayIndex((prev) => clampDisplayIndex(prev + direction))
    setIsPaused(true)
  }

  const handleTransitionEnd = () => {
    if (displayIndex === 0) {
      setIsAnimating(false)
      setDisplayIndex(totalItems)
    } else if (displayIndex === totalItems + 1) {
      setIsAnimating(false)
      setDisplayIndex(1)
    }
  }

  return (
    <motion.main
      className="space-y-12 pb-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="about"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative space-y-4 scroll-mt-28"
      >
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-black dark:bg-white/10 dark:text-white">
            <span>{HERO.role}</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-black dark:text-white md:text-4xl">
              {HERO.name}
            </h1>
            <p className="text-lg text-black/80 dark:text-white/80 md:text-xl">
              {HERO.headline}
            </p>
            <p className="text-base text-black/70 dark:text-white/70">
              {HERO.statement}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-black/60 dark:text-white/60">
            <span className="inline-flex items-center gap-2 bg-white px-3 py-1 text-black/70 ring-1 ring-inset ring-black/10 dark:bg-black dark:text-white/70 dark:ring-white/20">
              {HERO.location}
            </span>
            <span className="inline-flex items-center gap-2 bg-white px-3 py-1 text-black/70 ring-1 ring-inset ring-black/10 dark:bg-black dark:text-white/70 dark:ring-white/20">
              {HERO.availability}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <CTAButton href="/contact?open=true" label="Email me" onClick={() => setIsContactOpen(true)} />
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:gap-10">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              About & education snapshot
            </h2>
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              I’m Daniel Litvak, a front end developer and technical adviser from Richmond, BC. I build dashboards, admin portals, and interactive simulations that connect JavaScript, Python, and embedded systems work on Arduino and microarchitecture projects.
            </p>
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              Recent highlights include co-leading UBC Bionics web development, advising Sky AI on real-time data visualizations, and tutoring STEM students while pursuing my BASc in Computer Engineering at UBC.
            </p>
          </div>
          <div className="space-y-3">
            {EDUCATION.map((item) => (
              <div
                key={item.institution}
                className="rounded-none border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-black/40"
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
        id="projects"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-4 scroll-mt-28"
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-black dark:text-white">Projects</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            My skills in action. Click to learn more.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => {
            const isExternal = project.link.startsWith('http')
            const hasVideo = Boolean(project.video?.trim())
            const cardContent = (
              <>
                <div className="relative aspect-video w-full bg-black/5 dark:bg-white/10">
                  {hasVideo ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-black/40 via-black/30 to-black/10 text-xs font-medium uppercase tracking-wide text-white/70">
                      Preview unavailable
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/25 to-transparent" aria-hidden />
                  <div className="absolute right-3 top-3 flex flex-col items-end text-right">
                    <span className="text-base font-semibold text-white transition-colors group-hover:text-white/80">
                      {project.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <p className="text-base font-semibold leading-snug text-black dark:text-white">
                    {project.description}
                  </p>
                  <p className="text-xs text-black/60 dark:text-white/60">{project.impact}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-none bg-black/5 px-3 py-1 text-xs font-medium text-black dark:bg-white/10 dark:text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )

            return isExternal ? (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-none border border-black/10 bg-white shadow-sm transition hover:border-black/40 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40"
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={project.id}
                href={project.link}
                className="group flex flex-col overflow-hidden rounded-none border border-black/10 bg-white shadow-sm transition hover:border-black/40 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40"
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      </motion.section>

      <motion.section
        id="skills"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm scroll-mt-28 dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="text-lg mb-4 font-semibold text-black dark:text-white">Skills & tools matrix</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-none border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-black/40"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-black/80 dark:text-white/80">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-none bg-black/5 px-3 py-1 font-semibold text-black dark:bg-white/10 dark:text-white"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="experience"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-black dark:text-white">Experience</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Resume Available upon request.
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-3">
          {WORK_EXPERIENCE.map((job) => (
            <div
              key={job.id}
              className="rounded-none border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black/40"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-semibold text-black dark:text-white">{job.title}</h3>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-black/70 hover:text-black/90 dark:text-white/70 dark:hover:text-white"
                  >
                    {job.company}
                  </a>
                </div>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {job.start} - {job.end}
                </p>
              </div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{job.summary}</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-4 text-sm text-black/70 marker:text-black dark:text-white/70 dark:marker:text-white">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-black/70 dark:text-white/70">
                {job.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-none border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-black"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="writing"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm scroll-mt-28 dark:border-white/10 dark:bg-white/5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">Writing samples & blog posts</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Blogs about the work I do.
            </p>
          </div>
          <CTAButton href="/blog" label="Browse" variant="secondary" />
        </div>
        <div className="mt-4 divide-y divide-black/10 border border-black/10 dark:divide-white/10 dark:border-white/10">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.uid}
              className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              href={post.link}
              data-id={post.uid}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
                <span>{post.date}</span>
                <span className="text-[11px]">Read post</span>
              </div>
              <h3 className="text-base font-medium text-black dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70">{post.description}</p>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="gallery"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-black dark:text-white">Project image carousel</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Auto-scrolls through highlights. Click any frame to pause and read the story.
            </p>
          </div>
          {isPaused && (
            <button
              type="button"
              onClick={handleResume}
              className="inline-flex items-center justify-center rounded-none border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:border-black/40 hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
            >
              Resume autoplay
            </button>
          )}
        </div>

        <div className="mt-4 space-y-4">
          <div className="relative overflow-hidden rounded-none border border-black/10 bg-black/5 dark:border-white/10 dark:bg-black/40">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/80 px-2.5 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-white dark:border-white/20 dark:bg-black/70 dark:text-white dark:hover:bg-black"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/80 px-2.5 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-white dark:border-white/20 dark:bg-black/70 dark:text-white dark:hover:bg-black"
              aria-label="Next image"
            >
              ›
            </button>
            <div
              className={`flex h-full w-full ${isAnimating ? 'transition-transform duration-700 ease-out' : ''}`}
              style={{ transform: `translateX(-${displayIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {carouselItems.map((item, index) => {
                const normalizedIndex = (index - 1 + totalItems) % totalItems
                return (
                  <button
                    key={`${item.id}-${index}`}
                    type="button"
                    onClick={() => handleSelect(normalizedIndex)}
                    className="relative aspect-video w-full shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" aria-hidden />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-left text-white">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Project</p>
                        <p className="text-base font-semibold leading-tight">{item.title}</p>
                      </div>
                      <span
                        className="rounded-none bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur"
                      >
                        {normalizedIndex + 1}/{CAROUSEL_ITEMS.length}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-1 text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
              {activeItem.title}
            </p>
            <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{activeItem.description}</p>
          </div>

        </div>
      </motion.section>

      <motion.section
        id="contact"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-white p-6 shadow-sm scroll-mt-28 dark:border-white/10 dark:bg-white/5"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-black dark:text-white">Contact methods</h2>
            <p className="text-sm text-black/70 dark:text-white/70">
              Reach out for collaboration invites, portfolio walk-throughs, or quick Q&A.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {CONTACT_LINKS.map((item) => {
              const isEmailModalLink = item.link.startsWith('/contact')

              if (isEmailModalLink) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="flex flex-col justify-between rounded-none border border-black/10 bg-white px-4 py-3 text-left transition-colors hover:border-black/40 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40 dark:hover:bg-white/10"
                  >
                    <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                    <span className="text-xs text-black/60 dark:text-white/60">{item.description}</span>
                  </button>
                )
              }

              return (
                <a
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col justify-between rounded-none border border-black/10 bg-white px-4 py-3 transition-colors hover:border-black/40 hover:bg-black/5 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40 dark:hover:bg-white/10"
                >
                  <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                  <span className="text-xs text-black/60 dark:text-white/60">{item.description}</span>
                </a>
              )
            })}
          </div>
          <p className="text-xs text-black/60 dark:text-white/60">
            Prefer email? Open the contact form{' '}
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="font-medium text-black underline-offset-2 hover:underline dark:text-white"
            >
              here
            </button>
            .
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-black/5 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/10"
      >
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Let’s co-create resilient experiences.
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          I’m excited to collaborate with teams who value inclusive design, honest research, and measurable impact.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <CTAButton href="/contact?open=true" label="Start a conversation" onClick={() => setIsContactOpen(true)} />
        </div>
      </motion.section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </motion.main>
  )
}
