const links = [
  { label: 'rss', href: '/rss' },
  { label: 'github / daveroniandcheese', href: 'https://github.com/Daveroniandcheese' },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/david-willey-1062043b/',
  },
  { label: 'davidmaxwilley@gmail.com', href: 'mailto:davidmaxwilley@gmail.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="foot">
      <div className="elsewhere">
        <div className="eyebrow">Elsewhere</div>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            rel="noopener noreferrer"
            target={href.startsWith('http') ? '_blank' : undefined}
          >
            <span className="arr">↗</span> {label}
          </a>
        ))}
      </div>
      <div className="copyright">
        <span className="big">Dave.</span>© {year} · Milwaukee, WI
        <br />
        Built in public with opinions.
      </div>
    </footer>
  )
}
