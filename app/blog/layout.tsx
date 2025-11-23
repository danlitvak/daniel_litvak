'use client'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { usePathname } from 'next/navigation'

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBlogIndex = pathname === '/blog'

  return (
    <>
      {!isBlogIndex && (
        <>
          <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-black/5 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-white/10" />
          <ScrollProgress
            className="fixed top-0 z-20 h-0.5 bg-black/30 dark:bg-white/40"
            springOptions={{
              bounce: 0,
            }}
          />
        </>
      )}
      <main
        className={
          isBlogIndex
            ? 'space-y-10 pb-12 pt-10'
            : 'prose mt-24 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium prose-headings:text-black dark:prose-headings:text-white prose-p:text-black/80 dark:prose-p:text-white/80 prose-a:text-black prose-a:no-underline dark:prose-a:text-white'
        }
      >
        {children}
      </main>
    </>
  )
}
