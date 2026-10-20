'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import portfolioData from '@/data/portfolio.json'
import type { SkillGroup, Portfolio } from '@/types/portfolio'

export type { SkillGroup }

const data = portfolioData as Portfolio

function SkillBadge({ skill, color }: { skill: string; color: string }) {
  const proficiencies = data.skills.proficiencies || {}
  const pct = proficiencies[skill] ?? 70

  return (
    <div className="group relative">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[#e8f4f8] truncate pr-2 font-mono">
          {skill}
        </span>
        <span
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 font-mono"
          style={{ color }}
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

function BentoCard({ group, delay }: { group: SkillGroup; delay: number }) {
  // Use responsive span overrides or default to single column
  const spanClass = group.span || 'lg:col-span-1'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`col-span-1 ${spanClass} relative p-5 sm:p-6 rounded-2xl bg-[rgba(10,21,32,0.7)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm overflow-hidden group hover:border-[rgba(0,229,255,0.18)] transition-all duration-300 flex flex-col justify-between`}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${group.color}18` }}
      />

      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{group.icon}</span>
          <div className="min-w-0">
            <h3 className="font-bold text-[#e8f4f8] text-sm sm:text-base truncate">{group.label}</h3>
            <span
              className="text-xs block font-mono"
              style={{ color: group.color }}
            >
              {group.skills.length} techs
            </span>
          </div>
          <div
            className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
          />
        </div>

        {/* Skills list inside card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {group.skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} color={group.color} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SkillCloud({ allSkills }: { allSkills: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="p-5 sm:p-6 rounded-2xl bg-[rgba(6,13,20,0.8)] border border-[rgba(0,229,255,0.08)] font-mono"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,71,87,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,183,0,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(0,255,136,0.6)]" />
        <span className="text-xs text-[#6a87a0] ml-2">tech-stack.sh</span>
      </div>
      <div className="text-xs sm:text-sm">
        <div className="text-[#6a87a0]">
          $ <span className="text-[#8ba4b5]">echo $SKILLS</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.1)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.1)] transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 text-[#6a87a0]">
          $ <span className="text-[#00ff88]">{'//'} {allSkills.length} technologies and counting...</span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-[#6a87a0]">$</span>
          <span className="w-2 h-4 bg-[#00e5ff] animate-[blink_1.2s_step-end_infinite] inline-block" />
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const skillGroups = data.skills.groups || []
  const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.skills)))

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span
            className="text-xs text-[#00e5ff] tracking-widest uppercase font-mono"
          >
            03 / Tech Stack
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12"
        >
          Tools of the{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #ffb700)' }}
          >
            Trade
          </span>
        </motion.h2>

        {/* Bento Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, idx) => (
            <BentoCard key={group.label} group={group} delay={0.05 + idx * 0.05} />
          ))}

          {/* Terminal Skill Cloud - Full Width */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <SkillCloud allSkills={allSkills} />
          </div>
        </div>
      </div>
    </section>
  )
}