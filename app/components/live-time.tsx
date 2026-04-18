'use client'

import { useEffect, useState } from 'react'

export default function LiveTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date())
      setTime(formatted)
    }
    update()
    const id = window.setInterval(update, 30000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="v">
      Milwaukee, WI{time ? ` · ${time} CT` : ''}
    </span>
  )
}
