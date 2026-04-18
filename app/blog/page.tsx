import { BlogPosts } from 'app/components/posts'
import SectionHead from 'app/components/section-head'

export const metadata = {
  title: 'Writing',
  description: 'Notes from the build.',
}

export default function Page() {
  return (
    <section className="band" style={{ borderTop: 0, paddingTop: 0 }}>
      <SectionHead
        idx="03"
        label="WRITING / INDEX"
        title="Writing"
        desc="Everything I've published here. Notes on the build, the web, the kitchen, and whatever I'm currently overthinking."
      />
      <BlogPosts />
    </section>
  )
}
