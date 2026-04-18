import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import { Projects } from 'app/components/projects'
import Eyebrow from 'app/components/eyebrow'
import SectionHead from 'app/components/section-head'
import Portrait from 'app/components/portrait'
import LiveTime from 'app/components/live-time'

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <div className="stagger">
            <Eyebrow idx="01">INDEX · MILWAUKEE, WI</Eyebrow>
          </div>

          <h1>
            <span className="reveal-line">
              <span>Designer &amp;</span>
            </span>
            <br />
            <span className="reveal-line">
              <span>developer</span>
            </span>{' '}
            <span className="reveal-line">
              <span className="italic">making</span>
            </span>
            <br />
            <span className="reveal-line">
              <span>things for the</span>
            </span>{' '}
            <span className="reveal-line">
              <span className="accent-underline">web.</span>
            </span>
          </h1>

          <div className="hero-bio stagger">
            <p>
              I work at the intersection of <strong>ecommerce UX</strong>,{' '}
              <strong>SEO</strong>, and the occasional side project — shipping
              storefronts that load fast, rank well, and don&apos;t feel like
              template noise.
            </p>
            <p>
              This is where I write about the craft: performance, tooling, and
              the occasional opinion I can&apos;t shake.
            </p>
          </div>

          <div className="hero-meta stagger">
            <div className="row">
              <span className="k">NOW</span>
              <span className="v">Shipping a Shopify rebuild</span>
            </div>
            <div className="row">
              <span className="k">LOC</span>
              <LiveTime />
            </div>
            <div className="row">
              <span className="k">AVAIL</span>
              <span className="v">
                Q3 2026 —{' '}
                <a
                  href="mailto:davidmaxwilley@gmail.com"
                  className="avail-cta"
                >
                  let&apos;s talk
                </a>
              </span>
            </div>
          </div>
        </div>

        <Portrait />
      </section>

      <section className="band" id="work">
        <SectionHead
          idx="02"
          label="SELECTED WORK"
          title="Selected work"
          desc="A few recent builds. Mostly ecommerce, a bit of tooling, the rare unhinged side quest."
        />
        <Projects limit={3} />
        <Link href="/projects" className="view-all">
          All projects <span>↗</span>
        </Link>
      </section>

      <section className="band" id="writing">
        <SectionHead
          idx="03"
          label="WRITING"
          title="Writing"
          desc="Notes from the build. Performance, tooling, and the occasional opinion I can't shake."
        />
        <BlogPosts limit={4} />
        <Link href="/blog" className="view-all">
          Archive <span>↗</span>
        </Link>
      </section>
    </>
  )
}
