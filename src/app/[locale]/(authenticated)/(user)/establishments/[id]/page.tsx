'use client'

import { Loading } from '@/components/loading/loading'
import { Audits } from '@/components/tables/audits'
import { Overview } from '@/components/tabs/overview'
import { AddressTab } from '@/components/tabs/address'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Establishment {
  id: number
  tradeName: string
  companyName: string
  cnpj: string
  phone: string
  responsible: string
  address?: {
    id: string
    street: string
    number: string
    zipCode: string
    complement: string
    city: string
    state: string
    country: string
  }
  audits?: {
    id: number
    exported: boolean
    createdAt: string
    updatedAt: string
  }[]
}

type TabType = 'overview' | 'address' | 'audits'

export default function EstablishmentDetails() {
  const t = useTranslations('TextLang')
  const params = useParams()
  const [establishment, setEstablishment] = useState<Establishment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState<Establishment | null>(null)

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const response = await api.get(`/establishments/${params.id}`)

        setEstablishment(response.data.establishment)
        setEditableData(response.data.establishment)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message || 'Erro ao carregar estabelecimento',
          )
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEstablishment()
  }, [params.id])
  console.log(establishment)
  const handleInputChange = (
    field: string,
    value: string,
    addressField?: string,
  ) => {
    if (!editableData) return

    if (addressField) {
      setEditableData({
        ...editableData,
        address: {
          id: editableData.address?.id ?? '',
          street: editableData.address?.street || '',
          number: editableData.address?.number || '',
          zipCode: editableData.address?.zipCode || '',
          complement: editableData.address?.complement || '',
          city: editableData.address?.city || '',
          state: editableData.address?.state || '',
          country: editableData.address?.country || '',
          [field]: value,
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
    if (!editableData || !establishment) return

    try {
      let response

      if (activeTab === 'overview') {
        const updatedFields: Record<string, string> = {}

        if (editableData.tradeName !== establishment.tradeName) {
          updatedFields.tradeName = editableData.tradeName
        }
        if (editableData.companyName !== establishment.companyName) {
          updatedFields.companyName = editableData.companyName
        }
        if (editableData.cnpj !== establishment.cnpj) {
          updatedFields.cnpj = editableData.cnpj
        }
        if (editableData.phone !== establishment.phone) {
          updatedFields.phone = editableData.phone
        }
        if (editableData.responsible !== establishment.responsible) {
          updatedFields.responsible = editableData.responsible
        }

        if (Object.keys(updatedFields).length > 0) {
          response = await api.patch(
            `/establishments/${editableData.id}`,
            updatedFields,
          )
        }
      } else if (activeTab === 'address') {
        if (establishment.address && editableData.address) {
          const updatedAddressFields: Record<string, string> = {}

          if (editableData.address.street !== establishment.address.street) {
            updatedAddressFields.street = editableData.address.street
          }
          if (editableData.address.number !== establishment.address.number) {
            updatedAddressFields.number = editableData.address.number
          }
          if (editableData.address.zipCode !== establishment.address.zipCode) {
            updatedAddressFields.zipCode = editableData.address.zipCode
          }
          if (
            editableData.address.complement !== establishment.address.complement
          ) {
            updatedAddressFields.complement = editableData.address.complement
          }
          if (editableData.address.city !== establishment.address.city) {
            updatedAddressFields.city = editableData.address.city
          }
          if (editableData.address.state !== establishment.address.state) {
            updatedAddressFields.state = editableData.address.state
          }
          if (editableData.address.country !== establishment.address.country) {
            updatedAddressFields.country = editableData.address.country
          }

          if (Object.keys(updatedAddressFields).length > 0) {
            response = await api.patch(
              `/establishments/${editableData.id}/address/${establishment.address.id}`,
              updatedAddressFields,
            )
          }
        } else if (editableData.address) {
          response = await api.post(
            `/establishments/${editableData.id}/address`,
            editableData.address,
          )
        }
      }

      if (response?.status === 200 || response?.status === 201) {
        setEstablishment(editableData)
        setSuccess('Estabelecimento atualizado com sucesso!')
        setIsEditing(false)
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || 'Erro ao atualizar estabelecimento',
        )
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
    setEditableData(establishment)
    setIsEditing(false)
    setError(null)
    setSuccess(null)
  }

  const handleNewAudit = (newAudit: {
    id: number
    exported: boolean
    createdAt: string
    updatedAt: string
  }) => {
    if (!establishment) return
    setEstablishment({
      ...establishment,
      audits: [...(establishment.audits || []), newAudit],
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error || !establishment || !editableData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          {error || 'Estabelecimento não encontrado'}
        </p>
      </div>
    )
  }

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-border h-[calc(100vh-5rem)] flex flex-col items-start md:p-10 p-4 rounded-lg space-y-4 antialiased">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-zinc-200">
          {establishment.tradeName}
        </h1>
        <div className="flex flex-row w-full gap-4">
          <div className="w-full">
            <section className="flex text-zinc-200 w-full">
              <div className="flex flex-row w-full gap-6 text-xs md:text-sm custom-scroll">
                <button
                  className={`p-2 px-4 transition-colors duration-300 ${activeTab === 'overview' ? 'rounded-t-lg p-2 bg-zinc-900 text-zinc-200' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  {t('overview')}
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
                {activeTab === 'overview' && (
                  <Overview
                    isEditing={isEditing}
                    data={editableData}
                    onChange={handleInputChange}
                  />
                )}

                {activeTab === 'address' && editableData.address && (
                  <AddressTab
                    isEditing={isEditing}
                    editableData={{ address: editableData.address }}
                    handleInputChange={(field, value) =>
                      handleInputChange(field, String(value), 'address')
                    }
                  />
                )}
              </div>
            </section>

            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <div className="w-full">
          <Audits
            audits={establishment.audits}
            establishmentId={establishment.id}
            onNewAudit={handleNewAudit}
          />
        </div>
      </div>
    </main>
  )
}
