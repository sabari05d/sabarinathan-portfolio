/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core canvas
        canvas: {
          950: '#020408',
          900: '#060d14',
          800: '#0a1520',
          700: '#0f1e2d',
          600: '#152638',
        },
        // Neon cyan accent — primary interactive color
        cyan: {
          DEFAULT: '#00e5ff',
          dim: '#00b8cc',
          glow: 'rgba(0,229,255,0.15)',
          border: 'rgba(0,229,255,0.25)',
        },
        // Emerald — secondary/success
        emerald: {
          DEFAULT: '#00ff88',
          dim: '#00cc6a',
          glow: 'rgba(0,255,136,0.12)',
        },
        // Amber — warnings / highlights
        amber: {
          DEFAULT: '#ffb700',
          dim: '#cc9200',
          glow: 'rgba(255,183,0,0.12)',
        },
        // Text hierarchy
        ink: {
          primary: '#e8f4f8',
          secondary: '#8ba4b5',
          muted: '#4a6070',
          ghost: '#253340',
        },
        // Glass surfaces
        glass: {
          light: 'rgba(14,28,42,0.6)',
          medium: 'rgba(10,21,32,0.8)',
          border: 'rgba(0,229,255,0.08)',
          hover: 'rgba(0,229,255,0.04)',
        },
      },
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Menlo', 'monospace'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)`,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.12) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,229,255,0.2), 0 0 60px rgba(0,229,255,0.08)',
        'glow-cyan-lg': '0 0 40px rgba(0,229,255,0.3), 0 0 120px rgba(0,229,255,0.1)',
        'glow-emerald': '0 0 20px rgba(0,255,136,0.2)',
        'glow-amber': '0 0 20px rgba(255,183,0,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
