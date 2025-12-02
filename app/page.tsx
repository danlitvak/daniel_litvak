'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ContactModal } from '../components/ContactModal'
import {
  HERO,
  EDUCATION,
  FEATURED_PROJECTS,
  MORE_PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  SKILL_GROUPS,
  CONTACT_LINKS,
  CAROUSEL_ITEMS,
  EMAIL,
  type Project,
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
  const [copiedEmail, setCopiedEmail] = useState(false)

  const totalItems = CAROUSEL_ITEMS.length

  const renderProjectCard = (project: Project) => {
    const isExternal = project.link.startsWith('http')
    const hasVideo = Boolean(project.video?.trim())
    const hasImage = Boolean((project as { image?: string }).image?.trim())
    const cardContent = (
      <>
        <div className="relative aspect-[16/7] w-full bg-black/5 dark:bg-white/10">
          {hasVideo ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : hasImage ? (
            <Image
              src={(project as { image?: string }).image as string}
              alt={`${project.name} preview`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
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
                className="inline-flex items-center gap-1 rounded-none bg-black/5 p-1 text-xs font-medium text-black dark:bg-white/10 dark:text-white"
              >
                {tool === 'p5.js' ? (
                  <>
                    <svg
                      viewBox="0 0 34 34"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 translate-y-[1px]"
                    >
                      <path
                        fill="currentColor"
                        d="M16.909,10.259l8.533-2.576l1.676,5.156l-8.498,2.899l5.275,7.48 l-4.447,3.225l-5.553-7.348L8.487,26.25l-4.318-3.289l5.275-7.223L0.88,12.647l1.678-5.16l8.598,2.771V1.364h5.754V10.259z"
                      />
                    </svg>
                    <span>p5.js</span>
                  </>
                ) : tool === 'JavaScript' ? (
                  <>
                    <svg
                      viewBox="0 0 256 256"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <defs>
                        <mask id="js-mask" maskUnits="userSpaceOnUse">
                          <rect width="256" height="256" fill="white" />
                          <path
                            d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                            fill="black"
                          />
                        </mask>
                      </defs>
                      <rect width="256" height="256" fill="currentColor" mask="url(#js-mask)" />
                    </svg>
                    <span>JavaScript</span>
                  </>
                ) : tool === 'SystemVerilog' ? (
                  <>
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]"
                    >
                      <path
                        fill="currentColor"
                        d="M13.264 17.289a4.4 4.4 0 00-.9-1.514 13.78 13.78 0 00-1.858-1.575 8.924 8.924 0 01-2.006-1.781 1.969 1.969 0 01-.337-1.113 2.226 2.226 0 01.5-1.434 1.6 1.6 0 011.323-.642 1.645 1.645 0 011.323.648 4.51 4.51 0 01.78 2.138l.035.223.28.079a.417.417 0 00.22-.076l.121-.077.024-.187c.011-.09.028-.279.043-.884l.032-1.034c0-.08-.021-.384-.065-.913l-.013-.156L12.67 8.9a3.4 3.4 0 00-.955-.727 3.607 3.607 0 00-1.475-.279 3.058 3.058 0 00-2.511 1.192 4.641 4.641 0 00-.96 2.963 4.924 4.924 0 00.278 1.72 5.916 5.916 0 001.066 1.731 13.679 13.679 0 001.821 1.529 6.79 6.79 0 011.747 1.7 2.787 2.787 0 01.394 1.459 3.136 3.136 0 01-.263 1.2 2.143 2.143 0 01-.724.956 1.78 1.78 0 01-1.046.34 2.064 2.064 0 01-1.721-.866 4.236 4.236 0 01-.83-2.3 1.116 1.116 0 00-.118-.475.346.346 0 00-.638.052 2.418 2.418 0 00-.093.813c-.005.567-.045 1.3-.117 2.18q-.018.221-.018.362a1.1 1.1 0 00.2.642 2.055 2.055 0 00.8.567 4.76 4.76 0 002.142.512 3.486 3.486 0 002.093-.583 3.972 3.972 0 001.159-1.542 6.5 6.5 0 00.476-2.484 5.781 5.781 0 00-.335-1.927z"
                      />
                      <path
                        fill="currentColor"
                        d="M25.409 8.4l-.147-.073a1.567 1.567 0 00-.671-.1l-3.6.037-.06.234-.039.216a.808.808 0 00.136.435l.063.1.682.119c.22.036.42.078.571.122a.535.535 0 01.237.186.279.279 0 01.046.113 20.929 20.929 0 01-.762 3.739c-.046.246-.073.391-.081.426L21.234 16.1q-.42 1.594-.834 3.009l-.3 1.043c-.364-1.342-.731-2.659-1.106-3.96l-1.63-5.367a4.326 4.326 0 01-.239-1.242c.017-.018.122-.112.539-.164a4.849 4.849 0 01.71-.05h.064a.45.45 0 00.452-.288l.059-.43-.032-.1a.525.525 0 00-.185-.268l-.1-.038a15.324 15.324 0 00-.5-.018c-.175-.005-.348-.006-.529-.006-.894 0-1.526.012-1.883.035-.09.007-.173.011-.248.011h-.256q-.647-.023-1.295-.023h-.167l-.153.536.026.124a.724.724 0 00.205.386 1.366 1.366 0 00.367.145 3.133 3.133 0 01.824.341 3.009 3.009 0 01.317.712l2.435 7.93c.4 1.28.915 3.1 1.538 5.422l.049.181.133.041a.848.848 0 00.252.044.477.477 0 00.306-.146l.077-.069.26-1.122c.269-1.2.733-2.941 1.381-5.167l2.08-7.407a1.44 1.44 0 01.252-.522 1.652 1.652 0 01.712-.208 1.43 1.43 0 00.4-.131l.1-.049.046-.14a1.279 1.279 0 00.069-.436z"
                      />
                      <path
                        fill="currentColor"
                        d="M25.625 23.961c-4.462 6.4-18.148 5.853-20.732-1.52H2C4.062 32.043 21.439 32.439 25.625 23.961zM30 9.559c-2.062-9.6-19.439-10-23.625-1.52 4.462-6.4 18.148-5.853 20.732 1.52z"
                      />
                    </svg>
                    <span>SystemVerilog</span>
                  </>
                ) : tool === 'Java' ? (
                  <>
                    <svg
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]"
                    >
                      <path
                        fill="currentColor"
                        d="M193.918 208.369c-4.729-10.456-6.849-22.652-3.236-33.731 3.612-11.327 11.703-20.413 19.794-28.878 22.525-22.531 50.285-39.085 72.316-61.986 12.197-12.573 22.278-27.634 25.762-44.937 2.864-12.695 1.496-25.764-1.117-38.337 11.7 13.319 15.559 32.363 12.197 49.541-3.608 19.292-14.316 36.344-26.886 51.031-10.081 11.827-21.659 22.282-33.731 31.993-14.065 11.327-27.88 23.524-36.716 39.457-7.472 12.943-9.215 28.876-4.11 42.942 8.341 24.146 27.756 42.071 38.338 64.848-11.703-10.332-23.152-21.036-33.86-32.361-10.676-11.675-21.258-24.369-28.229-39.307zm63.48-18.921c-2.115 19.792 8.213 38.462 20.539 53.151 5.972 6.596 11.076 14.687 11.323 23.899.251 12.318-6.716 23.774-15.684 31.861 2.119-.246 3.612-2.115 5.355-3.11 13.443-8.589 26.385-19.418 32.982-34.227 4.357-10.083 3.362-22.034-2.362-31.371-6.724-10.953-15.559-20.662-20.786-32.61-2.867-6.721-3.862-14.562-1.496-21.657 3.114-9.583 9.834-17.426 16.93-24.272 19.54-18.544 43.189-31.743 65.844-46.179-28.629 8.214-56.883 19.542-81.03 37.343-14.579 10.786-28.766 26.717-30.883 46.507zM393.447 283.052c13.568.748 26.882 10.704 29.374 24.397 2.366 11.825-3.358 23.524-10.705 32.485-12.075 14.438-28.382 24.771-44.807 33.609-1.622.991-2.99 2.237-4.235 3.608 21.659-5.478 43.314-13.689 60.867-27.756 9.705-8.091 18.294-18.799 20.163-31.619 1.743-11.076-2.86-22.528-11.077-29.871-9.96-9.09-24.021-12.448-37.218-10.704-7.593.995-15.931 2.613-21.158 8.961 6.009-2.816 12.103-5.308 18.579-4.685zm-270.227 35.595c16.303 4.357 33.108 5.603 49.787 6.724 14.936.995 29.875 1.246 44.937 1.12 38.833-.619 77.916-3.236 116.003-11.699 3.608-.87 7.593-1.493 10.833-3.733 6.347-4.11 13.313-7.347 20.162-10.583-30.995 4.979-62.113 9.215-93.478 11.205-31.74 1.991-63.731 3.236-95.593 1.121-9.086-.87-18.423-1.371-26.886-4.858-1.994-.87-4.733-2.609-3.738-5.227 1.869-3.361 5.603-4.977 8.839-6.72 13.694-6.473 28.629-10.081 43.193-14.313-25.021-.376-49.916 5.971-72.814 15.806-5.105 2.491-10.83 4.481-14.936 8.714-1.622 1.739-1.622 4.732.247 6.222 4.168 3.255 9.144 4.748 13.877 6.115zm201.644 34.233c-21.784 3.859-43.694 7.472-65.726 8.589-24.147 1.618-48.294.247-72.191-2.241-4.604-.623-9.211-1.368-13.317-3.483-2.116-1.246-4.231-3.236-4.106-5.854.247-4.106 3.73-6.967 6.222-9.956-7.715 2.739-15.434 5.599-21.906 10.708-2.742 2.116-5.478 5.474-4.733 9.208 1.125 4.356 5.356 6.97 9.09 8.96 9.208 4.733 19.54 6.846 29.625 8.714 25.511 4.11 51.527 4.235 77.167 2.488 27.141-2.115 54.148-6.594 80.411-14.313-6.584-2.785-13.68-6.648-19.652-12.247zm-136.796 43.071c-6.97 1.99-14.066 4.357-19.79 8.957-2.868 2.241-5.105 6.104-3.734 9.713 1.743 4.604 6.1 7.347 10.203 9.705 10.708 5.854 22.78 8.589 34.604 10.708 26.765 4.229 54.27 3.608 80.908-1.12 15.806-2.989 31.615-7.221 46.301-13.815-9.584-3.984-18.917-8.467-27.878-13.693-15.559 2.738-31.246 5.603-47.178 6.598-21.032 1.618-42.319-.125-63.355-2.738-4.98-1.121-11.202-1.618-14.563-5.976 2.369-2.273 6.35-4.887 8.59-6.999zm170.277 80.031c17.424-3.604 34.977-7.719 50.908-15.806 4.976-2.867 11.076-5.979 12.698-11.95.87-5.725-5.105-8.714-9.337-11.08 2.613 2.993 4.356 7.347 1.74 10.83-4.357 5.853-11.821 8.091-18.42 10.332-20.66 5.85-42.072 8.216-63.355 10.582-56.385 5.102-113.146 6.348-169.528 1.618-18.92-1.994-38.217-4.109-56.264-10.829-2.86-1.246-7.217-2.492-7.217-6.352 1.117-3.354 4.357-5.227 7.217-6.845 12.945-6.595 27.384-10.207 41.822-11.077-4.228-2.491-9.208-2.738-14.062-2.613-12.076.373-23.9 3.483-35.349 7.347-9.834 3.604-19.916 7.59-27.76 14.811-3.111 2.735-5.971 7.962-2.739 11.699 4.98 5.353 12.699 6.72 19.54 8.338 38.338 6.599 77.171 10.328 116.011 11.699 51.903 1.232 103.806-1.01 154.467-11.97zm51.033 6.724c-23.402 7.468-47.672 11.574-71.822 14.936-41.696 5.227-83.769 6.845-125.716 5.603-25.515-.995-51.03-2.738-76.176-6.974 5.85 3.984 13.071 5.227 19.794 7.096 28.257 5.976 57.255 7.096 86.01 7.966 42.19.748 84.387-.87 125.962-7.468 19.669-3.48 39.459-7.715 57.13-16.927 9.215-4.854 18.552-12.326 20.163-23.152-5.365 5.009-18.805 9.617-31.378 13.974z"
                      />
                    </svg>
                    <span>Java</span>
                  </>
                ) : tool === 'React' ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]"
                    >
                      <path
                        fill="currentColor"
                        d="M12 10.11A1.87 1.87 0 1110.13 12 1.88 1.88 0 0112 10.11m-4.63 9.89c.63.38 2-.2 3.6-1.7a24.22 24.22 0 01-1.51-1.9A22.7 22.7 0 017.06 16c-.51 2.14-.32 3.61.31 4m.71-5.74-.29-.51a7.91 7.91 0 00-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71 0c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54 0 1.11 0 1.71 0s1.17 0 1.71 0c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7a24.22 24.22 0 011.51 1.9 22.7 22.7 0 012.4.36c.51-2.14.32-3.61-.32-4m-.7 5.74.29.51a7.91 7.91 0 00.29-.86c-.27-.06-.57-.11-.88-.16l.3.51m1.45-7c1.47.84 1.63 3.05 1 5.63 2.54.75 4.37 2 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1 5.63s-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95s-1.62-3-1-5.63c-2.54-.75-4.37-2-4.37-3.68S3.08 9.07 5.62 8.32c-.62-2.58-.46-4.79 1-5.63s3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12A22.51 22.51 0 0118 14.26c2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 18 9.74A22.51 22.51 0 0117.08 12M6.92 12A22.51 22.51 0 016 9.74c-2.1.63-3.28 1.53-3.28 2.26S3.93 13.63 6 14.26A22.51 22.51 0 016.92 12m9 2.26-.3.51c.31 0 .61-.1.88-.16a7.91 7.91 0 00-.29-.86l-.29.51M13 18.3c1.59 1.5 3 2.08 3.59 1.7s.83-1.82.32-4a22.7 22.7 0 01-2.4.36A24.22 24.22 0 0113 18.3M8.08 9.74l.3-.51c-.31 0-.61.1-.88.16a7.91 7.91 0 00.29.86l.29-.51M11 5.7C9.38 4.2 8 3.62 7.37 4s-.82 1.82-.31 4a22.7 22.7 0 012.4-.36A24.22 24.22 0 0111 5.7Z"
                      />
                    </svg>
                    <span>React</span>
                  </>
                ) : tool === 'C' ? (
                  <>
                    <svg
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 translate-y-[0.5px]"
                    >
                      <path
                        fill="#3a3a3a"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.903 3.286c.679-.381 1.515-.381 2.193 0 3.355 1.883 13.451 7.551 16.807 9.434C42.582 13.1 43 13.804 43 14.566c0 3.766 0 15.101 0 18.867 0 .762-.418 1.466-1.097 1.847-3.355 1.883-13.451 7.551-16.807 9.434-.679.381-1.515.381-2.193 0-3.355-1.883-13.451-7.551-16.807-9.434C5.418 34.899 5 34.196 5 33.434c0-3.766 0-15.101 0-18.867 0-.762.418-1.466 1.097-1.847C9.451 10.837 19.549 5.169 22.903 3.286z"
                      />
                      <path
                        fill="#7a7a7a"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.304 34.404C5.038 34.048 5 33.71 5 33.255c0-3.744 0-15.014 0-18.759 0-.758.417-1.458 1.094-1.836 3.343-1.872 13.405-7.507 16.748-9.38.677-.379 1.594-.371 2.271.008 3.343 1.872 13.371 7.459 16.714 9.331.27.152.476.335.66.576L5.304 34.404z"
                      />
                      <path
                        fill="#f4f4f4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 10c7.727 0 14 6.273 14 14s-6.273 14-14 14-14-6.273-14-14S16.273 10 24 10zm0 7c3.863 0 7 3.136 7 7 0 3.863-3.137 7-7 7s-7-3.137-7-7c0-3.864 3.136-7 7-7z"
                      />
                      <path
                        fill="#555"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M42.485 13.205c.516.483.506 1.211.506 1.784 0 3.795-.032 14.589.009 18.384.004.396-.127.813-.323 1.127L23.593 24l18.892-10.795z"
                      />
                    </svg>
                    <span>C</span>
                  </>
                ) : (
                  tool
                )}
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
        className="group flex h-full flex-col overflow-hidden rounded-none border border-black/10 bg-white shadow-sm transition hover:border-black/40 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40"
      >
        {cardContent}
      </a>
    ) : (
      <Link
        key={project.id}
        href={project.link}
        className="group flex h-full flex-col overflow-hidden rounded-none border border-black/10 bg-white shadow-sm transition hover:border-black/40 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:hover:border-white/40"
      >
        {cardContent}
      </Link>
    )
  }

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
              About & Education
            </h2>
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              I’m Daniel Litvak, an Engineer in education and a full-stack developer based in Vancouver B.C.
              I build web-based solutions, interactive simulations, embedded systems on Arduino and microarchitecture projects.
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

          <div className="flex flex-wrap justify-between items-center">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Projects
            </h2>

            <p className="text-sm text-black/60 dark:text-white/60">
              My skills in action. Click to learn more.
            </p>
          </div>


        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60 drop-shadow-[0_0_8px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]">
              Featured projects
            </h3>
            <div className="grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2">
              {FEATURED_PROJECTS.map((project) => renderProjectCard(project))}
            </div>
          </div>

          {MORE_PROJECTS.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                More projects
              </h3>
              <div className="divide-y divide-black/10 rounded-none border border-black/10 bg-white max-h-96 overflow-y-auto dark:divide-white/10 dark:border-white/10 dark:bg-black/40">
                {MORE_PROJECTS.map((project) => {
                  const isExternal = project.link.startsWith('http')
                  const content = (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-black dark:text-white">{project.name}</p>
                      <p className="text-xs text-black/70 dark:text-white/70">{project.description}</p>
                      <p className="text-xs text-black/60 dark:text-white/60">{project.impact}</p>
                    </div>
                  )

                  return isExternal ? (
                    <a
                      key={project.id}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {content}
                      <span className="text-[11px] uppercase tracking-wide text-black/60 dark:text-white/60">
                        View in legacy website
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={project.id}
                      href={project.link}
                      className="group flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {content}
                      <span className="text-[11px] uppercase tracking-wide text-black/60 dark:text-white/60">
                        View in legacy website
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
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
        className="space-y-4 scroll-mt-28"
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

        <div className="space-y-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-black/80 via-black/70 to-black/50 text-white shadow-2xl ring-1 ring-black/10 dark:from-white/15 dark:via-white/10 dark:to-white/5 dark:ring-white/10">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/85 px-2.5 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-white dark:border-white/20 dark:bg-black/70 dark:text-white dark:hover:bg-black"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/85 px-2.5 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-white dark:border-white/20 dark:bg-black/70 dark:text-white dark:hover:bg-black"
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
                    className="relative aspect-video w-full shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 dark:focus-visible:outline-white"
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
          <p className="flex flex-wrap items-center gap-1 text-xs text-black/60 dark:text-white/60">
            <span>Prefer email? Copy my email address</span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(EMAIL)
                  setCopiedEmail(true)
                  window.setTimeout(() => setCopiedEmail(false), 1500)
                } catch (err) {
                  console.error('Failed to copy email', err)
                }
              }}
              className="font-medium text-black underline-offset-2 hover:underline dark:text-white"
            >
              here
            </button>
            {copiedEmail && <span className="text-xs font-semibold text-green-600 dark:text-green-400">Copied!</span>}
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="rounded-none border border-black/10 bg-black/5 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/10"
      >
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Let&apos;s work together.
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Make the impact you&apos;ve been looking for.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <CTAButton href="/contact?open=true" label="Start the conversation" onClick={() => setIsContactOpen(true)} />
        </div>
      </motion.section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </motion.main>
  )
}
