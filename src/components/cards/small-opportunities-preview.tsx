'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

interface CurrentPhase {
  id: number
  phaseName: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

interface CurrentTask {
  id: number
  taskName: string
  description: string
  phaseId: number
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
}

interface ImageItem {
  imageUrl: string
}

interface Venture {
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
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: ImageItem[]
}

interface OpportunitiesPreviewProps {
  data: Venture
  onClick: (row: Venture) => void
}

export function SmallOpportunitiesPreview({
  data,
  onClick,
}: OpportunitiesPreviewProps) {
  const { texts } = useLayoutContext()
  // console.log(data)
  return (
    <div className="flex flex-col p-3 bg-zinc-200 rounded-xl h-auto justify-around w-full">
      <section className="hidden md:block w-full h-16 relative">
        <Image
          src={`${data.coverImageUrl}`}
          alt={`Image`}
          fill
          className="absolute inset-0  bg-cover bg-center rounded-lg"
        />
      </section>
      <section className="flex flex-row text-[9px] w-full justify-between pt-2">
        <div className="flex uppercase space-x-3">
          <p className="font-medium">{texts.document}</p>
          <span className="font-light">{data.id}</span>
        </div>
        <div className="flex">
          <button
            className="flex space-x-2 items-center"
            onClick={() => onClick(data)}
          >
            <p className="font-normal">{texts.seeMore}</p>
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
