'use client'

import { useState } from 'react'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { DetailVenture } from '../modals/venture-datails'
import { InterestedDetails } from '../modals/interested'
import api from '@/lib/api'

interface User {
  id: number
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
  birthDate: string
  userType: string
  numberDocument: string
  phone: string
  documentType: string | null
  documentFront: string | null
  documentBack: string | null
  proofOfAddress: string | null
  incomeTaxProof: string | null
  mustChangePassword: boolean
  tokenVersion: number
  role: string
  isApproved: boolean
  complianceStatus: string
  twoFA: string | null
  isActive: boolean
  walletBalance: number
  totalInvested: number
  totalValuation: number
  emailVerified: boolean
  emailConfirmationCode: string | null
  emailConfirmationExpires: string | null
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
  user: User
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
  contractInterests: ContractInterest[]
}

interface MyContractsProps {
  data: Venture[]
}

export function InterestsTable({ data }: MyContractsProps) {
  const { texts } = useLayoutAdminContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Venture | null>(null)
  const [isInterestedModalOpen, setIsInterestedModalOpen] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)

  const openDetailsModal = (row: Venture) => {
    setSelectedContract(row)
    setIsModalOpen(true)
  }

  const openInterestedModal = (row: Venture) => {
    setSelectedContract(row)
    setIsInterestedModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContract(null)
  }

  const closeInterestedModal = () => {
    setIsInterestedModalOpen(false)
    setSelectedContract(null)
  }

  const handleClick = async (interestId: string, status: string) => {
    try {
      setUpdating(interestId)
      const response = await api.post('/admin/accept-or-reject-enterprise', {
        interestId,
        status,
      })

      if (response.status === 200) {
        console.log('Status atualizado com sucesso:', response.data)

        setSelectedContract((prev) => {
          if (!prev) return prev

          return {
            ...prev,
            contractInterests: prev.contractInterests.filter((interest) =>
              interest.interestId === interestId ? status !== 'APPROVED' : true,
            ),
          }
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error)
      alert('Erro ao atualizar o status. Tente novamente.')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <section className="flex flex-col p-4 h-auto justify-around w-full">
      <div className="grid grid-cols-4 gap-2 w-full uppercase text-sm font-medium items-center">
        <h3>{texts.company}</h3>
        <h3 className="text-center">{texts.interests}</h3>
        <h3 className="text-center col-span-2">{texts.shares}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-4 gap-2 w-full text-sm font-normal py-3 items-center border-b border-zinc-500"
        >
          <p>{row.name}</p>
          <p className="text-center">{row.contractInterests.length}</p>
          <button
            className="border rounded-full text-center border-primary text-primary py-1 bg-transparent hover:bg-primary hover:text-zinc-700 transition-colors"
            onClick={() => openInterestedModal(row)}
            aria-label={`Ver interessados em ${row.name}`}
          >
            {texts.interested}
          </button>
          <button
            className="border rounded-full text-center border-primary text-primary py-1 bg-transparent hover:bg-primary hover:text-zinc-700 transition-colors"
            onClick={() => openDetailsModal(row)}
            aria-label={`Ver mais detalhes de ${row.name}`}
          >
            {texts.details}
          </button>
        </div>
      ))}
      {isInterestedModalOpen && selectedContract && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
        >
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <InterestedDetails
              interests={selectedContract.contractInterests}
              onClose={closeInterestedModal}
              onClick={handleClick}
              updating={updating}
            />
          </div>
        </div>
      )}
      {isModalOpen && selectedContract && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
        >
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailVenture onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
