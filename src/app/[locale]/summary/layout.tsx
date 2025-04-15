'use client'

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-primary antialiased">
      <main>{children}</main>
    </div>
  )
}
