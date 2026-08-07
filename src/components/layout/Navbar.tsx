'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Menu, X, Command } from 'lucide-react'
import data from '@/data/portfolio.json'

interface NavbarProps {
  onCommandPalette: () => void
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // Lightweight scroll listener for the navbar background shrink only.
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY < 120) setActiveSection('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Active section tracking via IntersectionObserver (no layout reads on scroll).
    const ids = navLinks.map(l => l.href.replace('#', '')).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3 bg-[rgba(2,4,8,0.85)] backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)]'
            : 'py-5 bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center group-hover:bg-[rgba(0,229,255,0.15)] transition-colors">
              <Terminal size={15} className="text-[#00e5ff]" />
            </div>
            <span
              className="font-mono text-sm text-[#8ba4b5] group-hover:text-[#00e5ff] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              sabari<span className="text-[#00e5ff]">.</span>dev
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isActive
                      ? 'text-[#00e5ff]'
                      : 'text-[#8ba4b5] hover:text-[#e8f4f8]'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)]"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.12)] text-[#8ba4b5] hover:text-[#00e5ff] hover:border-[rgba(0,229,255,0.25)] transition-all text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Command size={12} />
              <span>cmd+k</span>
            </button>
            <a
              href={`mailto:${data.contact.email}`}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00e5ff] text-[#020408] text-sm font-semibold hover:bg-[#00b8cc] transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Hire Me
            </a>
            <button
              className="md:hidden p-2 text-[#6a87a0] hover:text-[#e8f4f8]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            className="fixed inset-x-0 top-[65px] z-40 md:hidden bg-[rgba(6,13,20,0.97)] backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-[#8ba4b5] hover:text-[#e8f4f8] hover:bg-[rgba(0,229,255,0.05)] rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[rgba(0,229,255,0.08)] mt-2">
                <button
                  onClick={() => { onCommandPalette(); setMobileOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#8ba4b5] hover:text-[#00e5ff]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <Command size={14} />
                  Open Command Palette
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
