'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

export function OpportunitiesPreview() {
  const { textNewOpportunities } = useLayoutContext()

  return (
    <div className="flex flex-row p-4 bg-zinc-800 rounded-xl h-auto justify-around w-full space-x-4">
      <section className="hidden md:block w-full h-40 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
      </section>
      <section className="flex flex-col text-xs w-2/3 space-y-3 pt-4">
        <div className="flex  uppercase">
          <div className="w-full flex flex-col space-y-3">
            <p className="font-medium">{textNewOpportunities.document}</p>
            <p className="font-medium">{textNewOpportunities.startDate}</p>
          </div>
          <div className="w-full flex flex-col space-y-3">
            <span className="font-light"> 123456789</span>
            <span className="font-light">MAR/2024</span>
          </div>
        </div>
        <p className="font-medium  uppercase">
          {textNewOpportunities.address}{' '}
          <span className="font-light">
            Linha Adolfo konder, S/N Caçador-SC
          </span>
        </p>
        <span className="border border-zinc-500" />
        <a href="#" className="flex space-x-2 items-center">
          <p className="font-normal">{textNewOpportunities.seeMore}</p>
          <Image
            src={`/images/svg/arrowRight.svg`}
            alt="image"
            height={12}
            width={12}
          />
        </a>
      </section>
    </div>
  )
}
