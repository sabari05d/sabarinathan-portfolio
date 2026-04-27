'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Code2, Layers } from 'lucide-react'
import data from '@/data/portfolio.json'

const techColors: Record<string, string> = {
  React: '#00e5ff',
  Java: '#ff8c00',
  'Spring Boot': '#6bcb77',
  PHP: '#7c7cc7',
  MySQL: '#4479a1',
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  HTML: '#e34f26',
  CSS: '#1572b6',
  Bootstrap: '#7952b3',
}

function ProjectCard({ project, index }: { project: typeof data.projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[rgba(0,229,255,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,255,0.1)]"
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

      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-5 pt-5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,71,87,0.5)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,183,0,0.5)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(0,255,136,0.5)]" />
        <div className="ml-auto">
          <Code2 size={14} className="text-[#4a6070]" />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        {/* Index */}
        <span
          className="text-xs text-[rgba(0,229,255,0.4)] mb-2 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="font-bold text-lg text-[#e8f4f8] mb-2 leading-tight group-hover:text-white transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#8ba4b5] mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md font-medium"
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

        {/* Links */}
        <div className="flex items-center gap-3">

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
              View
            </a>
          )}
        </div>
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

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
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
            Things I&apos;ve{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #00ff88)' }}>
              Built
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[#4a6070]" />
            <span
              className="text-sm text-[#4a6070]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {data.projects.length}+ projects
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href={data.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#8ba4b5] hover:text-[#00e5ff] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Github size={16} />
            See more on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
