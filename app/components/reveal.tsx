'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.remove('loaded')
    const raf = requestAnimationFrame(() => {
      window.setTimeout(() => document.body.classList.add('loaded'), 80)
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.in-view').forEach((el) => io.observe(el))

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [pathname])

  return null
}
