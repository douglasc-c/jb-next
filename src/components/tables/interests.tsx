'use client'

import { useState } from 'react'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { InterestedDetails } from '../modals/interested'
import api from '@/lib/api'
import { VentureDetails } from '../modals/venture-datails'

interface User {
  firstName: string
  lastName: string
  complianceStatus: string
  email: string
  phone: string
  role: string
  birthDate: string
  createdAt: string
  documentFront: string
  documentBack: string
  proofOfAddress: string
  incomeTaxProof: string
  totalInvested: number
  totalValuation: number
  username: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
  address?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
  user: User
}

interface Image {
  url: string
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
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface MyVenturesProps {
  data: Venture[]
}

export function InterestsTable({ data }: MyVenturesProps) {
  const { texts } = useLayoutAdminContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Venture | null>(null)
  const [isInterestedModalOpen, setIsInterestedModalOpen] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [mode, setMode] = useState<string>('TYPE1')

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

  const autoFill = async (interest: string, user: string) => {
    try {
      const enterpriseId = Number(interest)
      const userId = Number(user)

      const response = await api.post('/admin/contract/autofill', {
        enterpriseId,
        userId,
        templateType: mode,
      })
      console.log(response)
    } catch (error) {
      console.error('Erro ao atualizar o status:', error)
    } finally {
      setUpdating(null)
      setIsInterestedModalOpen(false)
    }
  }

  const handleClick = async (
    interestId: string,
    userId: string,
    status: string,
  ) => {
    try {
      setUpdating(interestId)
      const response = await api.post('/admin/accept-or-reject-enterprise', {
        interestId,
        status,
      })

      if (response.status === 200) {
        autoFill(interestId, userId)
        setSelectedContract((prev) => {
          if (!prev) return prev

          return {
            ...prev,
            contractInterests: prev.contractInterests
              .map((interest) =>
                interest.interestId === interestId
                  ? { ...interest, status: 'APPROVED' }
                  : interest,
              )
              .filter((interest) =>
                interest.interestId === interestId
                  ? status !== 'APPROVED'
                  : true,
              ),
          }
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error)
      alert('Erro ao atualizar o status. Tente novamente.')
    } finally {
      setUpdating(null)
      setIsInterestedModalOpen(false)
    }
  }

  return (
    <section className="h-auto w-full p-4">
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                {texts.company}
              </th>
              <th className="px-4 py-2 text-sm font-medium">
                {texts.interests}
              </th>
              <th className="px-4 py-2 text-sm font-medium" colSpan={2}>
                {texts.shares}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${index !== data.length - 1 ? 'border-b border-zinc-400' : ''}`}
              >
                <td className="px-4 py-2 text-left">{row.name}</td>
                <td className="px-4 py-2 text-center">
                  {row.contractInterests.length}
                </td>
                <td className="px-4 py-2 text-end">
                  <button
                    className="border rounded-full text-primary border-primary py-1 px-4 bg-transparent hover:bg-primary hover:text-zinc-700 transition-colors"
                    onClick={() => openInterestedModal(row)}
                    aria-label={`Ver interessados em ${row.name}`}
                  >
                    {texts.interested}
                  </button>
                </td>
                <td className="px-4 py-2 text-start">
                  <button
                    className="border rounded-full text-primary border-primary py-1 px-4 bg-transparent hover:bg-primary hover:text-zinc-700 transition-colors"
                    onClick={() => openDetailsModal(row)}
                    aria-label={`Ver mais detalhes de ${row.name}`}
                  >
                    {texts.details}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isInterestedModalOpen && selectedContract && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
        >
          <div className="rounded-lg p-6 shadow-lg w-full md:w-1/3">
            <InterestedDetails
              interests={selectedContract.contractInterests}
              onClose={closeInterestedModal}
              onClick={handleClick}
              mode={mode}
              setMode={setMode}
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
            <VentureDetails
              isOpen={isModalOpen}
              onClose={closeModal}
              venture={selectedContract}
            />
          </div>
        </div>
      )}
    </section>
  )
}
