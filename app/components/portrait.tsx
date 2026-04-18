import Image from 'next/image'

export default function Portrait() {
  return (
    <div className="portrait-wrap">
      <div className="portrait">
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
        <Image
          src="/headshot.png"
          alt="Dave Willey"
          fill
          sizes="(min-width: 860px) 280px, 220px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <span className="portrait-label">FIG. 01 — THE AUTHOR</span>
    </div>
  )
}
