'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Target,
  Trophy,
  Heart,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
} from 'lucide-react'
import data from '@/data/portfolio.json'
import type { TimelineItem, Portfolio } from '@/types/portfolio'

const typedData = data as Portfolio

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

// Category Badge Color Helper
function getCategoryBadge(category: string) {
  switch (category) {
    case 'Experience':
      return { color: 'text-[#00e5ff] bg-[rgba(0,229,255,0.1)] border-[rgba(0,229,255,0.25)]', icon: Briefcase }
    case 'Education':
      return { color: 'text-[#00ff88] bg-[rgba(0,255,136,0.1)] border-[rgba(0,255,136,0.25)]', icon: GraduationCap }
    case 'Certification':
      return { color: 'text-[#ffb700] bg-[rgba(255,183,0,0.1)] border-[rgba(255,183,0,0.25)]', icon: Award }
    case 'Training':
      return { color: 'text-[#a855f7] bg-[rgba(168,85,247,0.1)] border-[rgba(168,85,247,0.25)]', icon: Code2 }
    default:
      return { color: 'text-[#ff6b8a] bg-[rgba(255,107,138,0.1)] border-[rgba(255,107,138,0.25)]', icon: Sparkles }
  }
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0
  const { color: catColor, icon: CatIcon } = getCategoryBadge(item.category)

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-center mb-12 ${isEven ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* Spacer for two-column timeline */}
      <div className="w-full md:w-1/2" />

      {/* Center Timeline Point Icon */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#0a1520] border-2 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.4)]">
        <CatIcon size={16} className="text-[#00e5ff]" />
      </div>

      {/* Card Body */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${isEven ? 'md:pr-0' : 'md:pl-0'
          }`}
      >
        <div className="p-6 rounded-2xl bg-[rgba(10,21,32,0.7)] border border-[rgba(0,229,255,0.08)] backdrop-blur-md shadow-xl hover:border-[rgba(0,229,255,0.2)] transition-all group">
          {/* Top metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs text-[#00e5ff] font-semibold font-mono">
              {item.period}
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full font-medium font-mono border ${catColor}`}
              >
                <CatIcon size={10} />
                {item.category}
              </span>

              <span
                className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-mono border ${item.status === 'Ongoing' || item.status === 'Active'
                  ? 'text-[#00ff88] bg-[rgba(0,255,136,0.1)] border-[rgba(0,255,136,0.25)]'
                  : 'text-[#8ba4b5] bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]'
                  }`}
              >
                {item.status === 'Ongoing' || item.status === 'Active' ? (
                  <Clock size={9} />
                ) : (
                  <CheckCircle2 size={9} />
                )}
                {item.status}
              </span>
            </div>
          </div>

          {/* Title & Org */}
          <h4 className="text-lg font-bold text-[#e8f4f8] group-hover:text-white transition-colors">
            {item.title}
          </h4>
          <p className="text-sm text-[#6a87a0] mb-3 font-medium">{item.organization}</p>

          {/* Description */}
          <p className="text-sm text-[#8ba4b5] leading-relaxed mb-4">{item.description}</p>

          {/* Impact Metrics Grid (if available) */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.08)]">
              {item.metrics.map((m, mIdx) => (
                <div key={mIdx}>
                  <div className="text-sm font-bold text-[#00e5ff]">{m.value}</div>
                  <div className="text-[10px] text-[#8ba4b5] leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8ba4b5] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Scroll Progress Line Transformation
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })

  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const timelineItems = typedData.timeline || []

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-32 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex items-center gap-3 mb-4"
        >
          <span
            className="text-xs text-[#00e5ff] tracking-widest uppercase font-mono"
          >
            01 / About
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        {/* Existing Grid Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 sm:mb-32">
          {/* Left: Text content */}
          <div>
            <motion.h2
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Who Am I?
            </motion.h2>

            <motion.p
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="text-[#8ba4b5] text-lg leading-relaxed mb-6"
            >
              {data.summary}
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="text-[#8ba4b5] leading-relaxed mb-8"
            >
              {data.subsummary}
            </motion.p>

            {/* Motivations */}
            <motion.div
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              {[
                'Building Scalable Web Apps',
                'Exploring New Technologies',
                'Learning & Sharing Knowledge',
                'Fitness & Personal Growth',
              ].map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.08)]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] flex-shrink-0" />
                  <span className="text-sm text-[#8ba4b5]">{m}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Info Cards */}
          <div className="space-y-4">
            {/* Education */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="p-5 sm:p-6 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-[#00e5ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8f4f8] text-base leading-tight">Education</h3>
                  <p className="text-[11px] text-[#6a87a0] font-mono mt-0.5">Academic Qualifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div
                    key={edu.course}
                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,229,255,0.2)] transition-all duration-300"
                  >
                    {/* Top Meta: Degree Tag, Time & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[rgba(0,229,255,0.1)] text-[#00e5ff] font-mono text-xs font-semibold border border-[rgba(0,229,255,0.25)]">
                          {edu.degree}
                        </span>
                        <span className="text-xs text-[#6a87a0] font-mono flex items-center gap-1">
                          <Calendar size={11} className="text-[#00e5ff]/60" />
                          {edu.time}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full font-mono border ${
                          edu.status === 'Ongoing'
                            ? 'bg-[rgba(0,255,136,0.1)] text-[#00ff88] border-[rgba(0,255,136,0.25)]'
                            : 'bg-[rgba(255,255,255,0.05)] text-[#8ba4b5] border-[rgba(255,255,255,0.1)]'
                        }`}
                      >
                        {edu.status === 'Ongoing' ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                        ) : (
                          <CheckCircle2 size={11} className="text-[#00e5ff]" />
                        )}
                        {edu.status}
                      </span>
                    </div>

                    {/* Course Title - Full width to breathe without wrapping constraints */}
                    <h4 className="text-base font-bold text-[#e8f4f8] leading-snug">
                      {edu.course}
                    </h4>

                    {/* Institution */}
                    <p className="text-xs text-[#8ba4b5] mt-1 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/50 flex-shrink-0" />
                      <span>{edu.institution}</span>
                    </p>

                    {/* Mode & Score Badges */}
                    {(edu.mode || edu.score) && (
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.04)]">
                        {edu.score && (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[rgba(255,183,0,0.08)] border border-[rgba(255,183,0,0.2)] text-[#ffb700] font-mono">
                            <Award size={11} />
                            Score: {edu.score}
                          </span>
                        )}
                        {edu.mode && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-[#6a87a0] font-mono">
                            {edu.mode}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bullet Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="mt-2.5 space-y-1.5">
                        {edu.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#8ba4b5] leading-relaxed">
                            <span className="text-[#00e5ff] text-[11px] mt-0.5 flex-shrink-0 font-mono">›</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,183,0,0.1)] flex items-center justify-center">
                  <Trophy size={15} className="text-[#ffb700]" />
                </div>
                <h3 className="font-semibold text-[#e8f4f8]">Achievements</h3>
              </div>
              <div className="space-y-2">
                {data.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-2.5">
                    <span className="text-[#ffb700] mt-0.5 flex-shrink-0">🏆</span>
                    <p className="text-sm text-[#8ba4b5]">{a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
                  <Heart size={15} className="text-[#00ff88]" />
                </div>
                <h3 className="font-semibold text-[#e8f4f8]">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-full text-sm bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.15)] text-[#8ba4b5]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- SCROLL-DRIVEN TIMELINE SECTION --- */}
        <div ref={timelineRef} className="relative pt-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span
              className="text-xs text-[#00e5ff] tracking-widest uppercase font-mono block mb-2"
            >
              Career & Journey
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8f4f8]">
              The Story So Far
            </h3>
          </div>

          {/* Timeline Center Beam Line */}
          <div className="absolute left-4 md:left-1/2 top-28 bottom-0 -translate-x-1/2 w-0.5 bg-[rgba(255,255,255,0.06)]">
            <motion.div
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-[#00e5ff] via-[#00ff88] to-[#ffb700] shadow-[0_0_12px_#00e5ff]"
            />
          </div>

          {/* Render Timeline Cards */}
          <div className="relative">
            {timelineItems.map((item, idx) => (
              <TimelineCard key={item.title + idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}