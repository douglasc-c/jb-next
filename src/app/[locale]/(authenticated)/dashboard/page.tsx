'use client'

import { YorResources } from '@/components/cards/you-resources'

export default function Dashboard() {
  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex items-start p-10">
      <YorResources />
    </main>
  )
}
