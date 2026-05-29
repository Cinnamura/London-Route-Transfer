'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'

type CountUpProps = {
  to: number
  duration?: number
  suffix?: string
}

export default function CountUp({ to, duration = 1500, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? to : 0
    }
    return 0
  })
  const locale = useLocale()

  useEffect(() => {
    if (count === to) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const startTime = performance.now()

        function easeOutQuart(t: number): number {
          return 1 - Math.pow(1 - t, 4)
        }

        function animate(now: number) {
          const elapsed = now - startTime
          const rawProgress = Math.min(elapsed / duration, 1)
          const easedProgress = easeOutQuart(rawProgress)
          const current = Math.round(easedProgress * to)

          setCount(current)

          if (rawProgress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration, count])

  const formatted = Intl.NumberFormat(locale).format(count)

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}{suffix}
    </span>
  )
}
