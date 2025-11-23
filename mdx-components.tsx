import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'
import { highlight } from 'sugar-high'

import { CodeBlock } from './components/mdx/CodeBlock'

type CoverProps = {
  src: string
  alt: string
  caption: string
}

function Cover({ src, alt, caption }: CoverProps) {
  return (
    <figure>
      <img src={src} alt={alt} className="h-64 w-full rounded-xl object-cover shadow-sm md:h-80" />
      <figcaption className="text-center">{caption}</figcaption>
    </figure>
  )
}

function Table({ children, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white/40 shadow-sm dark:border-white/10 dark:bg-white/5">
      <table className="w-full min-w-[480px] border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  )
}

function InlineCode({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const codeHTML = highlight(children as string)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover,
    table: Table,
    pre: CodeBlock,
    code: InlineCode,
  }
}
