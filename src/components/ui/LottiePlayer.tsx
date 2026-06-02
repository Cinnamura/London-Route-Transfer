'use client'

import { useEffect, useRef } from 'react'

type LottieAnimationHandle = {
  totalFrames: number
  goToAndStop: (frame: number) => void
  play: () => void
  destroy: () => void
}

type LottiePlayerProps = {
  src: string
  className?: string
  autoplay?: boolean
  loop?: boolean
  progress?: number
  onReady?: (handle: LottieAnimationHandle) => void
}

export default function LottiePlayer({
  src,
  className,
  autoplay = true,
  loop = false,
  progress,
  onReady,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<LottieAnimationHandle | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false

    async function init() {
      const lottieMod = await import('lottie-web')
      const lottie = lottieMod.default || lottieMod

      if (cancelled) return

      const res = await fetch(src)
      const data = await res.json()

      if (cancelled) return

      const anim = lottie.loadAnimation({
        container: el!,
        animationData: data,
        autoplay: false,
        loop: false,
        renderer: 'svg',
      })

      const total = anim.totalFrames

      const handle: LottieAnimationHandle = {
        totalFrames: total,
        goToAndStop: (frame: number) => anim.goToAndStop(frame, true),
        play: () => {
          if (loop) {
            anim.loop = true
          }
          anim.play()
        },
        destroy: () => anim.destroy(),
      }

      animRef.current = handle
      onReady?.(handle)

      if (progress !== undefined) {
        handle.goToAndStop(Math.round(progress * (total - 1)))
      } else if (autoplay) {
        handle.play()
      }
    }

    init()

    return () => {
      cancelled = true
      animRef.current?.destroy()
      animRef.current = null
    }
  }, [src]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const anim = animRef.current
    if (!anim || progress === undefined) return
    anim.goToAndStop(Math.round(progress * (anim.totalFrames - 1)))
  }, [progress])

  return <div ref={containerRef} className={className} />
}
