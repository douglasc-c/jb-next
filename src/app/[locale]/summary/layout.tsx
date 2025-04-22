'use client'

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-900 antialiased">
      <main>{children}</main>
    </div>
  )
}
