'use client'

import { useState } from 'react'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { UserDetails } from './user-datails'

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
  createdAt: string
  status: string
  user: User
}

interface InterestedDetailsProps {
  interests: ContractInterest[]
  onClick: (interestId: string, status: string) => void
  onClose: () => void
  updating: string | null
}

export function InterestedDetails({
  interests,
  onClick,
  onClose,
  updating,
}: InterestedDetailsProps) {
  const { texts } = useLayoutAdminContext()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDetails = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedUser(null)
  }

  return (
    <>
      <div className="flex flex-col p-10 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
        <div className="flex justify-between">
          <h2 className="uppercase font-medium text-zinc-300">
            {texts.interested}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-4">
          {interests.map((interest) => (
            <li key={interest.interestId} className="flex border-b pb-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 items-center w-2/3 text-sm text-zinc-300">
                <p>
                  <span className="font-medium text-zinc-200">
                    {texts.user}:
                  </span>{' '}
                  {interest.user.firstName} {interest.user.lastName}
                </p>
                <p>{interest.user.email}</p>
                <p>
                  <span className="font-medium text-zinc-200">
                    {texts.interestDate}:
                  </span>{' '}
                  {new Date(interest.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-zinc-200">
                    {texts.status}:
                  </span>{' '}
                  {interest.status}
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-1/3 items-center justify-end text-sm">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDetails(interest.user)}
                    className="py-1 px-14 border border-primary text-primary rounded-full hover:bg-primary hover:text-zinc-600 transition-colors"
                  >
                    {texts.details}
                  </button>
                </div>
                <div className="flex space-x-2 items-center">
                  <button
                    onClick={() => onClick(interest.interestId, 'APPROVED')}
                    className="px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    disabled={updating === interest.interestId}
                  >
                    {updating === interest.interestId
                      ? 'Aprovando...'
                      : 'Aprovar'}
                  </button>
                  <button
                    onClick={() => onClick(interest.interestId, 'REJECTED')}
                    className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    disabled={updating === interest.interestId}
                  >
                    {updating === interest.interestId
                      ? 'Rejeitando...'
                      : 'Rejeitar'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg w-3/4">
            <UserDetails
              user={selectedUser}
              onClose={closeModal}
              isOpen={isModalOpen}
            />
          </div>
        </div>
      )}
    </>
  )
}
