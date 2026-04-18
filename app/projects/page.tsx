import { Projects } from 'app/components/projects'

export const metadata = {
  title: 'Projects',
  description: 'Things I have built, shipped, or worked on.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <Projects />
    </section>
  )
}
