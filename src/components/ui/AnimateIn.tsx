'use client'

import { useEffect, useRef, useState } from 'react'

type AnimateInProps = {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    if (isVisible) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVisible])

  const directionClass =
    direction === 'up'
      ? 'translate-y-6'
      : direction === 'left'
        ? '-translate-x-6'
        : 'translate-x-6'

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${directionClass}`
      }`}
      style={isVisible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
