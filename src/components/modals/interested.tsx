'use client'

import { useState } from 'react'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { UserDetails } from './user-datails'
import { InputField } from '../inputs/input-field'

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
  mode: string
  error: string
  setMode: (value: string) => void
  onClick: (interestId: string, userId: string, status: string) => void
  onClose: () => void
  updating: string | null
}

export function InterestedDetails({
  interests,
  onClick,
  onClose,
  updating,
  mode,
  error,
  setMode,
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
      <div className="flex flex-col p-5 bg-zinc-200 rounded-xl justify-around w-full space-y-6 custom-scroll max-h-[40rem]">
        <div className="flex justify-between">
          <h2 className="uppercase font-medium ">{texts.interested}</h2>
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
          {interests.map((interest, index) => (
            <li
              key={interest.interestId}
              className={`space-y-4 ${index !== interests.length - 1 ? 'border-b border-zinc-400 pb-4' : ''}`}
            >
              <div className="grid grid-flow-row gap-y-1 items-center text-sm ">
                <p>
                  <span className="font-medium">{texts.user}:</span>{' '}
                  {interest.user.firstName} {interest.user.lastName}
                </p>
                <p>{interest.user.email}</p>
                <p>
                  <span className="font-medium">{texts.interestDate}:</span>{' '}
                  {new Date(interest.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">{texts.status}:</span>{' '}
                  {interest.status}
                </p>
              </div>
              <div className="flex flex-col space-y-6 items-center w-full justify-end text-sm">
                <div className="flex w-full items-end space-x-4">
                  <button
                    onClick={() => handleDetails(interest.user)}
                    className="py-1 px-14 border w-full border-primary text-primary rounded-full hover:bg-primary hover:text-zinc-600 transition-colors"
                  >
                    {texts.details}
                  </button>
                  <InputField
                    label={texts.contract}
                    value={mode}
                    isEditing={true}
                    type="select"
                    options={[
                      { value: 'TYPE1', label: `${texts.model} 1` },
                      { value: 'TYPE2', label: `${texts.model} 2` },
                      { value: 'TYPE3', label: `${texts.model} 3` },
                    ]}
                    onChange={(value) => {
                      if (typeof value === 'string') {
                        setMode(value)
                      }
                    }}
                  />
                </div>
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                <div className="flex space-x-2 w-full items-center">
                  <button
                    onClick={() =>
                      onClick(interest.interestId, interest.user.id, 'APPROVED')
                    }
                    className="px-4 py-1 bg-green-500 w-1/2 rounded-full hover:bg-green-600 transition-colors"
                    disabled={updating === interest.interestId}
                  >
                    {updating === interest.interestId
                      ? 'Aprovando...'
                      : 'Aprovar'}
                  </button>
                  <button
                    onClick={() =>
                      onClick(interest.interestId, interest.user.id, 'REJECTED')
                    }
                    className="px-4 py-1 bg-red-500 w-1/2 rounded-full hover:bg-red-600 transition-colors"
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
    </>
  )
}
