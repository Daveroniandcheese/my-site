import './global.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import ClarityAnalytics from './components/clarity'
import TopMeta from './components/top-meta'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import Cursor from './components/cursor'
import Peek from './components/peek'
import Reveal from './components/reveal'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
})

const SITE_NAME = 'Dave Willey'
const SITE_DESCRIPTION =
  'Designer and developer in Milwaukee. Ecommerce UX, SEO, and the occasional side project.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${fraunces.variable}`}
    >
      <body>
        <Cursor />
        <Peek />
        <Reveal />
        <Navbar />
        <div className="site">
          <TopMeta />
          {children}
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
        <ClarityAnalytics />
      </body>
    </html>
  )
}
