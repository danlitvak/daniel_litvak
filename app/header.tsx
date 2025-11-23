'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { HERO } from './data'

export function Header() {
  const pathname = usePathname()
  const isBlogIndex = pathname === '/blog'

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== '/') return

    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()

    const header = document.querySelector('header')
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0

    const targetPosition = target.getBoundingClientRect().top + window.scrollY
    const offsetPosition = Math.max(targetPosition - headerHeight - 12, 0)

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  const navigationItems = [
    { href: '/#about', id: 'about', label: 'About' },
    { href: '/#projects', id: 'projects', label: 'Projects' },
    { href: '/#skills', id: 'skills', label: 'Skills' },
    { href: '/#writing', id: 'writing', label: 'Writing' },
    { href: '/#contact', id: 'contact', label: 'Contact' },
  ] as const

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
          {navigationItems.map(({ href, id, label }) => (
            <Link
              key={id}
              href={href}
              onClick={(event) => handleNavClick(event, id)}
              className="hover:text-black dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
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
