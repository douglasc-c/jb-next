'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DetailsVentures } from '../modals/datails-venture'
import { OpportunitiesPreview } from './opportunities-preview'
import { SmallOpportunitiesPreview } from './small-opportunities-preview'

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
  city: string
  squareMeterValue: number
  area: number
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
  progress: number
  floors: number
  completionDate: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: ImageItem[]
}

interface NewOpportunitiesProps {
  recentEnterprises: Venture[]
}

export function NewOpportunities({ recentEnterprises }: NewOpportunitiesProps) {
  const t = useTranslations('TextLang')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Venture | null>(null)
  const router = useRouter()

  const openModal = (row: Venture) => {
    setSelectedContract(row)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContract(null)
  }

  const handleClick = () => {
    router.push(`/constructioncircuit`)
  }

  return (
    <section className="flex p-4 bg-primary text-textPrimary border border-border rounded-xl h-auto justify-around w-full gap-6">
      <div
        className={`flex flex-col ${recentEnterprises.length >= 0 ? 'w-full' : 'w-2/3'} gap-y-2`}
      >
        <h3 className="uppercase font-medium">
          {t('newOpportunitiesPortifolio')}
        </h3>

        {recentEnterprises.length <= 0 && (
          <div className="text-center items-center flex flex-col space-y-4">
            <Image
              src="/images/svg/warning-grey.svg"
              alt="arrow icon"
              height={100}
              width={100}
            />
            <span className="text-lg">{t('noNewDevelopmentsAvailable')}</span>
          </div>
        )}

        {recentEnterprises.length > 0 && (
          <div className="relative flex flex-row-reverse">
            <button
              onClick={handleClick}
              className="absolute bg-primary shadow rounded-full p-2 h-10 w-10 flex items-center justify-center -mt-3 -mr-3"
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
        )}
      </div>

      {recentEnterprises.length > 1 && (
        <div className="w-1/3 md:flex flex-col justify-between hidden">
          {recentEnterprises.slice(1, 3).map((enterprise) => (
            <SmallOpportunitiesPreview
              key={enterprise.id}
              data={enterprise}
              onClick={openModal}
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 w-full flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailsVentures onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
