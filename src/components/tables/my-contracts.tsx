'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailContract } from '../modals/contract-datails'
import { useAuthContext } from '@/context/auth-context'

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
  interestStatus?: string
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface MyContractsProps {
  data: Venture[]
}

export function MyContracts({ data }: MyContractsProps) {
  const { texts } = useLayoutContext()
  const { authData } = useAuthContext()
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

  const getInterestStatus = (contract: Venture) => {
    const interest = contract.contractInterests.find(
      (interest) => interest.userId === authData?.user.id,
    )

    if (!interest) return 'PENDING'
    return interest.status
  }

  return (
    <section className={`flex flex-col p-4  h-auto justify-around w-full`}>
      <div className="grid grid-cols-6 gap-2 w-full uppercase text-xs font-medium items-center">
        <h3 className="text-center">{texts.status}</h3>
        <h3 className="">{texts.venture}</h3>
        <h3 className="text-center">{texts.completionDate}</h3>
        <h3 className="text-center">{texts.amountInvested}</h3>
        <h3 className="text-center">{texts.amountTransferred}</h3>
        <h3 className="text-center">{texts.shares}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row, index) => {
        const interestStatus = getInterestStatus(row)
        return (
          <div
            key={index}
            className="grid grid-cols-6 gap-2 w-full text-xs font-normal py-3 items-center border-b border-zinc-500"
          >
            <div
              className={`border border-primary text-primary rounded-full text-center py-0.5 ${
                interestStatus === 'APPROVED'
                  ? 'bg-primary text-zinc-700'
                  : interestStatus === 'REJECTED'
                    ? 'bg-transparent'
                    : 'bg-transparent'
              }`}
            >
              <p>{interestStatus.toUpperCase()}</p>
            </div>
            <p className="">{row.name}</p>
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
              {texts.seeMore}
            </button>
          </div>
        )
      })}
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
