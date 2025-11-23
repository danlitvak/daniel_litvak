import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
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
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
