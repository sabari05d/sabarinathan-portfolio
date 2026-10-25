'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Monitor,
  Server,
  Sparkles,
  Database,
  Smartphone,
  Wrench,
  Code2,
  Layers,
  Workflow,
  Lock,
  Link,
  Bug,
  Gauge,
  Plug,
  Rocket,
  GitBranch,
  Lightbulb,
  Flag,
  Compass,
  Repeat,
  Handshake,
  Focus,
  Trophy,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import type {
  EngineeringCapability,
  PersonalItem,
  Portfolio,
  SkillCategory,
  TechnicalSkill,
} from '@/types/portfolio'

const data = portfolioData as Portfolio

const lucideIcons: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Sparkles,
  Database,
  Smartphone,
  Wrench,
  Code2,
  Layers,
  Workflow,
  Lock,
  Link,
  Bug,
  Gauge,
  Plug,
  Rocket,
  GitBranch,
  Lightbulb,
  Flag,
  Compass,
  Repeat,
  Handshake,
  Focus,
  Trophy,
  Activity,
}

function resolveIcon(name: string): LucideIcon {
  return lucideIcons[name] ?? Code2
}

function levelTone(level?: TechnicalSkill['level']) {
  switch (level) {
    case 'Hands-on':
      return '#00e5ff'
    case 'Working knowledge':
      return '#ffb700'
    case 'Foundational':
      return '#8ba4b5'
    default:
      return '#6a87a0'
  }
}

