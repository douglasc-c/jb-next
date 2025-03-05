'use client'

import { useTranslations } from 'next-intl'
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
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
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

export function OpportunitiesPreview({
  data,
  onClick,
}: OpportunitiesPreviewProps) {
  const t = useTranslations('TextLang')

  return (
    <div className="flex flex-row p-4 bg-zinc-200 rounded-xl h-auto justify-around w-full space-x-4">
      <section className="hidden md:block w-full h-40 relative">
        <Image
          src={data.coverImageUrl}
          alt="Image"
          fill
          className="absolute inset-0 rounded-lg"
        />
      </section>
      <section className="flex flex-col text-xs w-full md:w-2/3 gap-y-3 pt-4">
        <div className="flex uppercase">
          <div className="w-full flex flex-col space-y-3">
            <p className="font-medium">{t('document')}</p>
            <p className="font-medium">{t('startDate')}</p>
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
          {t('address')} <span className="font-light">{data.address}</span>
        </p>
        <span className="border border-zinc-500" />
        <button
          className="flex space-x-2 items-center"
          onClick={() => onClick(data)}
        >
          <p className="font-normal">{t('seeMore')}</p>
          <Image
            src="/images/svg/arrowRight.svg"
            alt="arrow right icon"
            height={12}
            width={12}
          />
        </button>
      </section>
    </div>
  )
}
