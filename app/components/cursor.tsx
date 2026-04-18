'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    document.body.classList.add('has-cursor')
    cursor.classList.add('active')
    ring.classList.add('active')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }
    const onLeave = () => {
      cursor.classList.add('hide')
      ring.classList.add('hide')
    }
    const onEnter = () => {
      cursor.classList.remove('hide')
      ring.classList.remove('hide')
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest?.('a, button')) ring.classList.add('on-link')
    }
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const related = e.relatedTarget as HTMLElement | null
      if (target?.closest?.('a, button') && !related?.closest?.('a, button')) {
        ring.classList.remove('on-link')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const animRing = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
