import Link from 'next/link'
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

  const { title, publishedAt, url, tag, year, status } = project.metadata
  const metaBits = [
    formatDate(publishedAt).toUpperCase(),
    tag,
    year,
    status,
  ].filter(Boolean)

  return (
    <section className="band" style={{ borderTop: 0, paddingTop: 0 }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: title,
            datePublished: publishedAt,
            description: project.metadata.summary,
            url: `${baseUrl}/projects/${project.slug}`,
          }),
        }}
      />
      <Link
        href="/projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--ff-mono)',
          fontSize: 12,
          color: 'var(--ink-faint)',
          marginBottom: 24,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        ↗ Back to work
      </Link>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {metaBits.join(' · ')}
      </div>
      <h1
        className="title"
        style={{
          fontFamily: 'var(--ff-display)',
          fontSize: 36,
          fontWeight: 500,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--ink)',
          margin: '8px 0 16px',
        }}
      >
        {title}
      </h1>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-all"
          style={{ marginTop: 0, marginBottom: 24 }}
        >
          Visit site <span>↗</span>
        </a>
      )}
      <article className="prose" style={{ marginTop: 24 }}>
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
