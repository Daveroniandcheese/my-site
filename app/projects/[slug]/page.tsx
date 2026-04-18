import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate } from 'app/blog/utils'
import { getProjects } from 'app/projects/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let projects = getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let project = getProjects().find((p) => p.slug === slug)
  if (!project) return

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let project = getProjects().find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            description: project.metadata.summary,
            url: `${baseUrl}/projects/${project.slug}`,
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {project.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(project.metadata.publishedAt)}
          {project.metadata.url && (
            <>
              {' · '}
              <a
                href={project.metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                visit →
              </a>
            </>
          )}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
