import type { Variants } from 'framer-motion'

/** Shared cubic-bezier used across the site (matches the "ease-out-expo" feel). */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Fade-up variant used by the About section. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
}
