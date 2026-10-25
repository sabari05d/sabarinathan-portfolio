'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import type { Experience, Portfolio } from '@/types/portfolio'

const data = portfolioData as Portfolio

function roleAccent(exp: Experience) {
  if (exp.current) return '#00e5ff'
  if (exp.role.includes('Backend')) return '#ffb700'
  if (exp.role.includes('Frontend')) return '#38bdf8'
  if (exp.role.includes('Full Stack')) return '#00ff88'
  return '#8ba4b5'
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="experience" ref={ref} className="relative py-20 sm:py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_30%,rgba(255,183,0,0.03)_0%,transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto">
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
            04 / Experience
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Career{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #00ff88)' }}>
            Journey
          </span>
        </motion.h2>

        <div className="relative">
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-[rgba(0,229,255,0.15)]"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8">
            {data.experience.map((exp, i) => {
              const color = roleAccent(exp)
              const isCurrent = Boolean(exp.current)

              return (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-16"
                >
                  <div
                    className="absolute left-[1.5rem] top-5 w-4 h-4 rounded-full border-2 bg-[#020408] -translate-x-1/2 flex items-center justify-center"
                    style={{
                      borderColor: color,
                      boxShadow: isCurrent ? `0 0 12px ${color}` : undefined,
                    }}
                  >
                    {isCurrent && (
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                        animate={reduce ? { scale: 1 } : { scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  <div className="group p-6 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm hover:border-[rgba(0,229,255,0.15)] transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                            style={{
                              color,
                              backgroundColor: `${color}12`,
                              border: `1px solid ${color}30`,
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {exp.role}
                          </span>
                          {isCurrent && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              Current
                            </span>
                          )}
                          {exp.employmentType && (
                            <span
                              className="text-xs text-[#6a87a0]"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {exp.employmentType}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#e8f4f8]">{exp.company}</p>
                        {exp.location && (
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8ba4b5]">
                            <MapPin size={12} className="flex-shrink-0" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-xs text-[#8ba4b5]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <Calendar size={12} />
                        {exp.duration}
                      </div>
                    </div>

                    {exp.highlights && exp.highlights.length > 0 ? (
                      <ul className="space-y-1.5">
                        {exp.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[#8ba4b5] leading-relaxed">
                            <span className="text-[#00e5ff] mt-1.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      exp.description && (
                        <p className="text-sm text-[#8ba4b5] leading-relaxed">{exp.description}</p>
                      )
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
