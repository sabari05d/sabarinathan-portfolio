'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Code2, Layers, CheckCircle2, AlertCircle, Clock, User, Briefcase } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import type { Project, Portfolio } from '@/types/portfolio'

export type { Project }

const data = portfolioData as Portfolio

const techColors: Record<string, string> = {
  React: '#00e5ff',
  'Next.js': '#ffffff',
  'Tailwind CSS': '#38bdf8',
  'Google Sheets': '#34a853',
  Vercel: '#e2e8f0',
  Git: '#f05032',
  Supabase: '#3ecf8e',
  PostgreSQL: '#336791',
  Capacitor: '#119eee',
  FastAPI: '#009688',
  Recharts: '#22c55e',
  'Financial APIs': '#eab308',
  JavaScript: '#f7df1e',
  CSS3: '#1572b6',
  'CSS Grid': '#264de4',
  'REST APIs': '#a855f7',
  'LocalStorage API': '#ec4899',
  Python: '#3776ab',
}

function StatusBadge({ status }: { status: string }) {
  const getStatusDetails = () => {
    switch (status) {
      case 'Live':
        return { color: 'text-[#00ff88] bg-[rgba(0,255,136,0.1)] border-[rgba(0,255,136,0.25)]', icon: CheckCircle2 }
      case 'In Development':
        return { color: 'text-[#ffb700] bg-[rgba(255,183,0,0.1)] border-[rgba(255,183,0,0.25)]', icon: Clock }
      default:
        return { color: 'text-[#00e5ff] bg-[rgba(0,229,255,0.1)] border-[rgba(0,229,255,0.25)]', icon: AlertCircle }
    }
  }

  const { color, icon: Icon } = getStatusDetails()

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium border ${color}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <Icon size={10} />
      {status}
    </span>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="relative group rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[rgba(0,229,255,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,255,0.1)]"
      style={{ cursor: 'default' }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, rgba(0,229,255,0.07), transparent 50%)`,
        }}
      />

      {/* Card shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.02)] to-transparent pointer-events-none" />

      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,71,87,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,183,0,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(0,255,136,0.5)]" />
          </div>

          <div className="flex items-center gap-2">
            {/* Type badge */}
            <span
              className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#8ba4b5] border border-[rgba(255,255,255,0.1)] uppercase tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.type === 'Client' ? <Briefcase size={10} /> : <User size={10} />}
              {project.type}
            </span>
            <Code2 size={14} className="text-[#6a87a0]" />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          {/* Index & Industry Header */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs text-[rgba(0,229,255,0.6)] font-semibold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-[#6a87a0] truncate max-w-[200px]" title={project.industry}>
              {project.industry}
            </span>
          </div>

          {/* Title & Status */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-bold text-lg text-[#e8f4f8] leading-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>

          {/* Challenge & Solution Descriptions */}
          <div className="space-y-2 mb-4 text-xs text-[#8ba4b5] leading-relaxed">
            <p>
              <strong className="text-[#a0aec0] font-semibold">Challenge: </strong>
              {project.challenge}
            </p>
            <p>
              <strong className="text-[#a0aec0] font-semibold">Solution: </strong>
              {project.solution}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="mb-4 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <span className="text-[11px] text-[#6a87a0] uppercase tracking-wider block mb-2 font-mono">
                Key Deliverables
              </span>
              <ul className="space-y-1.5">
                {project.features.slice(0, 3).map((feature, fIdx) => (
                  <li key={fIdx} className="text-xs text-[#6c8698] flex items-start gap-1.5 leading-tight">
                    <span className="text-[#00e5ff] mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {project.features.length > 3 && (
                  <li className="text-[11px] text-[rgba(0,229,255,0.5)] font-mono pl-3">
                    +{project.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  backgroundColor: `${techColors[tech] || '#8ba4b5'}12`,
                  color: techColors[tech] || '#8ba4b5',
                  border: `1px solid ${techColors[tech] || '#8ba4b5'}25`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Links Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-[rgba(255,255,255,0.03)] flex items-center justify-end gap-4">
        {project.code && (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#8ba4b5] hover:text-[#00e5ff] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Github size={13} />
            Source
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#8ba4b5] hover:text-[#00e5ff] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }}
      />
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Projects are typed as Project[] via the shared Portfolio schema.
  const projects = data.projects

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(0,255,136,0.03)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span
            className="text-xs text-[#00e5ff] tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            02 / Projects
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Things I've{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #00ff88)' }}
            >
              Built
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[#6a87a0]" />
            <span
              className="text-sm text-[#6a87a0]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {projects.length} Total Applications
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={data.contact?.github || 'https://github.com/sabari05d'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#8ba4b5] hover:text-[#00e5ff] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Github size={16} />
            Explore all repositories on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}