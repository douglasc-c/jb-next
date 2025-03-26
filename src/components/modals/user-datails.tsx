import api from '@/lib/api'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { AddressTab } from '../tabs/address'
import { UserTab } from '../tabs/user'
import DeleteModal from './delete'
import { useTranslations } from 'next-intl'

interface UserData {
  firstName: string
  lastName: string
  email: string
  role: string
  id: string
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
  onUpdate?: (updatedUser: UserData) => void
}

export const UserDetails: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const t = useTranslations('TextLang')
  const pathname = usePathname()
  const parts = pathname.split('/')
  const route = parts.slice(3).join('/')
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
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
        const updatedFields: Record<string, string> = {}

        if (editableData.firstName !== user.firstName) {
          updatedFields.firstName = editableData.firstName
        }
        if (editableData.lastName !== user.lastName) {
          updatedFields.lastName = editableData.lastName
        }
        if (editableData.email !== user.email) {
          updatedFields.email = editableData.email
        }
        if (editableData.role !== user.role) {
          updatedFields.role = editableData.role
        }

        response = await api.patch(`/users/${editableData.id}`, updatedFields)
      } else if (activeTab === 'address') {
        response = await api.post(
          `/admin/users/${editableData.id}/address`,
          editableData.address,
        )
      }

      if (response?.status === 200 || response?.status === 201) {
        setSuccess(response.data.message)
        setTimeout(() => {
          setSuccess('')
        }, 5000)
        if (onUpdate) {
          onUpdate(response.data.user)
        }
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
      await api.delete(`/user/${editableData.id}`)
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
    <div className="flex flex-col p-8 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg md:text-2xl">{t('userDetails')}</h3>
        <button onClick={onClose}>
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
            className={`pb-2 ${activeTab === 'user' ? 'border-b-2 border-amber-600 text-amber-600' : 'hover:border-b-2 hover:border-amber-600 hover:text-amber-600'}`}
            onClick={() => setActiveTab('user')}
          >
            {t('userData')}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 ${activeTab === 'address' ? 'border-b-2 border-amber-600 text-amber-600' : 'hover:border-b-2 hover:border-amber-600 hover:text-amber-600'}`}
              onClick={() => setActiveTab('address')}
            >
              {t('address')}
            </button>
          )}
          {route !== 'interests' && (
            <button
              className={`pb-2 hover:border-b-2  hover:border-red-600 hover:text-red-600`}
              onClick={() => setIsModalDeleteOpen(true)}
            >
              {t('delete')}
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
              {t('cancel')}
            </button>
          )}

          {route !== 'interests' && activeTab !== 'compliance' && (
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-primary text-zinc-200 py-2 rounded-lg text-sm w-full"
            >
              {isEditing ? t('save') : t('edit')}
            </button>
          )}
        </div>
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
