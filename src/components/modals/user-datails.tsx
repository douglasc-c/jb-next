import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import React, { useState } from 'react'
import { UserTab } from '../tabs/user'
import { AddressTab } from '../tabs/address'
import { FinancialTab } from '../tabs/financial'
import { usePathname } from 'next/navigation'
import DeleteModal from './delete'
import CompleanceImage from '../tabs/compliance-imagens'

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
  documentFront: string
  documentBack: string
  proofOfAddress: string
  incomeTaxProof: string
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
  const { texts } = useLayoutAdminContext()
  const pathname = usePathname()
  const parts = pathname.split('/')
  const route = parts.slice(3).join('/')
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'user' | 'address' | 'financial' | 'compliance'
  >('user')
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
  const images = [
    user.documentFront,
    user.documentBack,
    user.proofOfAddress,
    user.incomeTaxProof,
  ]
  const isAllNull = images.every((image) => image === null)

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
        response = await api.put(`/admin/update/user`, {
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
        const walletBalance = Number(editableData.walletBalance)

        response = await api.put(`/admin/update/balance/${editableData.id}`, {
          amount: walletBalance,
          description: 'Saldo adicionado à carteira',
        })
      }

      if (response?.status === 200 || response?.status === 201) {
        console.log('Update successful', response.data)
      } else {
        console.error('Failed to update data', response)
      }
    } catch (error) {
      console.error('Error while updating:', error)
    }
  }

  const handleCompliance = async (status: string) => {
    try {
      const response = await api.put(
        `admin/updatecompliance/${editableData.id}`,
        { status },
      )
      console.log('Compliance atualizado com sucesso:', response.data)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar compliance:', error)
    }
  }

  const handleCancel = () => {
    setEditableData({
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
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/user/${editableData.id}/delete`)
    } catch (error) {
      console.error('Erro ao deletar:', error)
    } finally {
      closeModalDelete()
      setIsModalDeleteOpen(false)
      onClose()
    }
  }

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="flex flex-col p-8 bg-zinc-700 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-2xl">{texts.userDetails}</h3>
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

      <div className="flex border-b border-gray-600 justify-between">
        <div className="space-x-4">
          <button
            className={`pb-2 ${activeTab === 'user' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            {texts.userData}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 ${activeTab === 'address' ? 'border-b-2 border-white' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              {texts.address}
            </button>
          )}
          <button
            className={`pb-2 ${activeTab === 'financial' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('financial')}
          >
            {texts.financial}
          </button>

          <button
            className={`pb-2 ${activeTab === 'compliance' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('compliance')}
          >
            {texts.compliance}
          </button>
        </div>
        {route !== 'interests' && (
          <div>
            <button
              className="bg-red-600 px-4 rounded-md text-sm"
              onClick={() => setIsModalDeleteOpen(true)}
            >
              {texts.delete}
            </button>
          </div>
        )}
      </div>

      <div className="">
        {activeTab === 'user' && (
          <UserTab
            isEditing={isEditing}
            editableData={editableData}
            handleInputChange={handleInputChange}
          />
        )}
        {route !== 'interests' && activeTab === 'address' && (
          <AddressTab
            isEditing={isEditing}
            editableData={editableData}
            handleInputChange={handleInputChange}
          />
        )}

        {activeTab === 'financial' && (
          <FinancialTab
            isEditing={isEditing}
            editableData={editableData}
            handleInputChange={handleInputChange}
          />
        )}

        {activeTab === 'compliance' && <CompleanceImage images={images} />}
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        {isEditing && activeTab !== 'compliance' && (
          <button
            onClick={handleCancel}
            className="bg-zinc-600 text-zinc-300 py-2 px-4 rounded-lg"
          >
            {texts.cancel}
          </button>
        )}

        {route !== 'interests' && activeTab !== 'compliance' && (
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-primary text-zinc-200 py-2 px-4 rounded-lg w-full"
          >
            {isEditing ? texts.save : texts.edit}
          </button>
        )}

        {editableData.complianceStatus !== 'APPROVED' &&
          !isAllNull &&
          route !== 'interests' &&
          activeTab === 'compliance' && (
            <div className="flex w-full space-x-4">
              <button
                onClick={() => handleCompliance('REJECTED')}
                className="bg-red-600 text-zinc-200 py-2 px-4 rounded-lg w-full"
              >
                {texts.reject}
              </button>
              <button
                onClick={() => handleCompliance('APPROVED')}
                className="bg-primary text-zinc-200 py-2 px-4 rounded-lg w-full"
              >
                {texts.approve}
              </button>
            </div>
          )}
      </div>

      {isModalDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded-lg w-3/4">
            <DeleteModal
              onClose={closeModalDelete}
              isOpen={isModalDeleteOpen}
              handleSubmit={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
