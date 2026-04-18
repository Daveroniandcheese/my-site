import { Projects } from 'app/components/projects'
import SectionHead from 'app/components/section-head'

export const metadata = {
  title: 'Work',
  description: 'Things I have built, shipped, or worked on.',
}

export default function Page() {
  return (
    <section className="band" style={{ borderTop: 0, paddingTop: 0 }}>
      <SectionHead
        idx="02"
        label="WORK / INDEX"
        title="Selected work"
        desc="Everything I've shipped here — from the recent to the old. Mostly ecommerce, a bit of tooling."
      />
      <Projects />
    </section>
  )
}
