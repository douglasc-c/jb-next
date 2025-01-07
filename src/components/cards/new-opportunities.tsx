'use client'

import { useLayoutContext } from '@/context/layout-context'
import { OpportunitiesPreview } from './opportunities-preview'
import { SmallOpportunitiesPreview } from './small-opportunities-preview'
import { DetailContract } from '../modals/contract-datails'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface NewOpportunitiesProps {
  recentEnterprises: Enterprise[]
}

export function NewOpportunities({ recentEnterprises }: NewOpportunitiesProps) {
  const { textNewOpportunities } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Enterprise | null>(
    null,
  )
  const router = useRouter()
  const openModal = (row: Enterprise) => {
    console.log(row)
    setSelectedContract(row)
    setIsModalOpen(true)
  }

  const handleClick = () => {
    router.push(`/constructioncircuit`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContract(null)
  }

  return (
    <section className="flex p-4 bg-zinc-700 rounded-xl h-auto justify-around w-full space-x-12">
      <div className="flex flex-col w-2/3 space-y-3">
        <h3 className="uppercase font-medium">
          {textNewOpportunities.newOpportunitiesPortifolio}
        </h3>
        <div className="relative flex flex-row-reverse">
          <button
            onClick={handleClick}
            className="absolute bg-zinc-600 rounded-full p-2 h-10 w-10 flex items-center justify-center -mt-3 -mr-3"
          >
            <Image
              src="/images/svg/arrowRightGreen.svg"
              alt="arrow icon"
              height={14}
              width={14}
            />
          </button>

          <OpportunitiesPreview
            data={recentEnterprises[0]}
            onClick={openModal}
          />
        </div>
      </div>

      <div className="w-1/3 flex flex-col justify-between">
        <SmallOpportunitiesPreview
          data={recentEnterprises[1]}
          onClick={openModal}
        />
        <SmallOpportunitiesPreview
          data={recentEnterprises[2]}
          onClick={openModal}
        />
      </div>

      {isModalOpen && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailContract onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
