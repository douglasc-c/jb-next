'use client'

import { useState } from 'react'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { UserDetails } from '../modals/user-datails'

interface User {
  firstName: string
  lastName: string
  complianceStatus: string
  email: string
  phone: string
  role: string
  birthDate: string
  createdAt: string
  totalInvested: number
  totalValuation: number
  username: string
  documentFront: string
  documentBack: string
  proofOfAddress: string
  incomeTaxProof: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
}

interface MyContractsProps {
  data: User[]
}

export function UsersTable({ data }: MyContractsProps) {
  const { texts } = useLayoutAdminContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getComplianceText = (status: string) => {
    switch (status) {
      case 'PENDING_EMAIL':
        return texts.pendingEmail
      case 'PENDING_ADDRESS':
        return texts.pendingAddress
      case 'PENDING_DOCUMENTS':
        return texts.pendingDocuments
      case 'UNDER_REVIEW':
        return texts.underReview
      case 'APPROVED':
        return texts.validated
      default:
        return texts.unknownStatus
    }
  }

  const openModal = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <section className="h-auto w-full p-4">
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                {texts.name}
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                {texts.type}
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                {texts.compliance}
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                {texts.seeMore}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${index !== data.length - 1 ? 'border-b border-zinc-400' : ''}`}
              >
                <td className="px-4 py-2 text-xs text-left">
                  {row.firstName} {row.lastName}
                </td>
                <td className="px-4 py-2 text-xs text-center">{row.role}</td>
                <td className="px-4 py-2 text-xs text-center">
                  <div
                    className={`border rounded-full py-0.5 px-2 inline-block ${
                      row.complianceStatus === 'Validado'
                        ? 'bg-primary text-zinc-700 border-primary'
                        : 'bg-transparent border-primary'
                    }`}
                  >
                    {getComplianceText(row.complianceStatus)}
                  </div>
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  <button
                    className="rounded-full border border-primary text-primary py-1 px-4 bg-transparent"
                    onClick={() => openModal(row)}
                  >
                    {texts.seeMore}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
          >
            <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
              <UserDetails
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
