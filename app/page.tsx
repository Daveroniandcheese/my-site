import { BlogPosts } from 'app/components/posts'
import { Projects } from 'app/components/projects'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Dave {/* TODO: your name or how you want to be known */}
      </h1>
      {/* TODO: rewrite this bio. 2–4 sentences. Who you are, what you work
          on, what you think about. Milwaukee context optional. */}
      <p className="mb-4">
        I&apos;m a designer and developer in Milwaukee working at the
        intersection of ecommerce UX, SEO, and the occasional side project. I
        write here about the web, food, and whatever I&apos;m currently
        overthinking.
      </p>

      <div className="my-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Selected work
        </h2>
        <Projects limit={3} />
      </div>

      <div className="my-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Writing</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
