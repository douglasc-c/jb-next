'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailContract } from '../modals/detail-contract'

interface RowData {
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

interface MyContractsProps {
  data: RowData[]
}

export function VenturesTable({ data }: MyContractsProps) {
  const { textMyContracts } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<RowData | null>(null)

  const openModal = (row: RowData) => {
    setSelectedContract(row)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContract(null)
  }

  return (
    <section className={`flex flex-col p-4  h-auto justify-around w-full`}>
      <div className="grid grid-cols-7 gap-2 w-full uppercase text-sm font-medium items-center">
        <h3 className="text-center">{textMyContracts.status}</h3>
        <h3 className="col-span-2">{textMyContracts.company}</h3>
        <h3 className="">{textMyContracts.date}</h3>
        <h3 className="">{textMyContracts.amountInvested}</h3>
        <h3 className="">{textMyContracts.amountTransferred}</h3>
        <h3 className="text-center">{textMyContracts.shares}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-2 w-full text-sm font-normal py-3 items-center border-b border-zinc-500"
        >
          <div
            className={`border rounded-full text-center border-primary py-0.5 ${
              row.status === 'CONFIRMADO'
                ? 'bg-primary text-zinc-700'
                : 'bg-transparent'
            }`}
          >
            <p>{row.status}</p>
          </div>
          <p className="col-span-2">{row.company}</p>
          <p className="">{row.data}</p>
          <p className="">U$ {row.contributionAmount}</p>
          <p className="">U$ {row.amountPassed}</p>
          <button
            className={`border rounded-full text-center border-primary text-primary py-1 bg-transparent`}
            onClick={() => openModal(row)}
          >
            {textMyContracts.seeMore}
          </button>
        </div>
      ))}
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
