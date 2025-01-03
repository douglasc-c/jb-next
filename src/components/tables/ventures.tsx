'use client'

import { useLayoutAdminContext } from '@/context/layout-admin-context'

import { useState } from 'react'
import { DetailVenture } from '../modals/detail-venture'

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
  startDate: string | null
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase: CurrentPhase
  currentTask: CurrentTask
  contractInterests: ContractInterest[]
}

interface MyContractsProps {
  data: Venture[]
}

export function VenturesTable({ data }: MyContractsProps) {
  const { textMyContracts } = useLayoutAdminContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Venture | null>(null)

  const openModal = (row: Venture) => {
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
        <h3 className="text-center">{textMyContracts.date}</h3>
        <h3 className="text-center">{textMyContracts.amountInvested}</h3>
        <h3 className="text-center">{textMyContracts.amountTransferred}</h3>
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
          <p className="col-span-2">{row.name}</p>
          <p className="text-center">
            {new Date(row.completionDate).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
          <p className="text-center">U$ {row.fundingAmount}</p>
          <p className="text-center">U$ {row.transferAmount}</p>
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
            <DetailVenture onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
