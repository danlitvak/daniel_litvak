import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '../data'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories and research notes on product design, field work, and resilient systems.',
}

export default function BlogIndex() {
  return (
    <main className="space-y-8 pb-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Writing</p>
        <h1 className="text-3xl font-semibold text-black dark:text-white">Blog</h1>
        <p className="text-base text-black/70 dark:text-white/70">
          Essays and field notes on designing tools for resilient teams.
        </p>
      </header>

      <div className="divide-y divide-black/10 overflow-hidden rounded-none border border-black/10 dark:divide-white/10 dark:border-white/10">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.uid}
            href={post.link}
            className="flex flex-col gap-2 bg-white px-5 py-4 transition-colors hover:bg-black/5 dark:bg-black/30 dark:hover:bg-white/10"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
              <span>{post.date}</span>
              <span className="text-[11px]">Read ↗</span>
            </div>
            <h2 className="text-lg font-semibold text-black dark:text-white">{post.title}</h2>
            <p className="text-sm text-black/70 dark:text-white/70">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
