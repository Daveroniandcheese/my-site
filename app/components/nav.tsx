'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items: { href: string; label: string; external?: boolean }[] = [
  { href: '/', label: 'index' },
  { href: '/projects', label: 'work' },
  { href: '/blog', label: 'writing' },
  { href: '/rss', label: 'rss', external: true },
]

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href)

  return (
    <nav className="links" aria-label="Primary">
      {items.map(({ href, label, external }) => {
        const active = isActive(href) ? 'active' : ''
        if (external) {
          return (
            <a key={href} href={href} className={active} data-no-peek>
              {label}
            </a>
          )
        }
        return (
          <Link key={href} href={href} className={active}>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
