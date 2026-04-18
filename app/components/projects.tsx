import Link from 'next/link'
import { getProjects } from 'app/projects/utils'

export function Projects({ limit }: { limit?: number }) {
  let allProjects = getProjects().sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1
    }
    return 1
  })

  if (limit) allProjects = allProjects.slice(0, limit)

  return (
    <div>
      {allProjects.map((project) => (
        <Link
          key={project.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/projects/${project.slug}`}
        >
          <div className="w-full flex flex-col space-y-1">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
              {project.metadata.title}
            </p>
            {project.metadata.summary && (
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {project.metadata.summary}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
