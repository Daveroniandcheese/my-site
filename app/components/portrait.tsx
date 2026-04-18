export default function Portrait() {
  return (
    <div className="portrait-wrap">
      <div className="portrait">
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
        <svg
          viewBox="0 0 200 250"
          preserveAspectRatio="xMidYMid slice"
          aria-label="Portrait placeholder"
        >
          <defs>
            <linearGradient id="p-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22222b" />
              <stop offset="100%" stopColor="#0e0e12" />
            </linearGradient>
            <pattern
              id="p-dots"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.6" fill="#2a2a33" />
            </pattern>
          </defs>
          <rect width="200" height="250" fill="url(#p-bg)" />
          <rect width="200" height="250" fill="url(#p-dots)" />
          <g opacity="0.85">
            <ellipse cx="100" cy="95" rx="42" ry="48" fill="#1a1a22" />
            <path
              d="M30 250 Q30 160 100 155 Q170 160 170 250 Z"
              fill="#1a1a22"
            />
            <path
              d="M30 250 Q30 160 100 155 Q170 160 170 250 Z"
              fill="none"
              stroke="#d4ff3a"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.25"
            />
          </g>
          <text
            x="12"
            y="240"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8"
            fill="#5a5a62"
            letterSpacing="1"
          >
            PLACEHOLDER.JPG
          </text>
        </svg>
      </div>
      <span className="portrait-label">FIG. 01 — THE AUTHOR</span>
    </div>
  )
}
