'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailsVentures } from '../modals/datails-venture'
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

interface Image {
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
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface VentureCardProps {
  data: Venture
}

export function VentureCard({ data }: VentureCardProps) {
  const { texts } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col p-4 bg-zinc-800 rounded-xl h-auto justify-around w-full gap-4">
      <section className=" md:block w-full h-28 md:h-64 relative">
        <Image
          src={`http://localhost:3335${data.coverImageUrl}`}
          alt={`Image`}
          fill
          className="absolute inset-0  bg-cover bg-center rounded-lg"
        />
      </section>
      <section className="flex flex-col md:flex-row md:justify-between items-center  text-xs gap-4">
        <div className="space-y-4">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.document}</p>
            <span className="font-light"> {data.id}</span>
          </div>

          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.startDate}</p>
            <span className="font-light">
              {new Date(data.completionDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full hidden md:flex space-x-3">
            <p className="font-medium uppercase">{texts.transferAmount}</p>
            <span className="font-light">{data.transferAmount}</span>
          </div>

          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.fundingAmount}</p>
            <span className="font-light">{data.fundingAmount}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.address}</p>
            <span className="font-light">{data.address}</span>
          </div>

          <button
            onClick={openModal}
            className={`border rounded-full text-center border-primary text-primary py-1 md:py-1 bg-transparent w-full`}
          >
            {texts.seeMore}
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailsVentures onClick={closeModal} data={data} />
          </div>
        </div>
      )}
    </div>
  )
}
