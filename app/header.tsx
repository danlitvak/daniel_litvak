'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { HERO } from './data'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          {HERO.name}
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-black/60 dark:text-white/60"
          delay={0.5}
        >
          {HERO.role}
        </TextEffect>
      </div>
    </header>
  )
}
