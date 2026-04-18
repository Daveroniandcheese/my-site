import Link from 'next/link'
import Eyebrow from 'app/components/eyebrow'

export default function NotFound() {
  return (
    <section className="band" style={{ borderTop: 0, paddingTop: 0 }}>
      <Eyebrow idx="404">NOT FOUND</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--ff-display)',
          fontSize: '32px',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          margin: '8px 0 16px',
          color: 'var(--ink)',
        }}
      >
        {'// '}Page not found
      </h1>
      <p style={{ color: 'var(--ink-dim)', marginBottom: '24px' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="view-all">
        Back to index <span>↗</span>
      </Link>
    </section>
  )
}
