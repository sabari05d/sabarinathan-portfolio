'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, Globe, Send, ArrowRight,Phone } from 'lucide-react'
import data from '@/data/portfolio.json'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
      color: '#00e5ff',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'sabari05d',
      href: data.contact.github,
      color: '#8ba4b5',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'sabarinathan-d',
      href: data.contact.linkedin,
      color: '#0a66c2',
    },
    // {
    //   icon: Globe,
    //   label: 'Portfolio',
    //   value: 'sabarinathand.netlify.app',
    //   href: data.contact.portfolio,
    //   color: '#00ff88',
    // },
    {
      icon: Phone,
      label: 'Mobile',
      value: '+91 63802 86191',
      href: `tel:+${data.contact.mobile}` ,
      color: '#00ff88',
    },
  ]

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(0,229,255,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
          <span
            className="text-xs text-[#00e5ff] tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            05 / Contact
          </span>
          <div className="h-px w-16 bg-[rgba(0,229,255,0.3)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Let&apos;s Build{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #00ff88)' }}>
            Something
          </span>{' '}
          Great
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8ba4b5] text-lg mb-12 max-w-xl mx-auto"
        >
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something meaningful.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <a
            href={`mailto:${data.contact.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00e5ff] text-[#020408] font-bold text-lg hover:bg-[#00b8cc] transition-all hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
          >
            <Send size={20} />
            Say Hello
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {contacts.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[rgba(10,21,32,0.6)] border border-[rgba(0,229,255,0.08)] backdrop-blur-sm hover:border-[rgba(0,229,255,0.2)] transition-all duration-300 text-left"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}12`, border: `1px solid ${c.color}25` }}
                >
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#4a6070] mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {c.label}
                  </p>
                  <p className="text-sm text-[#e8f4f8] truncate font-medium group-hover:text-white transition-colors">
                    {c.value}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-[#4a6070] group-hover:text-[#00e5ff] group-hover:translate-x-0.5 transition-all flex-shrink-0"
                />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
