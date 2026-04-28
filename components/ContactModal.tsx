'use client'

import { useState } from 'react'

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZoneName: 'short',
})

type FormState = {
  name: string
  email: string
  message: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactModal() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [sentTime, setSentTime] = useState<string>('')
  const formattedTime = dateFormatter.format(new Date())

  const updateField = (
    key: keyof FormState,
    value: FormState[keyof FormState],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      console.error('EmailJS environment variables are not fully configured.')
      setStatus('error')
      return
    }

    setStatus('sending')

    const templateParams = {
      from_name: form.name,
      reply_to: form.email,
      message: form.message,
      time: formattedTime,
    }

    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: templateParams,
        }),
      })

      if (!response.ok) {
        throw new Error(`EmailJS request failed with status ${response.status}`)
      }

      setSentTime(templateParams.time)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Unable to send message through EmailJS', error)
      setStatus('error')
    }
  }

  return (
    <section className="space-y-4 rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-black dark:text-white">Contact</h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          Send a message via EmailJS. A timestamp is attached to each submission so you can confirm when it was sent.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black dark:text-white" htmlFor="name">
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            className="rounded-none border border-black/20 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black/70 focus:ring-0 dark:border-white/20 dark:bg-black dark:text-white"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black dark:text-white" htmlFor="email">
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            className="rounded-none border border-black/20 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black/70 focus:ring-0 dark:border-white/20 dark:bg-black dark:text-white"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black dark:text-white" htmlFor="message">
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            className="rounded-none border border-black/20 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black/70 focus:ring-0 dark:border-white/20 dark:bg-black dark:text-white"
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
        </div>

        <div className="text-xs text-black/60 dark:text-white/60">
          Timestamp captured for this submission: <span className="font-semibold text-black dark:text-white">{formattedTime}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-none bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-black/60 dark:bg-white dark:text-black dark:hover:bg-white/90 disabled:dark:bg-white/50"
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
          {status === 'sent' && (
            <span className="text-xs text-green-700 dark:text-green-400">
              Message sent. EmailJS template received time {sentTime}.
            </span>
          )}
          {status === 'error' && (
            <span className="text-xs text-red-700 dark:text-red-400">
              Something went wrong while sending. Please try again.
            </span>
          )}
        </div>
      </form>
    </section>
  )
}
