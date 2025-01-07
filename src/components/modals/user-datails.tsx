import api from '@/lib/api'
import React, { useState } from 'react'

interface UserData {
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

interface UserDetailsModalProps {
  user: UserData
  isOpen: boolean
  onClose: () => void
}

export const UserDetails: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'user' | 'address' | 'financial'>(
    'user',
  )
  const [editableData, setEditableData] = useState<UserData>({
    ...user,
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      ...user.address,
    },
  })
  const [isEditing, setIsEditing] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (
    field: string,
    value: string,
    isAddress = false,
  ) => {
    if (isAddress) {
      setEditableData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }))
    } else {
      setEditableData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSave = async () => {
    setIsEditing(false)

    try {
      let response

      if (activeTab === 'user') {
        response = await api.put(`/admin/users/${editableData.id}`, {
          firstName: editableData.firstName,
          lastName: editableData.lastName,
          email: editableData.email,
          phone: editableData.phone,
          birthDate: editableData.birthDate,
          numberDocument: editableData.numberDocument,
          userType: editableData.userType,
          role: editableData.role,
        })
      } else if (activeTab === 'address') {
        response = await api.post(
          `/admin/users/${editableData.id}/address`,
          editableData.address,
        )
      } else if (activeTab === 'financial') {
        response = await api.put(`/admin/updatebalance/${editableData.id}`, {
          amount: editableData.walletBalance,
          description: 'Saldo adicionado à carteira',
        })
      }

      if (response?.status === 200 || response?.status === 204) {
        console.log('Update successful', response.data)
      } else {
        console.error('Failed to update data', response)
      }
    } catch (error) {
      console.error('Error while updating:', error)
    }
  }

  console.log(user)
  return (
    <div className="flex flex-col p-8 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">User Details</h3>
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

      <div className="flex space-x-4 border-b border-gray-600">
        <button
          className={`pb-2 ${activeTab === 'user' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Details
        </button>
        <button
          className={`pb-2 ${activeTab === 'address' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          Address Details
        </button>
        <button
          className={`pb-2 ${activeTab === 'financial' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          Financial Details
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'user' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              {
                label: 'First Name',
                field: 'firstName',
                value: editableData.firstName,
              },
              {
                label: 'Last Name',
                field: 'lastName',
                value: editableData.lastName,
              },
              { label: 'Email', field: 'email', value: editableData.email },
              { label: 'Phone', field: 'phone', value: editableData.phone },
              {
                label: 'Birthdate',
                field: 'birthDate',
                value: editableData.birthDate,
              },
              {
                label: 'Document Number',
                field: 'numberDocument',
                value: editableData.numberDocument,
              },
              {
                label: 'User type',
                field: 'userType',
                value: editableData.userType,
              },
              {
                label: 'Role',
                field: 'Role',
                value: editableData.role,
              },
            ].map(({ label, field, value }) => (
              <div key={field}>
                <strong>{label}:</strong>
                {isEditing ? (
                  <input
                    className="border border-gray-500 rounded-md px-4 py-2 w-full bg-zinc-700 text-xs text-zinc-400"
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                ) : (
                  <p className="border border-gray-500 rounded-md px-4 py-2 bg-zinc-700 font-light text-xs text-zinc-400">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'address' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              {
                label: 'Street',
                field: 'street',
                value: editableData.address?.street,
              },
              {
                label: 'Number',
                field: 'number',
                value: editableData.address?.number,
              },
              {
                label: 'Complement',
                field: 'complement',
                value: editableData.address?.complement,
              },
              {
                label: 'Neighborhood',
                field: 'neighborhood',
                value: editableData.address?.neighborhood,
              },
              {
                label: 'City',
                field: 'city',
                value: editableData.address?.city,
              },
              {
                label: 'State',
                field: 'state',
                value: editableData.address?.state,
              },
              {
                label: 'Postal Code',
                field: 'postalCode',
                value: editableData.address?.postalCode,
              },
              {
                label: 'Country',
                field: 'country',
                value: editableData.address?.country,
              },
            ].map(({ label, field, value }) => (
              <div key={field}>
                <strong>{label}:</strong>
                {isEditing ? (
                  <input
                    className="border border-gray-500 rounded-md px-4 py-2 w-full bg-zinc-700 text-xs text-zinc-400"
                    value={value}
                    onChange={(e) =>
                      handleInputChange(field, e.target.value, true)
                    }
                  />
                ) : (
                  <p className="border border-gray-500 rounded-md px-4 py-2 bg-zinc-700 font-light text-xs text-zinc-400">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="grid grid-cols-1 gap-4 text-left">
            {[
              {
                label: 'Wallet Balance',
                field: 'walletBalance',
                value: editableData.walletBalance,
              },
            ].map(({ label, field, value }) => (
              <div key={field}>
                <strong>{label}:</strong>
                {isEditing ? (
                  <input
                    className="border border-gray-500 rounded-md px-4 py-2 w-full bg-zinc-700 text-xs text-zinc-400"
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                ) : (
                  <p className="border border-gray-500 rounded-md px-4 py-2 bg-zinc-700 font-light text-xs text-zinc-400">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  )
}
