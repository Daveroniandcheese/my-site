export default function Eyebrow({
  idx,
  children,
}: {
  idx?: string
  children: React.ReactNode
}) {
  return (
    <div className="eyebrow">
      {idx && (
        <>
          <span className="idx">{idx}</span>
          {'\u00A0\u00A0'}
        </>
      )}
      {children}
    </div>
  )
}
