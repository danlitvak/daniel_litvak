"use client"

import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

export function CodeBlock({ children, className = '', ...props }: ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false)
  const child = children as { props?: { children?: string } }
  const codeText = typeof child?.props?.children === 'string' ? child.props.children : ''

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
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
      <pre className={`overflow-x-auto pr-14 ${className}`} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-full border border-black/15 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm transition hover:scale-[1.01] hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 dark:border-white/15 dark:bg-white/85 dark:text-black dark:hover:bg-white"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
