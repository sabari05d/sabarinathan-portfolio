'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Target, Trophy, Heart } from 'lucide-react'
import data from '@/data/portfolio.json'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
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
            className="text-xs text-[#00e5ff] tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            01 / About
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              I specialize in developing secure and scalable applications, from e-commerce platforms to data-driven web solutions. My recent work includes backend security enhancements, real-time applications, and cloud integrations.
            </motion.p>

            {/* Motivations */}
            <motion.div
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              {['Building Scalable Web Apps', 'Exploring New Technologies', 'Learning & Sharing Knowledge', 'Fitness & Personal Growth'].map((m) => (
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

          {/* Right: Stats / Info cards */}
          <div className="space-y-4">
            {/* Education */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,229,255,0.1)] flex items-center justify-center">
                  <Target size={15} className="text-[#00e5ff]" />
                </div>
                <h3 className="font-semibold text-[#e8f4f8]">Education</h3>
              </div>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.degree} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-[#e8f4f8]">{edu.course}</p>
                      <p className="text-xs text-[#4a6070]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {edu.time}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        edu.status === 'Ongoing'
                          ? 'bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]'
                          : 'bg-[rgba(0,229,255,0.08)] text-[#00e5ff] border border-[rgba(0,229,255,0.15)]'
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {edu.status}
                    </span>
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
      </div>
    </section>
  )
}
