import Link from 'next/link'
import { getBlogPosts, readTime } from 'app/blog/utils'

function formatShortDate(date: string) {
  const d = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
    .format(d)
    .toUpperCase()
}

export function BlogPosts({ limit }: { limit?: number } = {}) {
  let posts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )
  if (limit) posts = posts.slice(0, limit)

  return (
    <div className="writing-list in-view">
      {posts.map((post, i) => {
        const date = formatShortDate(post.metadata.publishedAt)
        const rt = readTime(post.content)
        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="post-row"
            data-peek
            data-peek-title={post.metadata.title}
            data-peek-meta={`${date} · ${rt.replace(' READ', '')}`}
          >
            <span className="num">{String(i + 1).padStart(3, '0')}</span>
            <span className="date">{date}</span>
            <span className="title">{post.metadata.title}</span>
            <span className="read">{rt}</span>
            <span className="arrow">↗</span>
          </Link>
        )
      })}
    </div>
  )
}
