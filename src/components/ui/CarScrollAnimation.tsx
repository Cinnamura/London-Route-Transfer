'use client'

import { useEffect, useRef, useState } from 'react'
import LottiePlayer from './LottiePlayer'

export default function CarScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const ticking = useRef(false)
  const trackWidthRef = useRef(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return

    function measure() {
      if (sectionRef.current) {
        const parent = sectionRef.current.parentElement
        trackWidthRef.current = parent ? parent.clientWidth - 80 : 0
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [shouldLoad])

  useEffect(() => {
    if (!shouldLoad) return

    function update() {
      if (!sectionRef.current || !carRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const totalDist = vh + rect.height
      const current = vh - rect.top
      const p = Math.max(0, Math.min(1, current / totalDist))

      const travelStart = 0.2                      // 0–30% скролла — стоит                                                                                                                                                                   
     const travelP = p < travelStart               // считаем прогресс движения отдельно                                                                                                                                                      
       ? 0                                                                                                                                                                                                                                    
       : (p - travelStart) / (1 - travelStart)                                                                                                                                                                                                
                                                                                                                                                                                                                                              
     const maxTranslate = Math.max(0, trackWidthRef.current)                                                                                                                                                                                  
     const translateX = maxTranslate * travelP * 1.5                                                                                                                                                                                          
     const opacity = travelP < 0.35                                                                                                                                                                                                           
       ? 1                                                                                                                                                                                                                                    
       : Math.max(0, 1 - (travelP - 0.35) / 0.65)

      carRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`
      carRef.current.style.opacity = String(opacity)

      ticking.current = false
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [shouldLoad])

  return (
    <div
      ref={sectionRef}
      className="hidden lg:block absolute bottom-0 left-0 w-full h-0 overflow-visible z-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={carRef}
          className="absolute will-change-transform"
          style={{
            width: '10rem',
            height: '10rem',
            left: '5%',
            bottom: '-1.5rem',
          }}
        >
          {shouldLoad && (
            <LottiePlayer
              src="/car-lottie.json"
              className="w-full h-full"
              autoplay
              loop
            />
          )}
        </div>
      </div>
    </div>
  )
}
