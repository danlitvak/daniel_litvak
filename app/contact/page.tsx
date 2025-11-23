'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const emailJsSetupFields = [
  'EmailJS public key (User ID)',
  'EmailJS service ID',
  'EmailJS template ID',
  'Recipient email configured inside the EmailJS template',
  'Template variables that match the form fields (e.g., from_name, from_email, subject, message)',
] as const

const EMAILJS_PUBLIC_KEY = 'XyVp0YtV0hQxFOj4w'
const EMAILJS_SERVICE_ID = 'service_daniel_litvak'
const EMAILJS_TEMPLATE_ID = 'template_m61czgr'

const formDefaults = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type FormState = typeof formDefaults

type SubmissionState = 'idle' | 'sending' | 'success' | 'error'

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formState, setFormState] = useState<FormState>(formDefaults)
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('overflow-hidden')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen, onClose])

  const resetForm = () => {
    setFormState(formDefaults)
    setSubmissionState('idle')
    setErrorMessage(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmissionState('sending')
    setErrorMessage(null)

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            Name: formState.name,
            Email: formState.email,
            subject: formState.subject,
            message: formState.message,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`EmailJS responded with ${response.status}`)
      }

      setSubmissionState('success')
      setFormState(formDefaults)
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setSubmissionState('error')
      setErrorMessage('Something went wrong sending your message. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="relative w-full max-w-2xl space-y-4 rounded-none bg-white p-6 shadow-2xl dark:bg-black/90 dark:text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Send a note via EmailJS</h1>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              Fill out the form and connect your EmailJS keys to route the message to your inbox.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="rounded-none border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black transition hover:border-black/40 hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
            aria-label="Close contact form"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-black/80 dark:text-white">
              Name
              <input
                required
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-none border border-black/15 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black/60 dark:text-white dark:focus:border-white dark:focus:ring-white/30"
                placeholder="Alex Rivera"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-black/80 dark:text-white">
              Email
              <input
                required
                type="email"
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded-none border border-black/15 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black/60 dark:text-white dark:focus:border-white dark:focus:ring-white/30"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm font-medium text-black/80 dark:text-white">
            Subject
            <input
              required
              type="text"
              value={formState.subject}
              onChange={(event) => setFormState((prev) => ({ ...prev, subject: event.target.value }))}
              className="rounded-none border border-black/15 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black/60 dark:text-white dark:focus:border-white dark:focus:ring-white/30"
              placeholder="Project inquiry, collaboration..."
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-black/80 dark:text-white">
            Message
            <textarea
              required
              rows={5}
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
              className="rounded-none border border-black/15 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/20 dark:bg-black/60 dark:text-white dark:focus:border-white dark:focus:ring-white/30"
              placeholder="Share project goals, timelines, or questions..."
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              type="submit"
              disabled={submissionState === 'sending'}
              className="inline-flex items-center justify-center rounded-none bg-black px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/50 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:disabled:bg-white/50"
            >
              {submissionState === 'sending' ? 'Sending…' : 'Send via EmailJS'}
            </button>
            {submissionState === 'success' && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                Sent! Your message was delivered to the EmailJS template configured for this site.
              </span>
            )}
            {submissionState === 'error' && errorMessage && (
              <span className="text-xs font-medium text-red-600 dark:text-red-300" role="status" aria-live="assertive">
                {errorMessage}
              </span>
            )}
          </div>
        </form>

        <div className="space-y-2 rounded-none border border-black/10 bg-black/5 p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
          <p className="font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">EmailJS setup checklist</p>
          <ul className="list-disc space-y-1 pl-5">
            {emailJsSetupFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const shouldOpenByDefault = useMemo(() => searchParams.get('open') === 'true', [searchParams])

  useEffect(() => {
    if (shouldOpenByDefault) {
      setIsOpen(true)
    }
  }, [shouldOpenByDefault])

  const handleClose = () => {
    setIsOpen(false)
    router.replace('/contact')
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 pb-12 pt-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Contact</p>
        <h1 className="text-3xl font-semibold text-black dark:text-white">Let&apos;s start the conversation</h1>
        <p className="text-base text-black/70 dark:text-white/70">
          This page routes every &ldquo;Email me&rdquo; or &ldquo;Start a conversation&rdquo; button to the same EmailJS-powered form. Fill it out
          below or share it with teammates who want to reach out.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wide text-black underline-offset-2 hover:underline dark:text-white"
          >
            ← Back to portfolio
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center rounded-none bg-black px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            Open contact form
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-none border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold text-black dark:text-white">What to prepare for EmailJS</h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Before wiring this form to EmailJS, have the following IDs and template variables ready. These map directly to the inputs above.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/80 dark:text-white/80">
            {emailJsSetupFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            This form posts directly to EmailJS using the keys above; update the constants at the top of this file if you need to point to a different service or template.
          </p>
        </div>
        <div className="rounded-none border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold text-black dark:text-white">Why a dedicated contact page?</h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Every &ldquo;Email me&rdquo; or &ldquo;Contact&rdquo; button points here so visitors have a single, reliable form. No matter where they click, the same popup opens.
          </p>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Need direct support setting up EmailJS? Feel free to add your credentials to an environment file and wire the form handler to send messages live.
          </p>
        </div>
      </section>

      <ContactModal isOpen={isOpen} onClose={handleClose} />
    </main>
  )
}
