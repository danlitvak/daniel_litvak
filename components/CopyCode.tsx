'use client'

import { useState } from 'react'

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <div className="relative border border-black/20 bg-gradient-to-br from-white to-black/[0.03] px-4 py-3 font-mono text-sm text-black shadow-sm dark:border-white/20 dark:from-black dark:to-white/[0.04] dark:text-white">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 border border-black bg-black px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-black/80 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
