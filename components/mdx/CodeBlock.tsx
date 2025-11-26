"use client"

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

export function CodeBlock({ children, className = '', ...props }: ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    const codeText = preRef.current?.innerText ?? ''
    if (!codeText) return
    try {
      await navigator.clipboard.writeText(codeText.trimEnd())
      setCopied(true)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <div className="group relative">
      <pre ref={preRef} className={`overflow-x-auto pr-14 ${className}`} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-none border border-white/15 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-black shadow-sm transition hover:scale-[1.01] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 dark:border-white/20 dark:bg-black/80 dark:text-white dark:hover:bg-black"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
