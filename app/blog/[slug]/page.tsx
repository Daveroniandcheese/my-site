import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts, readTime } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
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
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const rt = readTime(post.content)

  return (
    <section className="band" style={{ borderTop: 0, paddingTop: 0 }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'David Max Willey',
            },
          }),
        }}
      />
      <Link
        href="/blog"
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
        ↗ Back to writing
      </Link>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {formatDate(post.metadata.publishedAt).toUpperCase()} · {rt}
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
          margin: '8px 0 24px',
        }}
      >
        {post.metadata.title}
      </h1>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
