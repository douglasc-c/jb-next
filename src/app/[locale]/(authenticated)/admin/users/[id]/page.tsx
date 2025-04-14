'use client'

import { Loading } from '@/components/loading/loading'
import { AddressTab } from '@/components/tabs/address'
import { UserTab } from '@/components/tabs/user'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  address?: {
    id: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

type TabType = 'user' | 'address'

export default function UserDetails() {
  const t = useTranslations('TextLang')
  const params = useParams()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('user')
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${params.id}`)
        const userData = response.data.user

        setUser(userData)
        setEditableData({
          ...userData,
          address: userData.address
            ? {
                ...userData.address,
                id: userData.address.id,
              }
            : {
                street: '',
                number: '',
                complement: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
              },
        })
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || 'Erro ao carregar usuário')
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleInputChange = (
    field: string,
    value: string | number | boolean | File[] | null,
    isAddress = false,
  ) => {
    if (!editableData) return

    if (isAddress) {
      setEditableData({
        ...editableData,
        address: {
          id: editableData.address?.id ?? '',
          street: editableData.address?.street ?? '',
          number: editableData.address?.number ?? '',
          complement: editableData.address?.complement ?? '',
          city: editableData.address?.city ?? '',
          state: editableData.address?.state ?? '',
          zipCode: editableData.address?.zipCode ?? '',
          country: editableData.address?.country ?? '',
          [field]: String(value),
        },
      })
    } else {
      setEditableData({
        ...editableData,
        [field]: value,
      })
    }
  }

  const handleSave = async () => {
    if (!editableData) return

    try {
      let response

      if (activeTab === 'user') {
        const updatedFields: Record<string, string> = {}

        if (editableData.firstName !== user?.firstName) {
          updatedFields.firstName = editableData.firstName
        }
        if (editableData.lastName !== user?.lastName) {
          updatedFields.lastName = editableData.lastName
        }
        if (editableData.email !== user?.email) {
          updatedFields.email = editableData.email
        }
        if (editableData.role !== user?.role) {
          updatedFields.role = editableData.role
        }

        response = await api.patch(`/users/${editableData.id}`, updatedFields)
      } else if (activeTab === 'address') {
        if (user?.address && editableData?.address) {
          const updatedAddressFields: Record<string, string> = {}

          if (editableData.address.street !== user.address.street) {
            updatedAddressFields.street = editableData.address.street
          }
          if (editableData.address.number !== user.address.number) {
            updatedAddressFields.number = editableData.address.number
          }
          if (editableData.address.complement !== user.address.complement) {
            updatedAddressFields.complement = editableData.address.complement
          }
          if (editableData.address.city !== user.address.city) {
            updatedAddressFields.city = editableData.address.city
          }
          if (editableData.address.state !== user.address.state) {
            updatedAddressFields.state = editableData.address.state
          }
          if (editableData.address.zipCode !== user.address.zipCode) {
            updatedAddressFields.zipCode = editableData.address.zipCode
          }
          if (editableData.address.country !== user.address.country) {
            updatedAddressFields.country = editableData.address.country
          }

          if (Object.keys(updatedAddressFields).length > 0) {
            response = await api.patch(
              `/users/${editableData.id}/address/${user.address.id}`,
              updatedAddressFields,
            )
          }
        } else if (editableData?.address) {
          response = await api.post(
            `/users/${editableData.id}/address`,
            editableData.address,
          )
        }
      }

      if (response?.status === 200 || response?.status === 201) {
        setUser(editableData)
        setSuccess('Usuário atualizado com sucesso!')
        setIsEditing(false)
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Erro ao atualizar usuário')
        setTimeout(() => {
          setError(null)
        }, 3000)
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  }

  const handleCancel = () => {
    if (!user) return

    setEditableData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      address: user.address
        ? {
            ...user.address,
            id: user.address.id,
          }
        : {
            id: '',
            street: '',
            number: '',
            complement: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
    })
    setIsEditing(false)
    setError(null)
    setSuccess(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error || !user || !editableData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || 'Usuário não encontrado'}</p>
      </div>
    )
  }

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-border h-[calc(100vh-5rem)] flex flex-col items-start md:p-10 p-4 rounded-lg space-y-4 antialiased">
      <div className="w-full">
        <h1 className="text-2xl font-medium text-zinc-200 mb-6">
          {user.firstName} {user.lastName}
        </h1>
        <div className="flex flex-row w-full gap-4">
          <div className="w-full">
            <section className="flex text-zinc-200 w-full">
              <div className="flex flex-row w-full gap-6 text-xs md:text-sm custom-scroll">
                <button
                  className={`p-2 px-4 transition-colors duration-300 ${activeTab === 'user' ? 'rounded-t-lg p-2 bg-zinc-900 text-zinc-200' : ''}`}
                  onClick={() => setActiveTab('user')}
                >
                  {t('userData')}
                </button>
                <button
                  className={`p-2 px-4 transition-colors duration-300 ${activeTab === 'address' ? 'rounded-t-lg p-2 bg-zinc-900 text-zinc-200' : ''}`}
                  onClick={() => setActiveTab('address')}
                >
                  {t('address')}
                </button>
                <button
                  className={`p-2 px-4 ${isEditing ? 'hidden' : ''}`}
                  onClick={() => setIsEditing(true)}
                >
                  {t('edit')}
                </button>
                <button
                  className={`p-2 px-4 ${isEditing ? '' : 'hidden'}`}
                  onClick={handleCancel}
                >
                  {t('cancel')}
                </button>
                <button
                  className={`p-2 px-4 ${isEditing ? '' : 'hidden'}`}
                  onClick={handleSave}
                >
                  {t('save')}
                </button>
              </div>
            </section>

            <section>
              <div
                className={`bg-primary p-4 ${activeTab === 'address' ? 'rounded-t-lg p-2 bg-zinc-900 text-zinc-200' : ''} rounded-b-lg rounded-r-lg w-full `}
              >
                {activeTab === 'user' && (
                  <UserTab
                    isEditing={isEditing}
                    editableData={editableData}
                    handleInputChange={handleInputChange}
                  />
                )}

                {activeTab === 'address' && editableData.address && (
                  <AddressTab
                    isEditing={isEditing}
                    editableData={editableData}
                    handleInputChange={handleInputChange}
                  />
                )}
              </div>
            </section>

            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
