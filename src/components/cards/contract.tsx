'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailContract } from './detail-contract'

interface ContractProps {
  data: {
    status?: string
    company?: string
    name?: string
    document: string
    initialDate: string
    address: string
    typeOfConstruction: string
    contributionAmount: string
    amountPassed: string
    postalCode: string
    city: string
    valueM2: string
    footage: string
    floors: string
    data: string
    provisionalCompletion: string
    progressStatus: string
    constructionStatus: number
    stage: number
  }
}

export function Contract({ data }: ContractProps) {
  const { textNewOpportunities } = useLayoutContext()
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
        <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
      </section>
      <section className="flex flex-col text-xs space-y-3 pt-4">
        <div className="flex ">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.document}
            </p>
            <span className="font-light"> {data.document}</span>
          </div>
          <div className="w-full flex justify-end space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.startDate}
            </p>
            <span className="font-light">{data.initialDate}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.address}
            </p>
            <span className="font-light">{data.address}</span>
          </div>
          <div className="flex justify-end w-2/6 space-x-3">
            <button
              onClick={openModal}
              className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent w-full`}
            >
              {textNewOpportunities.seeMore}
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
