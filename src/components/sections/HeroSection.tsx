'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Zap, ChevronRight, FileText } from 'lucide-react'
import data from '@/data/portfolio.json'

const ROLES = data.landing.roles

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState(ROLES[0])
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    // Reduced motion: show the first role statically, no typing loop.
    if (reduce) {
      setDisplayed(ROLES[0])
      return
    }
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1600)
      return () => clearTimeout(t)
    }
    const current = ROLES[roleIndex]
    let timeoutId
    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutId = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, 60)
      } else {
        timeoutId = setTimeout(() => {
          setDeleting(true)
        }, 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 35)
      } else {
        setDeleting(false)
        setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length)
      }
    }
  }, [displayed, deleting, roleIndex, paused, reduce])

  return (
    <span className="text-[#00e5ff] font-mono">
      {displayed}
      <span className="animate-[blink_1.2s_step-end_infinite]">▋</span>
    </span>
  )
}

// Floating particle
function Particle({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="absolute rounded-full bg-[rgba(0,229,255,0.4)]"
      style={{ left: x, top: y, width: size, height: size }}
      animate={reduce ? false : {
        y: [0, -20, 0],
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

const particles = [
  { x: '15%', y: '20%', delay: 0, size: 3 },
  { x: '80%', y: '15%', delay: 1.2, size: 2 },
  { x: '65%', y: '70%', delay: 2.1, size: 4 },
  { x: '10%', y: '75%', delay: 0.7, size: 2 },
  { x: '90%', y: '55%', delay: 1.8, size: 3 },
  { x: '45%', y: '10%', delay: 3.0, size: 2 },
  { x: '25%', y: '85%', delay: 1.4, size: 3 },
  { x: '75%', y: '40%', delay: 0.3, size: 2 },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,229,255,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_70%_80%,rgba(0,255,136,0.04)_0%,transparent_60%)]" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l-2 border-t-2 border-[rgba(0,229,255,0.12)] rounded-tl-xl" />
      <div className="absolute bottom-24 right-8 w-24 h-24 border-r-2 border-b-2 border-[rgba(0,229,255,0.12)] rounded-br-xl" />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 pb-28 ">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 inline-flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 px-4 py-3 md:py-2 mb-8 rounded-2xl md:rounded-full bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.15)] text-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] status-dot inline-block" />
            <span className="text-[#00ff88] font-medium font-mono">
              Available for opportunities
            </span>
          </div>

          <span className="hidden md:block text-[#6a87a0]">·</span>

          <span className="text-[#8ba4b5] text-xs">
            Building at {data.experience[data.experience.length - 1]?.company || 'Digient Technologies'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-2">
            <span className="text-[#e8f4f8]">Sabari</span>
            <span className="text-glow-cyan text-[#00e5ff]">nathan</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl mb-6 h-8 flex items-center justify-center gap-2 text-[#8ba4b5] font-mono"
        >
          <span className="text-[rgba(0,229,255,0.4)]">~$</span>
          <TypewriterRole />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[#8ba4b5] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {data.landing.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {data.landing.highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.12)] text-xs text-[#8ba4b5] font-mono"
            >
              <Zap size={10} className="text-[#00e5ff]" />
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00e5ff] text-[#020408] font-semibold text-sm hover:bg-[#00b8cc] transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:scale-[1.02]"
          >
            View Projects
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-transparent border border-[rgba(0,229,255,0.2)] text-[#e8f4f8] font-semibold text-sm hover:border-[rgba(0,229,255,0.4)] hover:bg-[rgba(0,229,255,0.05)] transition-all"
          >
            <Mail size={15} className="text-[#00e5ff]" />
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { href: data.contact.github, Icon: Github, label: 'GitHub' },
            { href: data.contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${data.contact.email}`, Icon: Mail, label: 'Email' },
            { href: data.contact.resume, Icon: FileText, label: 'Resume' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[#6a87a0] hover:text-[#00e5ff] transition-colors text-sm"
              aria-label={label}
            >
              <Icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:block">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs text-[#6a87a0] tracking-widest uppercase font-mono"
        >
          scroll
        </span>
        <motion.div
          animate={reduce ? { y: 0 } : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[rgba(0,229,255,0.4)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
