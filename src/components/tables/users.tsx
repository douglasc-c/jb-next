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
    <section className="flex flex-col p-4 h-auto justify-around w-full text-center">
      <div className="grid grid-cols-4 gap-2 w-full uppercase text-sm font-medium items-center">
        <h3 className="">{texts.type}</h3>
        <h3 className="">{texts.name}</h3>
        <h3 className="">{texts.compliance}</h3>
        <h3 className="">{texts.seeMore}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-2 w-full font-normal py-3 items-center border-b border-zinc-500"
        >
          <p>{row.role}</p>
          <p>
            {row.firstName} {row.lastName}
          </p>
          <div
            className={`border rounded-full border-primary py-0.5 ${
              row.complianceStatus === 'Validado'
                ? 'bg-primary text-zinc-700'
                : 'bg-transparent'
            }`}
          >
            <p>{getComplianceText(row.complianceStatus)}</p>
          </div>
          <button
            className="border rounded-full border-primary text-primary py-1 bg-transparent"
            onClick={() => openModal(row)}
          >
            {texts.seeMore}
          </button>
        </div>
      ))}

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
    </section>
  )
}
