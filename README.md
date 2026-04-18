# Personal site

Next.js 16 + Tailwind v4 + MDX. Forked from [Vercel's portfolio-blog-starter](https://github.com/vercel/examples/tree/main/solutions/blog) and scaffolded with a projects section added alongside the blog.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Before deploying — find and replace these

Search the repo for `TODO:` comments. The important ones:

- **`app/sitemap.ts`** — `baseUrl` is set to `https://yourdomain.com`. Replace with your real domain (no trailing slash). This drives the sitemap, metadataBase, OG image URLs, and JSON-LD.
- **`app/layout.tsx`** — `SITE_NAME` and `SITE_DESCRIPTION` at the top of the file. These cascade to `<title>`, Open Graph, and the title template.
- **`app/page.tsx`** — the `<h1>` (your name) and the bio paragraph.
- **`app/components/footer.tsx`** — the `footerLinks` array. Fill in real GitHub, LinkedIn, email. Delete any you don't want.

## Writing

### Blog posts
Drop a `.mdx` file into `app/blog/posts/`. Filename = URL slug. Frontmatter shape:

```
---
title: 'Post title'
publishedAt: '2026-04-18'
summary: 'One-line summary for the post list and link previews.'
---
```

### Projects
Drop a `.mdx` file into `app/projects/projects/`. Same format as posts, plus an optional `url` field for an outbound link (live site, GitHub repo, etc.):

```
---
title: 'Project name'
publishedAt: '2026-04-18'
summary: 'One-liner for the project card.'
url: 'https://example.com'
---
```

Delete `app/blog/posts/hello-world.mdx` and `app/projects/projects/example-project.mdx` once you have real content.

## Project structure

```
app/
├── page.tsx                      # Homepage (bio + featured work + recent posts)
├── layout.tsx                    # Root layout + metadata defaults
├── sitemap.ts                    # ⚠ baseUrl lives here
├── robots.ts
├── rss/route.ts                  # /rss feed
├── og/route.tsx                  # Dynamic OG image generation
├── blog/
│   ├── page.tsx                  # Blog index
│   ├── [slug]/page.tsx           # Individual post renderer
│   ├── utils.ts                  # MDX loading + date formatting
│   └── posts/*.mdx               # ← Your posts go here
├── projects/
│   ├── page.tsx                  # Projects index
│   ├── [slug]/page.tsx           # Individual project renderer
│   ├── utils.ts
│   └── projects/*.mdx            # ← Your projects go here
└── components/
    ├── nav.tsx                   # Top nav (home / projects / blog)
    ├── footer.tsx                # ⚠ Social links live here
    ├── posts.tsx                 # Post list component
    ├── projects.tsx              # Project list component (accepts `limit` prop)
    └── mdx.tsx                   # MDX renderer with syntax highlighting
```

## Deploying

1. Push this repo to GitHub (new repo, public or private).
2. Go to vercel.com → Add New → Project → import the repo. Accept defaults, deploy.
3. Once deployed, go to Project Settings → Domains, add your domain. Vercel will give you DNS records.
4. In Namecheap: Domain List → Manage → Advanced DNS. Remove the default parking records. Add:
   - A record: host `@`, value `76.76.21.21`
   - CNAME: host `www`, value `cname.vercel-dns.com`
5. Wait ~10 min for DNS + SSL to provision.

Every `git push` to `main` after that triggers a production deploy automatically.