function CategoryCard({
  category,
  delay,
  reduce,
}: {
  category: SkillCategory
  delay: number
  reduce: boolean | null
}) {
  const Icon = resolveIcon(category.icon)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col p-5 sm:p-6 rounded-2xl bg-[rgba(10,21,32,0.7)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm overflow-hidden group hover:border-[rgba(0,229,255,0.18)] transition-all duration-300"
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${category.color}18` }}
      />

      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: `${category.color}14`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <Icon size={16} style={{ color: category.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#e8f4f8] text-sm sm:text-base">{category.label}</h3>
            <span
              className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color, boxShadow: `0 0 8px ${category.color}` }}
            />
          </div>
          <p className="text-xs text-[#8ba4b5] leading-relaxed mt-1">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            title={skill.evidence ? `${skill.level ?? ''} · ${skill.evidence}` : skill.level}
            className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 max-w-full px-2.5 py-1.5 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-xs text-[#e8f4f8]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="whitespace-normal break-words">{skill.name}</span>
            {skill.level && (
              <span
                className="text-[10px] whitespace-nowrap"
                style={{ color: levelTone(skill.level) }}
              >
                {skill.level}
              </span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function CapabilityCard({
  item,
  delay,
  reduce,
}: {
  item: EngineeringCapability
  delay: number
  reduce: boolean | null
}) {
  const Icon = resolveIcon(item.icon)

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduce ? 0 : 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.18)] transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)] flex items-center justify-center flex-shrink-0">
          <Icon size={15} className="text-[#00e5ff]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-[#e8f4f8] mb-1">{item.title}</h4>
          <p className="text-xs text-[#8ba4b5] leading-relaxed">{item.description}</p>
          {item.relatedProject && (
            <span
              className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-[rgba(0,229,255,0.08)] text-[#00e5ff] border border-[rgba(0,229,255,0.18)]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.relatedProject}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function QuietCard({
  item,
  delay,
  reduce,
  accent,
}: {
  item: PersonalItem
  delay: number
  reduce: boolean | null
  accent: string
}) {
  const Icon = resolveIcon(item.icon)

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduce ? 0 : 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-4 rounded-xl bg-[rgba(10,21,32,0.45)] border border-[rgba(255,255,255,0.06)]"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={14} style={{ color: accent }} />
        <h4 className="text-sm font-semibold text-[#e8f4f8]">{item.title}</h4>
      </div>
      <p className="text-xs text-[#8ba4b5] leading-relaxed">{item.description}</p>
    </motion.article>
  )
}

function ProfileTerminal({ reduce }: { reduce: boolean | null }) {
  const currentRole = data.experience.find((item) => item.current) ?? data.experience.at(-1)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.55, delay: 0.1 }}
      className="p-5 sm:p-6 rounded-2xl bg-[rgba(6,13,20,0.8)] border border-[rgba(0,229,255,0.08)]"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,71,87,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,183,0,0.6)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(0,255,136,0.6)]" />
        <span className="text-xs text-[#6a87a0] ml-2">profile.sh</span>
      </div>
      <div className="text-xs sm:text-sm space-y-3 text-[#8ba4b5] leading-relaxed">
        <p>
          $ <span className="text-[#e8f4f8]">whoami</span>
        </p>
        <p className="pl-3 text-[#00e5ff]">
          {data.name} · {data.title}
        </p>
        <p>
          $ <span className="text-[#e8f4f8]">cat ~/.profile</span>
        </p>
        <div className="pl-3 space-y-1">
          <p>
            <span className="text-[#6a87a0]">company</span>{' '}
            <span className="text-[#e8f4f8]">{currentRole?.company ?? 'Independent'}</span>
          </p>
          <p>
            <span className="text-[#6a87a0]">focus</span>{' '}
            <span className="text-[#e8f4f8]">web apps, APIs, databases</span>
          </p>
          <p>
            <span className="text-[#6a87a0]">style</span>{' '}
            <span className="text-[#e8f4f8]">debug, ship, keep it maintainable</span>
          </p>
        </div>
        <p>
          $ <span className="text-[#00ff88]">echo $NOW</span>
        </p>
        <p className="pl-3">Building reliable software — and following cricket on the side.</p>
        <p className="flex items-center gap-1">
          <span>$</span>
          <span className="w-2 h-4 bg-[#00e5ff] animate-[blink_1.2s_step-end_infinite] inline-block" />
        </p>
      </div>
    </motion.div>
  )
}

function SectionLabel({
  kicker,
  title,
  delay,
  inView,
}: {
  kicker: string
  title: string
  delay: number
  inView: boolean
}) {
  return (
    <div className="mb-6">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className="text-xs tracking-widest uppercase text-[#6a87a0] mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {kicker}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.05 }}
        className="text-xl sm:text-2xl font-bold text-[#e8f4f8]"
      >
        {title}
      </motion.h3>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const { categories, capabilities, strengths, interests } = data.skills

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
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
            03 / Skills
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
        >
          What I know,{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #ffb700)' }}
          >
            what I can do
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base text-[#8ba4b5] max-w-2xl mb-10 sm:mb-12"
        >
          A verified stack from shipped work, the engineering I actually perform, and a little of who I am outside the editor.
        </motion.p>

        <div className="mb-14">
          <SectionLabel
            kicker="01 — Stack"
            title="Technical skills"
            delay={0.1}
            inView={inView}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categories.map((category, idx) => (
              <CategoryCard
                key={category.id}
                category={category}
                delay={0.04 + idx * 0.04}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <SectionLabel
            kicker="02 — Work"
            title="Engineering capabilities"
            delay={0.1}
            inView={inView}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {capabilities.map((item, idx) => (
              <CapabilityCard key={item.title} item={item} delay={0.04 + idx * 0.03} reduce={reduce} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div>
            <SectionLabel
              kicker="03 — Character"
              title="Personal strengths"
              delay={0.1}
              inView={inView}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strengths.map((item, idx) => (
                <QuietCard
                  key={item.title}
                  item={item}
                  delay={0.04 + idx * 0.04}
                  reduce={reduce}
                  accent="#ffb700"
                />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel
              kicker="04 — Off the clock"
              title="Beyond the code"
              delay={0.1}
              inView={inView}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {interests.map((item, idx) => (
                <QuietCard
                  key={item.title}
                  item={item}
                  delay={0.04 + idx * 0.04}
                  reduce={reduce}
                  accent="#00ff88"
                />
              ))}
            </div>
            <ProfileTerminal reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  )
}
