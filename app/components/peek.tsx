'use client'

import { useEffect, useRef } from 'react'

export default function Peek() {
  const peekRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const peek = peekRef.current
    const thumb = thumbRef.current
    const title = titleRef.current
    const meta = metaRef.current
    if (!peek || !thumb || !title || !meta) return

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        '[data-peek]'
      ) as HTMLElement | null
      if (!el) return
      title.textContent = el.dataset.peekTitle || ''
      meta.textContent = el.dataset.peekMeta || ''
      const hue = Math.floor(Math.random() * 360)
      thumb.style.background = `linear-gradient(135deg, var(--accent) 0%, hsl(${hue}, 40%, 25%) 100%)`
      peek.classList.add('show')
    }
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-peek]')
      const related = (e.relatedTarget as HTMLElement | null)?.closest?.(
        '[data-peek]'
      )
      if (el && !related) peek.classList.remove('show')
    }
    const onMove = (e: MouseEvent) => {
      peek.style.left = e.clientX + 'px'
      peek.style.top = e.clientY + 'px'
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={peekRef} className="peek" aria-hidden="true">
      <div ref={thumbRef} className="peek-thumb" />
      <div ref={titleRef} className="peek-title" />
      <div ref={metaRef} className="peek-meta" />
    </div>
  )
}
