'use client'

import { useEffect, useState } from 'react'

import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../lib/emailjsConfig'

const formDefaults = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type FormState = typeof formDefaults

type SubmissionState = 'idle' | 'sending' | 'success' | 'error'

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
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
      const messageTime = new Date().toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })

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
            time: messageTime,
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
            <h1 className="text-xl font-semibold">Send a message</h1>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              Share a few details and I&apos;ll get back to you soon.
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
                placeholder="Daniel Litvak"
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
            {submissionState === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {submissionState === 'success' && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
              Sent! Thanks for reaching out.
            </span>
          )}
            {submissionState === 'error' && errorMessage && (
              <span className="text-xs font-medium text-red-600 dark:text-red-300" role="status" aria-live="assertive">
                {errorMessage}
              </span>
            )}
          </div>
        </form>

    </div>
  </div>
)
}
