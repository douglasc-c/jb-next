'use client'

import { InputField } from '@/components/inputs/input-field'
import { Loading } from '@/components/loading/loading'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface UserData {
  firstName: string
  lastName: string
  email: string
  numberDocument: string
  birthDate?: string
  phone?: string
  currentPassword?: string
  newPassword?: string
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

export default function MyData() {
  const { texts } = useLayoutContext()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [changedData, setChangedData] = useState<Partial<UserData>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'address' | 'password'
  >('overview')

  const [editableData, setEditableData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    numberDocument: '',
    birthDate: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })

  type FieldType = 'string' | 'number' | 'boolean' | 'date'

  type FieldTypes = {
    [key: string]: FieldType | Record<string, FieldType>
  }

  const fieldTypes: FieldTypes = {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    numberDocument: 'string',
    birthDate: 'date',
    phone: 'string',
    currentPassword: 'string',
    newPassword: 'string',
    address: {
      street: 'string',
      number: 'string',
      complement: 'string',
      neighborhood: 'string',
      city: 'string',
      state: 'string',
      postalCode: 'string',
      country: 'string',
    },
  }

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
    parentField?: string,
  ) => {
    const fieldPath = parentField ? `${parentField}.${field}` : field
    let convertedValue: string | number | boolean | Date = value

    const expectedType: FieldType | undefined = parentField
      ? (fieldTypes[parentField] as Record<string, FieldType>)?.[field]
      : (fieldTypes[field] as FieldType)

    if (expectedType) {
      switch (expectedType) {
        case 'number':
          convertedValue = Number(value)
          if (isNaN(convertedValue)) {
            console.warn(
              `Field "${fieldPath}" expects a number, but received "${value}".`,
            )
            return
          }
          break
        case 'boolean':
          convertedValue = value === 'true' || value === true
          break
        case 'date':
          convertedValue = new Date(value as string)
          if (isNaN((convertedValue as Date).getTime())) {
            console.warn(
              `Field "${fieldPath}" expects a valid date, but received "${value}".`,
            )
            return
          }
          break
        case 'string':
        default:
          convertedValue = String(value)
      }
    } else {
      console.warn(`Field "${fieldPath}" is not defined in fieldTypes.`)
      return
    }

    setEditableData((prev) => {
      if (parentField) {
        const updatedParentField = {
          ...(prev[parentField as keyof UserData] as object),
          [field]: convertedValue,
        }

        setChangedData((prevChanged) => ({
          ...prevChanged,
          [parentField]: updatedParentField,
        }))

        return {
          ...prev,
          [parentField]: updatedParentField,
        }
      }

      if (prev[field as keyof UserData] === convertedValue) {
        return prev
      }

      setChangedData((prevChanged) => ({
        ...prevChanged,
        [field]: convertedValue,
      }))

      return { ...prev, [field]: convertedValue }
    })
  }

  const handleSave = async () => {
    setIsEditing(false)

    try {
      let response

      if (Object.keys(changedData).length === 0) {
        console.log('Nenhuma alteração detectada.')
        return null
      }

      if (activeTab === 'overview') {
        response = await api.post(`/users/update/profile`, {
          firstName: editableData.firstName,
          lastName: editableData.lastName,
          email: editableData.email,
          phone: editableData.phone,
          birthDate: editableData.birthDate,
          numberDocument: editableData.numberDocument,
        })
      } else if (activeTab === 'address') {
        response = await api.post(`/users/address`, editableData.address)
      } else if (activeTab === 'password') {
        response = await api.post(`/users/change-password`, {
          currentPassword: editableData.currentPassword,
          newPassword: editableData.newPassword,
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

  const handleCancel = () => {
    setEditableData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      numberDocument: userData?.numberDocument || '',
      birthDate: userData?.birthDate || '',
      phone: userData?.phone || '',
      currentPassword: '',
      newPassword: '',
      address: {
        street: userData?.address?.street || '',
        number: userData?.address?.number || '',
        complement: userData?.address?.complement || '',
        neighborhood: userData?.address?.neighborhood || '',
        city: userData?.address?.city || '',
        state: userData?.address?.state || '',
        postalCode: userData?.address?.postalCode || '',
        country: userData?.address?.country || '',
      },
    })
    setIsEditing(false)
  }

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await api.get('/users/me/data')
        const fetchedUserData: UserData = response.data

        setUserData(fetchedUserData)
        setEditableData(fetchedUserData)
      } catch (err) {
        console.error('Erro ao buscar dados do usuario:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium">{texts.myData}</h1>
        <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-10">
          <div className="flex flex-row">
            <section className="flex justify-center items-start w-1/5">
              <Image
                src="/images/svg/avatar.svg"
                width={110}
                height={110}
                alt="Avatar"
              />
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mt-20 mr-12 -ml-8">
                <button onClick={() => setIsEditing(true)}>
                  <Image
                    src="/images/svg/pencil.svg"
                    width={18}
                    height={18}
                    alt="Pencil"
                  />
                </button>
              </div>
            </section>

            <section className="space-y-3 w-4/5">
              <div className="flex border-b border-gray-600 justify-between text-sm text-zinc-500">
                <div className="space-x-4">
                  <button
                    className={`pb-2 ${activeTab === 'overview' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    {texts.summary}
                  </button>
                  <button
                    className={`pb-2 ${activeTab === 'address' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => setActiveTab('address')}
                  >
                    {texts.address}
                  </button>
                  <button
                    className={`pb-2 ${activeTab === 'password' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => setActiveTab('password')}
                  >
                    {texts.password}
                  </button>
                </div>

                <div className="">
                  {isEditing ? (
                    <div className="space-x-4">
                      <button
                        className={`hover:border-primary border-b-2 pb-2 border-transparent`}
                        onClick={handleCancel}
                      >
                        {texts.cancel}
                      </button>
                      <button
                        className={`hover:border-primary border-b-2 pb-2 border-transparent`}
                        onClick={handleSave}
                      >
                        {texts.save}
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`hover:border-primary border-b-2 pb-2 border-transparent`}
                      onClick={() => setIsEditing(true)}
                    >
                      {texts.edit}
                    </button>
                  )}
                </div>
              </div>
              <div className="">
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={texts.firstName}
                      value={editableData.firstName || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('firstName', value)
                      }
                    />
                    <InputField
                      label={texts.lastName}
                      value={editableData.lastName || ''}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('lastName', value)}
                    />
                    <InputField
                      label={texts.email}
                      value={editableData.email || ''}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('email', value)}
                    />
                    <InputField
                      label={texts.documentNumber}
                      value={editableData.numberDocument || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('numberDocument', value)
                      }
                    />
                    <InputField
                      type={'date'}
                      label={texts.dateOfBith}
                      value={editableData.birthDate || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('birthDate', value)
                      }
                    />
                    <InputField
                      label={texts.phone}
                      value={editableData.phone || ''}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('phone', value)}
                    />
                  </div>
                )}
                {activeTab === 'address' && (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={texts.street}
                      value={editableData.address?.street || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('street', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.number}
                      value={editableData.address?.number || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('number', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.complement}
                      value={editableData.address?.complement || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('complement', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.neighborhood}
                      value={editableData.address?.neighborhood || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('neighborhood', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.city}
                      value={editableData.address?.city || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('city', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.state}
                      value={editableData.address?.state || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('state', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.postalCode}
                      value={editableData.address?.postalCode || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('postalCode', value, 'address')
                      }
                    />
                    <InputField
                      label={texts.country}
                      value={editableData.address?.country || ''}
                      isEditing={isEditing}
                      onChange={(value) =>
                        handleInputChange('country', value, 'address')
                      }
                    />
                  </div>
                )}
                {activeTab === 'password' && (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={texts.currentPassword}
                      type={'password'}
                      value={editableData.currentPassword || ''}
                      isEditing={isEditing}
                      showPass={true}
                      onChange={(value) =>
                        handleInputChange('currentPassword', value)
                      }
                    />
                    <InputField
                      label={texts.newPassword}
                      type={'password'}
                      value={editableData.newPassword || ''}
                      isEditing={isEditing}
                      showPass={true}
                      onChange={(value) =>
                        handleInputChange('newPassword', value)
                      }
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
          <span className="border-[0.5px] border-zinc-500" />
          <div className="flex flex-row space-x-2 justify-center">
            <Image
              src="/images/svg/warning.svg"
              width={20}
              height={20}
              alt="Pencil"
            />
            <div className="flex flex-col text-center text-zinc-400">
              <p className="flex w-full font-light text-xs text-center">
                {texts.at4HandsRealEstateInvestments}
              </p>
              <div className="flex w-full font-light text-xs text-center space-x-1">
                <p>{texts.tochangeInformationPleaseContactOur}</p>
                <span className="text-primary font-medium underline">
                  {texts.technicalSupport}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
