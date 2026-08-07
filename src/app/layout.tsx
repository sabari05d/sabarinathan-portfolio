import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import portfolioData from '@/data/portfolio.json'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const siteUrl = 'https://sabarinathan.vercel.app'

const portfolio = portfolioData as typeof portfolioData

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolio.name,
  url: siteUrl,
  jobTitle: portfolio.title,
  email: portfolio.contact.email,
  sameAs: [portfolio.contact.linkedin, portfolio.contact.github],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sabarinathan D — Full Stack Developer',
    template: '%s | Sabarinathan D',
  },
  description: 'Full Stack Developer focused on building scalable, high-performance web applications using Java, Spring Boot, React, and PHP.',
  keywords: ['Full Stack Developer', 'React', 'Spring Boot', 'Java', 'PHP', 'Portfolio'],
  authors: [{ name: 'Sabarinathan D' }],
  creator: 'Sabarinathan D',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sabarinathan D — Full Stack Developer',
    description: 'Building scalable web applications with clean architecture.',
    type: 'website',
    url: siteUrl,
    siteName: 'Sabarinathan D Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Sabarinathan D — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Sabarinathan D — Full Stack Developer',
    description: 'Building scalable web applications with clean architecture.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} bg-[#020408] text-[#e8f4f8] antialiased font-sans`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}