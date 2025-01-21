'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailContract } from '../modals/contract-datails'
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

interface ContractProps {
  data: Venture
}

export function Contract({ data }: ContractProps) {
  const { texts } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col p-4 bg-zinc-800 rounded-xl h-auto justify-around w-full">
      <section className="hidden md:block w-full h-64 relative">
        <Image
          src={`http://localhost:3335${data.coverImageUrl}`}
          alt={`Image`}
          fill
          className="absolute inset-0  bg-cover bg-center rounded-lg"
        />
      </section>
      <section className="flex flex-col text-xs space-y-3 pt-4">
        <div className="flex ">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.document}</p>
            <span className="font-light"> {data.id}</span>
          </div>
          <div className="w-full flex justify-end space-x-3">
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
        <div className="flex items-center">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.address}</p>
            <span className="font-light">{data.address}</span>
          </div>
          <div className="flex justify-end w-2/6 space-x-3">
            <button
              onClick={openModal}
              className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent w-full`}
            >
              {texts.seeMore}
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailContract onClick={closeModal} data={data} />
          </div>
        </div>
      )}
    </div>
  )
}
