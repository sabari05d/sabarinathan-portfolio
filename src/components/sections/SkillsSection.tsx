'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import data from '@/data/portfolio.json'

// Categorized skill groups for bento layout
const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    color: '#00e5ff',
    icon: '⚡',
    size: 'col-span-2 row-span-1',
  },
  {
    label: 'Backend',
    skills: ['Java', 'Spring Boot', 'PHP', 'Python'],
    color: '#00ff88',
    icon: '🔧',
    size: 'col-span-1 row-span-1',
  },
  {
    label: 'Frameworks',
    skills: ['CodeIgniter', 'Laravel', 'Django', 'Fast API'],
    color: '#ffb700',
    icon: '📦',
    size: 'col-span-1 row-span-1',
  },
  {
    label: 'Database & Cloud',
    skills: ['MySQL',  'Postgresql', 'AWS (Cloud Foundations)'],
    color: '#ff6b8a',
    icon: '☁️',
    size: 'col-span-2 row-span-1',
  },
]

// Individual skill badge with proficiency mapping
const proficiencyMap: Record<string, number> = {
  React: 90,
  JavaScript: 88,
  HTML: 95,
  CSS: 90,
  Bootstrap: 85,
  Java: 80,
  'Spring Boot': 78,
  PHP: 82,
  Python: 70,
  CodeIgniter: 90,
  Laravel: 80,
  Django: 60,
  'Fast API': 70,
  MySQL: 82,
  'Postgresql': 80,
  'AWS (Cloud Foundations)': 60,
}

function SkillBadge({ skill, color }: { skill: string; color: string }) {
  const pct = proficiencyMap[skill] ?? 70
  return (
    <div className="group relative">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-xs font-medium text-[#e8f4f8]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {skill}
        </span>
        <span
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

function BentoCard({
  group,
  delay,
}: {
  group: typeof skillGroups[0]
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${group.size} relative p-6 rounded-2xl bg-[rgba(10,21,32,0.7)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm overflow-hidden group hover:border-[rgba(0,229,255,0.15)] transition-all duration-300`}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{ backgroundColor: `${group.color}18` }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{group.icon}</span>
        <div>
          <h3 className="font-bold text-[#e8f4f8] text-sm">{group.label}</h3>
          <span
            className="text-xs"
            style={{ color: group.color, fontFamily: "'JetBrains Mono', monospace" }}
          >
            {group.skills.length} techs
          </span>
        </div>
        <div
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
        />
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {group.skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} color={group.color} />
        ))}
      </div>
    </motion.div>
  )
}

// Terminal-style skill cloud
function SkillCloud() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="p-6 rounded-2xl bg-[rgba(6,13,20,0.8)] border border-[rgba(0,229,255,0.08)] font-mono"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,71,87,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,183,0,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(0,255,136,0.6)]" />
        <span className="text-xs text-[#4a6070] ml-2">tech-stack.sh</span>
      </div>
      <div className="text-sm">
        <div className="text-[#4a6070]">$ <span className="text-[#8ba4b5]">echo $SKILLS</span></div>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 rounded-md bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.1)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.1)] transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 text-[#4a6070]">
          $ <span className="text-[#00ff88]">// {data.skills.length} technologies and counting...</span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-[#4a6070]">$</span>
          <span className="w-2 h-4 bg-[#00e5ff] animate-[blink_1.2s_step-end_infinite] inline-block" />
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

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
            03 / Tech Stack
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Tools of the{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #ffb700)' }}>
            Trade
          </span>
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large frontend card */}
          <div className="md:col-span-2">
            <BentoCard group={skillGroups[0]} delay={0.1} />
          </div>
          {/* Backend */}
          <BentoCard group={skillGroups[1]} delay={0.15} />
          {/* Frameworks */}
          <BentoCard group={skillGroups[2]} delay={0.2} />
          {/* Database & Cloud */}
          <div className="md:col-span-2">
            <BentoCard group={skillGroups[3]} delay={0.25} />
          </div>
          {/* Terminal skill cloud - spans full row */}
          <div className="md:col-span-3">
            <SkillCloud />
          </div>
        </div>
      </div>
    </section>
  )
}
