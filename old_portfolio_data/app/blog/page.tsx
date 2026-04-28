import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '../data'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories and research notes on product design, field work, and resilient systems.',
}

export default function BlogIndex() {
  const upcoming = BLOG_POSTS.filter((post) => post.date === '—')
  const published = BLOG_POSTS.filter((post) => post.date !== '—')

  return (
    <main className="space-y-10 pb-12">
      <section className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-none border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:border-black/40 hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
        >
          Back to home
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-black dark:text-white">Blog</h1>
          <p className="text-lg text-black/80 dark:text-white/80">
            Essays and field notes on designing tools for resilient teams.
          </p>
          <p className="text-sm text-black/70 dark:text-white/70">
            Longer-form versions of the highlights on the homepage—same tone, more depth, and plenty of diagrams.
          </p>
        </div>
      </section>

      <section className="rounded-none border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-black dark:text-white">All posts</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              The same layout and typography as the homepage writing section for a consistent read.
            </p>
          </div>
        </div>
        <div className="mt-4 divide-y divide-black/10 border border-black/10 dark:divide-white/10 dark:border-white/10">
          {published.map((post) => (
            <Link
              key={post.uid}
              href={post.link}
              className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
                <span>{post.date}</span>
                <span className="text-[11px]">Read post</span>
              </div>
              <h2 className="text-lg font-semibold text-black dark:text-white">{post.title}</h2>
              <p className="text-sm text-black/70 dark:text-white/70">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="rounded-none border border-dashed border-black/15 bg-white/70 p-6 shadow-sm dark:border-white/20 dark:bg-white/5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-black dark:text-white">Upcoming posts</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Drafts and ideas in progress. Dates will firm up soon.
            </p>
          </div>
          <div className="mt-4 divide-y divide-black/10 border border-black/10 dark:divide-white/15 dark:border-white/15">
            {upcoming.map((post) => (
              <div key={post.uid} className="flex flex-col gap-1 px-4 py-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
                  <span>Draft</span>
                  <span className="text-[11px]">Coming soon</span>
                </div>
                <h3 className="text-base font-semibold text-black dark:text-white">{post.title}</h3>
                <p className="text-sm text-black/70 dark:text-white/70">{post.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
