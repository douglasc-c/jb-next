'use client'

import { useLayoutContext } from '@/context/layout-context'
import { OpportunitiesPreview } from './opportunities-preview'
import { SmallOpportunitiesPreview } from './small-opportunities-preview'

export function NewOpportunities() {
  const { textNewOpportunities } = useLayoutContext()

  return (
    <section className="flex p-4 bg-zinc-700 rounded-xl h-auto justify-around w-full space-x-12">
      <div className="flex flex-col w-2/3 space-y-3">
        <h3 className="uppercase font-medium">
          {textNewOpportunities.newOpportunitiesPortifolio}
        </h3>
        <div>
          <OpportunitiesPreview />
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-between">
        <SmallOpportunitiesPreview />
        <SmallOpportunitiesPreview />
      </div>
    </section>
  )
}
