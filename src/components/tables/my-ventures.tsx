'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailsVentures } from '../modals/datails-venture'

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

interface Contract {
  id: string
  filePath: string
  isFinalized: string
  enterpriseId: string
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
  contracts: Contract[]
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
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  interestStatus?: string
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface MyVenturesTableProps {
  data: Venture[]
}

export function MyVenturesTable({ data }: MyVenturesTableProps) {
  const { texts } = useLayoutContext()
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
    <section className="h-auto w-full p-4">
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left font-regular text-xs">
                {texts.venture}
              </th>
              <th className="px-4 py-2 text-center font-regular text-xs">
                {texts.completionDate}
              </th>
              <th className="px-4 py-2 text-center font-regular text-xs">
                {texts.amountInvested}
              </th>
              <th className="px-4 py-2 text-center font-regular text-xs">
                {texts.amountTransferred}
              </th>
              <th className="px-4 py-2 text-center font-regular text-xs">
                {texts.shares}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${index !== data.length - 1 ? 'border-b border-zinc-400' : ''}`}
              >
                <td className="px-4 py-2 text-xs">{row.name}</td>
                <td className="px-4 py-2 text-center text-xs">
                  {new Date(row.completionDate).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  U$ {row.fundingAmount}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  U$ {row.transferAmount}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  <button
                    className="border rounded-full text-primary border-primary py-1 px-4 bg-transparent"
                    onClick={() => openModal(row)}
                  >
                    {texts.seeMore}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailsVentures onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
