'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

interface Enterprise {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount: number
  postalCode: string
  address: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string | null
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
}

interface OpportunitiesPreviewProps {
  data: Enterprise
  onClick: (row: Enterprise) => void
}

export function SmallOpportunitiesPreview({
  data,
  onClick,
}: OpportunitiesPreviewProps) {
  const { textNewOpportunities } = useLayoutContext()

  return (
    <div className="flex flex-col p-3 bg-zinc-800 rounded-xl h-auto justify-around w-full">
      <section className="hidden md:block w-full h-16 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center opacity-50 rounded-md" />
      </section>
      <section className="flex flex-row text-[10px] w-full justify-between pt-2">
        <div className="flex uppercase space-x-3">
          <p className="font-medium">{textNewOpportunities.document}</p>
          <span className="font-light">{data.id}</span>
        </div>
        <div className="flex">
          <button
            className="flex space-x-2 items-center"
            onClick={() => onClick(data)}
          >
            <p className="font-normal">{textNewOpportunities.seeMore}</p>
            <Image
              src={`/images/svg/arrowRight.svg`}
              alt="arrow icon"
              height={12}
              width={12}
            />
          </button>
        </div>
      </section>
    </div>
  )
}
