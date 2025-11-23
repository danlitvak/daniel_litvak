'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HERO } from './data'

export function Header() {
  const pathname = usePathname()
  const isBlogIndex = pathname === '/blog'

  return (
    <header className="sticky top-0 z-30 mb-8 border-b border-black/10 bg-white px-4 pb-3 pt-4 dark:border-white/10 dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="font-medium text-black dark:text-white">
            {HERO.name}
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60"
            delay={0.4}
          >
            {HERO.role}
          </TextEffect>
        </div>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-wide text-black/70 dark:text-white/70">
          <a href="#about" className="hover:text-black dark:hover:text-white">
            About
          </a>
          <a href="#projects" className="hover:text-black dark:hover:text-white">
            Projects
          </a>
          <a href="#skills" className="hover:text-black dark:hover:text-white">
            Skills
          </a>
          <a href="#writing" className="hover:text-black dark:hover:text-white">
            Writing
          </a>
          <a href="#contact" className="hover:text-black dark:hover:text-white">
            Contact
          </a>
          {isBlogIndex ? (
            <Link href="/" className="hover:text-black dark:hover:text-white">
              Home
            </Link>
          ) : (
            <Link href="/blog" className="hover:text-black dark:hover:text-white">
              Blog
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
