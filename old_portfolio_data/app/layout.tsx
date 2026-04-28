import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { FaviconSwitcher } from '../components/FaviconSwitcher'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://danlitvak.github.io/portfolio'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Daniel Litvak – Front End Developer & Technical Adviser',
    template: '%s | Daniel Litvak',
  },
  description:
    'Portfolio and blog for Daniel Litvak, a front end developer and technical adviser building dashboards, admin tooling, and interactive simulations.',
  keywords: [
    'Daniel Litvak',
    'front end developer',
    'technical adviser',
    'JavaScript developer',
    'portfolio',
  ],
  icons: {
    icon: [
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon.svg' },
    ],
  },
  openGraph: {
    title: 'Daniel Litvak – Front End Developer & Technical Adviser',
    description:
      'Front end developer specializing in dashboards, admin platforms, and interactive web experiments.',
    url: 'https://danlitvak.github.io/portfolio',
    siteName: 'Daniel Litvak Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Litvak – Front End Developer & Technical Adviser',
    description: 'Exploring interactive web builds, embedded systems, and hands-on simulations.',
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
          defaultTheme="light"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <Header />
            <div className="relative mx-auto w-full max-w-[800px] flex-1 px-4 pb-12">
              <FaviconSwitcher />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
