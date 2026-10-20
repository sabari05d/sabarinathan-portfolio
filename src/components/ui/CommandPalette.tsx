'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Hash, User, Briefcase, Code2, Mail, Github, Linkedin, X, type LucideIcon } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import type { Portfolio } from '@/types/portfolio'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface Command {
  id: string
  label: string
  icon: LucideIcon
  section: string
  href?: string
  external?: boolean
  shortcut?: string
  tech?: string[]
}

const data = portfolioData as Portfolio

const navCommands: Command[] = [
  { id: 'hero', label: 'Go to Hero', icon: Hash, section: 'Navigate', href: '#hero', shortcut: 'H' },
  { id: 'about', label: 'About Me', icon: User, section: 'Navigate', href: '#about', shortcut: 'A' },
  { id: 'projects', label: 'View Projects', icon: Code2, section: 'Navigate', href: '#projects', shortcut: 'P' },
  { id: 'skills', label: 'Tech Stack', icon: Hash, section: 'Navigate', href: '#skills', shortcut: 'S' },
  { id: 'experience', label: 'Experience', icon: Briefcase, section: 'Navigate', href: '#experience', shortcut: 'E' },
  { id: 'contact', label: 'Contact Me', icon: Mail, section: 'Navigate', href: '#contact', shortcut: 'C' },
  { id: 'github', label: 'Open GitHub', icon: Github, section: 'Links', href: data.contact.github, external: true },
  { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, section: 'Links', href: data.contact.linkedin, external: true },
  { id: 'email', label: 'Send Email', icon: Mail, section: 'Links', href: `mailto:${data.contact.email}`, external: true },
]

const projectCommands: Command[] = data.projects
  .filter((p) => p.link || p.code)
  .map((p) => ({
    id: `project-${p.title}`,
    label: p.title,
    icon: Code2,
    section: 'Projects',
    href: p.link ?? p.code,
    external: true,
    tech: p.technologies,
  }))

const allCommands: Command[] = [...navCommands, ...projectCommands]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const titleId = 'command-palette-title'

  const filtered: Command[] = query.trim()
    ? allCommands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.section.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!isOpen) return
    setSelectedIndex(0)
  }, [isOpen, filtered.length])

  const executeCommand = useCallback((cmd: Command) => {
    onClose()
    if (cmd.external && cmd.href) {
      window.open(cmd.href, '_blank', 'noopener,noreferrer')
    } else if (cmd.href === '#' || cmd.href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (cmd.href) {
      const el = document.querySelector(cmd.href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filtered[selectedIndex]
        if (cmd) executeCommand(cmd)
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        const focusables = listRef.current?.querySelectorAll<HTMLElement>('[data-palette-item]')
        if (!focusables || focusables.length === 0) return
        const next = e.shiftKey
          ? (selectedIndex - 1 + focusables.length) % focusables.length
          : (selectedIndex + 1) % focusables.length
        setSelectedIndex(next)
        focusables[next]?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, filtered, selectedIndex, onClose, executeCommand])

  const sections = [...new Set(filtered.map(c => c.section))]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-[rgba(2,4,8,0.8)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            ref={paletteRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: -8, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.96, y: -8, x: '-50%' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15vh] left-1/2 z-[101] w-[calc(100%-2rem)] max-w-[580px]"
          >
            <div className="rounded-2xl bg-[rgba(6,13,20,0.98)] border border-[rgba(0,229,255,0.15)] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,229,255,0.08)] overflow-hidden">
              {/* Search header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(0,229,255,0.08)]">
                <Search size={16} className="text-[#00e5ff] flex-shrink-0" />
                <h2 id={titleId} className="sr-only">Command Palette</h2>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands, projects, links..."
                  aria-label="Search commands"
                  className="flex-1 bg-transparent text-[#e8f4f8] placeholder:text-[#6a87a0] text-sm font-mono"
                />
                <button
                  onClick={onClose}
                  aria-label="Close command palette"
                  className="p-1 rounded-md text-[#6a87a0] hover:text-[#8ba4b5] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[380px] overflow-y-auto py-2" role="listbox" aria-label="Command results">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[#6a87a0] text-sm">
                    No commands found for &quot;<span className="text-[#8ba4b5]">{query}</span>&quot;
                  </div>
                ) : (
                  sections.map(section => {
                    const sectionCmds = filtered.filter(c => c.section === section)
                    const globalStart = filtered.findIndex(c => c.section === section)
                    return (
                      <div key={section}>
                        <div
                          className="px-4 py-1.5 text-xs font-semibold text-[#6a87a0] uppercase tracking-widest font-mono"
                        >
                          {section}
                        </div>
                        {sectionCmds.map((cmd, localIdx) => {
                          const globalIdx = globalStart + localIdx
                          const isSelected = globalIdx === selectedIndex
                          const Icon = cmd.icon
                          return (
                            <button
                              key={cmd.id}
                              role="option"
                              aria-selected={isSelected}
                              data-palette-item
                              onClick={() => executeCommand(cmd)}
                              onMouseEnter={() => setSelectedIndex(globalIdx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                isSelected
                                  ? 'bg-[rgba(0,229,255,0.08)] text-[#e8f4f8]'
                                  : 'text-[#8ba4b5] hover:text-[#e8f4f8]'
                              }`}
                            >
                              <Icon
                                size={15}
                                className={isSelected ? 'text-[#00e5ff]' : 'text-[#6a87a0]'}
                              />
                              <span className="flex-1 text-left">{cmd.label}</span>
                              {cmd.tech && (
                                <span className="text-xs text-[#6a87a0] font-mono">
                                  {cmd.tech.slice(0, 2).join(' · ')}
                                </span>
                              )}
                              {cmd.shortcut && !query && (
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded border border-[rgba(0,229,255,0.15)] text-[#6a87a0] font-mono"
                                >
                                  {cmd.shortcut}
                                </span>
                              )}
                              {isSelected && <ArrowRight size={12} className="text-[#00e5ff]" />}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-[rgba(0,229,255,0.06)] flex items-center gap-4 text-xs text-[#6a87a0] font-mono">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
                <span className="ml-auto text-[rgba(0,229,255,0.4)]">cmd+k</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}