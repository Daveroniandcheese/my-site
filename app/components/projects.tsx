import Link from 'next/link'
import { getProjects } from 'app/projects/utils'

export function Projects({ limit }: { limit?: number } = {}) {
  let all = getProjects().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )
  if (limit) all = all.slice(0, limit)

  return (
    <div className="work-list in-view">
      {all.map((project, i) => {
        const { title, summary, tag, year, status } = project.metadata
        const yearLabel = [year, status].filter(Boolean).join(' — ')
        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="work-row"
            data-peek
            data-peek-title={title}
            data-peek-meta={[year, tag].filter(Boolean).join(' · ')}
          >
            <span className="num">{String(i + 1).padStart(3, '0')}</span>
            <span>
              <span className="title">{title}</span>
              {tag && <span className="tag">{tag}</span>}
            </span>
            <span className="summary">{summary}</span>
            <span className="year">{yearLabel}</span>
            <span className="arrow">↗</span>
          </Link>
        )
      })}
    </div>
  )
}
