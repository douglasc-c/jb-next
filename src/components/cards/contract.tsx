'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import ButtonGlobal from '../buttons/global'

interface ContractProps {
  data: {
    document: string
    initialDate: string
    address: string
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
            <p className="font-medium uppercase">{textNewOpportunities.document}</p>
            <span className="font-light"> {data.document}</span>
          </div>
          <div className="w-full flex justify-end space-x-3">
            <p className="font-medium uppercase">{textNewOpportunities.startDate}</p>
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
            <ButtonGlobal
              type="button"
              params={{
                title: textNewOpportunities.seeMore,
                color: 'bg-primary',
              }}
              onClick={openModal}
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-medium mb-4">
              {/* {textNewOpportunities.modalTitle} */}
              AHS
            </h2>
            {/* <p>{textNewOpportunities.modalContent}</p> */}
            CONTENTE
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
            >
              {/* {textNewOpportunities.close} */}
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
