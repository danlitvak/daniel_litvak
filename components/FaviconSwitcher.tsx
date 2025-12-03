'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const LIGHT_ICON = '/favicon-light.svg'
const DARK_ICON = '/favicon-dark.svg'

const updateFavicon = (href: string) => {
  const selectors = ["link[rel='icon']", "link[rel='shortcut icon']"]
  selectors.forEach((selector) => {
    const link = document.querySelector<HTMLLinkElement>(selector)
    if (link) {
      link.href = href
    }
  })
}

export function FaviconSwitcher() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const href = resolvedTheme === 'dark' ? DARK_ICON : LIGHT_ICON
    updateFavicon(href)
  }, [resolvedTheme])

  return null
}
