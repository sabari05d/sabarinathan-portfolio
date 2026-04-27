# Sabarinathan D — Developer Portfolio

A high-end, "developer-first" portfolio built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

## ⚡ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Dark Mode by default)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Syne (display) + JetBrains Mono (code)

---

## 📁 File Structure

```
sabarinathan-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with font injection & metadata
│   │   ├── page.tsx            # Main page — composes all sections
│   │   └── globals.css         # Global styles, grid bg, glassmorphism, animations
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Sticky nav with active section tracking
│   │   │   └── Footer.tsx      # Minimal footer
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Typewriter + particles + CTA
│   │   │   ├── AboutSection.tsx     # Bio, education, achievements
│   │   │   ├── ProjectsSection.tsx  # Spotlight hover grid
│   │   │   ├── SkillsSection.tsx    # Bento box layout
│   │   │   ├── ExperienceSection.tsx # Animated timeline
│   │   │   └── ContactSection.tsx   # Contact links + CTA
│   │   │
│   │   └── ui/
│   │       └── CommandPalette.tsx   # Cmd+K palette with keyboard navigation
│   │
│   ├── lib/
│   │   └── utils.ts            # cn() utility (clsx + tailwind-merge)
│   │
│   └── data/
│       └── portfolio.json      # Single source of truth for all content
│
├── tailwind.config.js          # Full dark-theme color palette + animations
├── next.config.js
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 🎨 Design Decisions

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| `canvas-950` | `#020408` | Base background |
| `cyan` | `#00e5ff` | Primary accent (interactive) |
| `emerald` | `#00ff88` | Secondary / status |
| `amber` | `#ffb700` | Highlights / warnings |
| `ink-primary` | `#e8f4f8` | Headings |
| `ink-secondary` | `#8ba4b5` | Body text |

### Typography
- **Syne** — Display font for headings (bold, modern)
- **JetBrains Mono** — Monospace for code labels, terminal elements

### Features
- ✅ **Command Palette** (Cmd+K) — navigate sections, open links, find projects
- ✅ **Spotlight hover effect** — mouse-tracked radial glow on project cards
- ✅ **Typewriter hero** — animated role rotation
- ✅ **Bento skills grid** — animated progress bars by category
- ✅ **Timeline experience** — animated vertical timeline
- ✅ **Scan line effect** — subtle CRT aesthetic
- ✅ **Active nav tracking** — highlights current section
- ✅ **Floating particles** — subtle ambient animation
- ✅ **Glassmorphism cards** — backdrop blur + border glow

---

## 📦 Deploy to Vercel

```bash
npm run build
# Then push to GitHub and import on vercel.com
```

Or one-click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

---

## 🔧 Customization

All content is driven from `src/data/portfolio.json`. Update that file and everything rebuilds automatically. No hardcoded strings in components.

To add a new section:
1. Create `src/components/sections/NewSection.tsx`
2. Import and add to `src/app/page.tsx`
3. Add nav link to `Navbar.tsx`
4. Add command to `CommandPalette.tsx`
