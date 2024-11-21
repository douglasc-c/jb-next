'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

export function SmallOpportunitiesPreview() {
  const { textNewOpportunities } = useLayoutContext()

  return (
    <div className="flex flex-col p-3 bg-zinc-800 rounded-xl h-auto justify-around w-full">
      <section className="hidden md:block w-full h-16 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center opacity-50 rounded-md" />
      </section>
      <section className="flex flex-row text-[10px] w-full justify-between pt-2">
        <div className="flex uppercase space-x-3">
          <p className="font-medium">{textNewOpportunities.document}</p>
          <span className="font-light"> 123456789</span>
        </div>
        <div className="flex">
          <a href="#" className="flex space-x-2 items-center">
            <p className="font-normal">{textNewOpportunities.seeMore}</p>
            <Image
              src={`/images/svg/arrowRight.svg`}
              alt="image"
              height={12}
              width={12}
            />
          </a>
        </div>
      </section>
    </div>
  )
}
