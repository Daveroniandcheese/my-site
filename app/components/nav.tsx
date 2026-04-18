'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items: { href: string; label: string }[] = [
  { href: '/', label: 'index' },
  { href: '/projects', label: 'work' },
  { href: '/blog', label: 'writing' },
]

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href)

  return (
    <nav className="links" aria-label="Primary">
      {items.map(({ href, label }) => {
        const active = isActive(href) ? 'active' : ''
        return (
          <Link key={href} href={href} className={active}>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
