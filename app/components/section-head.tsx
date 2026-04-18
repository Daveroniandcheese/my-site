import Eyebrow from './eyebrow'

export default function SectionHead({
  idx,
  label,
  title,
  desc,
}: {
  idx: string
  label: string
  title: string
  desc: string
}) {
  return (
    <div className="section-head in-view">
      <div>
        <Eyebrow idx={idx}>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <p className="desc">{desc}</p>
    </div>
  )
}
