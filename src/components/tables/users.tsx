'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
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

interface MyVenturesProps {
  data: User[]
}

export function UsersTable({ data }: MyVenturesProps) {
  const t = useTranslations('TextLang')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getComplianceText = (status: string) => {
    switch (status) {
      case 'PENDING_EMAIL':
        return t('pendingEmail')
      case 'PENDING_ADDRESS':
        return t('pendingAddress')
      case 'PENDING_DOCUMENTS':
        return t('pendingDocuments')
      case 'UNDER_REVIEW':
        return t('underReview')
      case 'APPROVED':
        return t('validated')
      default:
        return t('unknownStatus')
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
    <section className="h-auto w-full p-4 bg-primary antialiased border border-border text-textPrimary rounded-md">
      <div className="custom-scroll max-h-[40rem]">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium">
                {t('name')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('type')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('compliance')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('seeMore')}
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
                    {t('seeMore')}
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
            <div className="w-full md:w-2/3">
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
