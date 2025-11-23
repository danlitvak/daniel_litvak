"use client"

import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { highlight } from 'sugar-high'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img
            src={src}
            alt={alt}
            className="h-64 w-full rounded-xl object-cover shadow-sm md:h-80"
          />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
    table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white/40 shadow-sm dark:border-white/10 dark:bg-white/5">
        <table className="w-full min-w-[480px] border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    pre: ({ children, className = '', ...props }: ComponentPropsWithoutRef<'pre'>) => {
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
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
