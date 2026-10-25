'use client'

import { useEffect, useState, type RefObject } from 'react'
import { useInView } from 'framer-motion'

/**
 * SSR-safe `useInView`.
 *
 * The raw `useInView` hook reports `false` during server rendering, which would
 * bake `opacity: 0` into the prerendered HTML and leave the page blank for
 * visitors without JavaScript. This hook reports "visible" until the component
 * has mounted on the client, so the HTML ships with fully visible content and
 * the reveal animation only kicks in after hydration.
 */
export function useSafeInView<T extends Element>(
  ref: RefObject<T | null>,
  options?: Parameters<typeof useInView>[1]
) {
  const isIntersecting = useInView(ref as RefObject<Element>, options)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? isIntersecting : true
}
