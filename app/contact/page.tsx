'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { ContactModal } from '../../components/ContactModal'
import { emailJsSetupFields } from '../../lib/emailjsConfig'

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
        <p className="text-base text-black/70 dark:text-white/70">
          This page routes every &ldquo;Email me&rdquo; or &ldquo;Start a conversation&rdquo; button to the same EmailJS-powered form. Fill it out below
          or share it with teammates who want to reach out.
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
            Before wiring this form to EmailJS, have the following IDs and template variables ready. These map directly to the
            inputs above.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/80 dark:text-white/80">
            {emailJsSetupFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            This form posts directly to EmailJS using the keys above; update the values in <code className="font-mono">lib/emailjsConfig.ts</code> if you need to
            point to a different service or template.
          </p>
        </div>
        <div className="rounded-none border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold text-black dark:text-white">Why a dedicated contact page?</h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Every &ldquo;Email me&rdquo; or &ldquo;Contact&rdquo; button points here so visitors have a single, reliable form. No matter where they
            click, the same popup opens.
          </p>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Need direct support setting up EmailJS? Feel free to add your credentials to an environment file and wire the form
            handler to send messages live.
          </p>
        </div>
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
