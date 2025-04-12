'use client'

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-primary">
      <main>{children}</main>
    </div>
  )
}
