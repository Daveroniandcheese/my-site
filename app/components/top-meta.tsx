import Link from 'next/link'

export default function TopMeta() {
  return (
    <header className="top">
      <div className="meta-l">
        <Link href="/" className="brand">Dave Willey</Link>
        <span>
          <span className="dot" />
          open to work
        </span>
      </div>
    </header>
  )
}
