import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import React, { useState } from 'react'
import { UserTab } from '../tabs/user'
import { AddressTab } from '../tabs/address'
import { FinancialTab } from '../tabs/financial'
import { usePathname } from 'next/navigation'
import DeleteModal from './delete'
import CompleanceImage from '../tabs/compliance-imagens'
import axios from 'axios'

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
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    value: string | number | boolean | File[] | null,
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
    setError('')
    setSuccess('')
  }

  const handleSave = async () => {
    setIsEditing(true)
    try {
      let response

      if (activeTab === 'user') {
        response = await api.put(`/admin/update/user/${editableData.id}`, {
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
        setSuccess(response.data.message)
      } else {
        console.error('Failed to update data', response)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setIsEditing(false)
    }
  }

  const handleCompliance = async (status: string) => {
    setIsEditing(true)
    try {
      const response = await api.put(
        `admin/updatecompliance/${editableData.id}`,
        { status, reason },
      )
      console.log('Compliance atualizado com sucesso:', response.data)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setIsEditing(false)
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
    setSuccess('')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/user/${editableData.id}/delete`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setIsEditing(false)
      closeModalDelete()
      setIsModalDeleteOpen(false)
      setSuccess('')
      onClose()
    }
  }

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="flex flex-col p-8 bg-zinc-300 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg md:text-2xl">{texts.userDetails}</h3>
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
        <div className="flex flex-row w-full gap-6 text-xs md:text-sm custom-scroll">
          <button
            className={`pb-2 ${activeTab === 'user' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            {texts.userData}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 ${activeTab === 'address' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              {texts.address}
            </button>
          )}
          <button
            className={`pb-2 ${activeTab === 'financial' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('financial')}
          >
            {texts.financial}
          </button>

          <button
            className={`pb-2 ${activeTab === 'compliance' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('compliance')}
          >
            {texts.compliance}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 hover:border-b-2  hover:border-red-600 hover:text-red-600`}
              onClick={() => setIsModalDeleteOpen(true)}
            >
              {texts.delete}
            </button>
          )}
        </div>
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

      <div className="flex flex-col justify-end gap-2">
        {success && <p className=" text-green-600 text-sm">{success}</p>}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        <div className="flex flex-row gap-2 w-full">
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
              className="bg-primary text-zinc-200 py-2 rounded-lg text-sm w-full"
            >
              {isEditing ? texts.save : texts.edit}
            </button>
          )}
        </div>

        {editableData.complianceStatus !== 'APPROVED' &&
          !isAllNull &&
          route !== 'interests' &&
          activeTab === 'compliance' && (
            <div className="flex flex-col w-full space-y-2">
              <div className="flex w-full space-x-4">
                <textarea
                  placeholder="Escreva uma mensagem"
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg placeholder-gray-300 bg-transparent focus:outline-none focus:z-10 sm:text-sm"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="space-y-4">
                  <button
                    onClick={() => handleCompliance('REJECTED')}
                    className="bg-red-600 text-zinc-200 text-sm py-2 px-4 rounded-lg w-full"
                  >
                    {texts.reject}
                  </button>
                  <button
                    onClick={() => handleCompliance('APPROVED')}
                    className="bg-primary text-zinc-200 text-sm py-2 px-4 rounded-lg w-full"
                  >
                    {texts.approve}
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>

      {isModalDeleteOpen && (
        <DeleteModal
          onClose={closeModalDelete}
          isOpen={isModalDeleteOpen}
          handleSubmit={handleDelete}
        />
      )}
    </div>
  )
}
