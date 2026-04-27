'use client'

import { Terminal } from 'lucide-react'
import data from '@/data/portfolio.json'

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(0,229,255,0.06)] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)] flex items-center justify-center">
            <Terminal size={13} className="text-[#00e5ff]" />
          </div>
          <span
            className="text-sm text-[#4a6070]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            sabari<span className="text-[#00e5ff]">.</span>dev
          </span>
        </div>

        <p
          className="text-xs text-[#4a6070] text-center"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © {new Date().getFullYear()} {data.name} · <span className="text-[#00e5ff]">//</span> building things that matter
        </p>
      </div>
    </footer>
  )
}
