'use client'

import { useEffect, useRef, useState } from 'react'

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    function handleChange(e: MediaQueryListEvent) {
      setReducedMotion(e.matches)
    }

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    function handleScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reducedMotion])

  const translateY = reducedMotion ? 0 : Math.min(scrollY * 0.35, 150)

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 -top-16 -bottom-16"
      style={{ transform: `translateY(${translateY}px)`, willChange: 'transform' }}
    >
      <img
        src="/Background.png"
        alt=""
        className="h-full w-full object-cover opacity-30 blur-[2px]"
        aria-hidden
      />
    </div>
  )
}
