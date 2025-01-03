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

export function OpportunitiesPreview({
  data,
  onClick,
}: OpportunitiesPreviewProps) {
  const { textNewOpportunities } = useLayoutContext()

  return (
    <div className="flex flex-row p-4 bg-zinc-800 rounded-xl h-auto justify-around w-full space-x-4">
      <section className="hidden md:block w-full h-40 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
      </section>
      <section className="flex flex-col text-xs w-2/3 space-y-3 pt-4">
        <div className="flex uppercase">
          <div className="w-full flex flex-col space-y-3">
            <p className="font-medium">{textNewOpportunities.document}</p>
            <p className="font-medium">{textNewOpportunities.startDate}</p>
          </div>
          <div className="w-full flex flex-col space-y-3">
            <span className="font-light">{data.id}</span>
            <span className="font-light">
              {new Date(data.completionDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <p className="font-medium uppercase">
          {textNewOpportunities.address}{' '}
          <span className="font-light">{data.address}</span>
        </p>
        <span className="border border-zinc-500" />
        <button
          className="flex space-x-2 items-center"
          onClick={() => onClick(data)}
        >
          <p className="font-normal">{textNewOpportunities.seeMore}</p>
          <Image
            src={`/images/svg/arrowRight.svg`}
            alt="arrow right icon"
            height={12}
            width={12}
          />
        </button>
      </section>
    </div>
  )
}
