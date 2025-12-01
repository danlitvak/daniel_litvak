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
      <pre
        ref={preRef}
        className={`overflow-x-auto border border-black/15 bg-[#0e1116] p-4 pr-16 text-sm leading-relaxed text-[#dfe3ea] shadow-[0_6px_20px_rgba(0,0,0,0.16)] dark:border-white/15 dark:bg-[#0a0d12] dark:text-[#e9edf2] rounded-none ${className}`}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 border border-white/25 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-black shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 dark:border-white/25 dark:bg-white/12 dark:text-white dark:hover:bg-white/18 dark:focus-visible:outline-white/70"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
