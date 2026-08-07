'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import { SpeedInsights } from "@vercel/speed-insights/next"

// Below-the-fold sections are code-split to reduce the initial client bundle.
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'))
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'))
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'))
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'))
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'))
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'))

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false)

  // Global Cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Scan line effect */}
      <div className="scan-line" aria-hidden />

      <Navbar onCommandPalette={() => setCmdOpen(true)} />

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
      />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />

      <SpeedInsights/>
    </>
  )
}