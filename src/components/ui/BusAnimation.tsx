'use client'

import { useEffect, useRef, useState } from 'react'
import LottiePlayer from './LottiePlayer'

export default function BusAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="hidden lg:block shrink-0 ml-auto w-80 h-80 xl:w-[25rem] xl:h-[25rem] relative left-8"
    >
      {shouldLoad && (
        <LottiePlayer
          src="/bus-lottie.json"
          className="w-full h-full"
          autoplay
          loop
        />
      )}
    </div>
  )
}
