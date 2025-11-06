import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alex-rivera.dev'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Alex Rivera – Product Design Technologist',
    template: '%s | Alex Rivera',
  },
  description:
    'Portfolio and blog for Alex Rivera, a product design technologist crafting resilient digital experiences for climate-focused teams.',
  keywords: [
    'Alex Rivera',
    'product design',
    'UX researcher',
    'frontend engineer',
    'portfolio',
  ],
  openGraph: {
    title: 'Alex Rivera – Product Design Technologist',
    description:
      'Human-centered technologist specializing in climate resilience, systems thinking, and end-to-end product delivery.',
    url: 'https://alex-rivera.dev',
    siteName: 'Alex Rivera Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Rivera – Product Design Technologist',
    description:
      'Exploring the intersection of inclusive design, prototyping, and climate technology.',
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-black`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
