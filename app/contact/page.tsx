'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { ContactModal } from '../../components/ContactModal'

function ContactPageContent() {
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
        <p className="text-base text-black/70 dark:text-white/70">Tell me about your project, idea, or question.</p>
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

      <section className="rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold text-black dark:text-white">Drop a line</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Use the button below to open the contact form and send a message without leaving the page.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-4 inline-flex items-center justify-center rounded-none bg-black px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/85"
        >
          Write a message
        </button>
      </section>

      <ContactModal isOpen={isOpen} onClose={handleClose} />
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageContent />
    </Suspense>
  )
}
