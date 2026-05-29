'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type UseScrollProgressOptions = {
  offset?: number
}

type ScrollState = {
  progress: number
  isVisible: boolean
  scrollY: number
}

export function useScrollProgress(
  ref: React.RefObject<HTMLElement>,
  options?: UseScrollProgressOptions,
): ScrollState {
  const { offset = 0 } = options ?? {}
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    isVisible: false,
    scrollY: 0,
  })
  const ticking = useRef(false)

  const update = useCallback(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const vh = window.innerHeight

    const totalDistance = vh + rect.height + offset
    const currentPosition = vh - rect.top + offset
    const progress = Math.max(0, Math.min(1, currentPosition / totalDistance))
    const isVisible = rect.top < vh && rect.bottom > 0

    setState({ progress, isVisible, scrollY: window.scrollY })
    ticking.current = false
  }, [ref, offset])

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [update])

  return state
}
