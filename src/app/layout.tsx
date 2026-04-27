import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sabarinathan D — Full Stack Developer',
  description: 'Full Stack Developer focused on building scalable, high-performance web applications using Java, Spring Boot, React, and PHP.',
  keywords: ['Full Stack Developer', 'React', 'Spring Boot', 'Java', 'PHP', 'Portfolio'],
  authors: [{ name: 'Sabarinathan D' }],
  openGraph: {
    title: 'Sabarinathan D — Full Stack Developer',
    description: 'Building scalable web applications with clean architecture.',
    type: 'website',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
      </head>
      <body
        className="bg-[#020408] text-[#e8f4f8] antialiased"
        style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  )
}
