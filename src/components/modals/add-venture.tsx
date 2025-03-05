'use client'

import ButtonGlobal from '@/components/buttons/global'
import { useTranslations } from 'next-intl'
import React, { FC } from 'react'
import { PulseLoader } from 'react-spinners'
import { InputField } from '../inputs/input-field'

interface FormData {
  name: string
  description: string
  corporateName: string
  investmentType: 'PROPERTY' | 'OTHER'
  address: string
  isAvailable: boolean
  constructionType: 'HOUSE' | 'APARTMENT' | 'OTHER'
  fundingAmount: number
  transferAmount?: number | null
  postalCode: string
  state: string
  city: string
  squareMeterValue: number
  area: number
  floors: number
  completionDate: string
  startDate: string
  images: File[]
  commercializationType: 'TOKENIZATION' | 'FRACTIONAL'
}

interface AddVentureModalProps {
  isOpen: boolean
  formData: FormData
  loading: boolean
  error: string | null
  handleChange: (key: string, value: string | number | File[] | null) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
}

const AddVentureModal: FC<AddVentureModalProps> = ({
  isOpen,
  loading,
  formData,
  handleChange,
  error,
  handleSubmit,
  closeModal,
}) => {
  const t = useTranslations('TextLang')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-primary border border-border p-6 rounded-lg shadow-lg w-full md:w-2/3 max-h-[90vh] overflow-hidden">
        <h2 className="text-2xl mb-4">{t('addVenture')}</h2>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label={t('ventureName')}
              value={formData.name}
              isEditing={true}
              onChange={(value) => handleChange('name', value)}
            />
            <InputField
              label={t('corporateName')}
              value={formData.corporateName}
              isEditing={true}
              onChange={(value) => handleChange('corporateName', value)}
            />
            <InputField
              label={t('description')}
              value={formData.description}
              isEditing={true}
              onChange={(value) => handleChange('description', value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('constructionType')}
                type="select"
                value={formData.constructionType}
                isEditing={true}
                options={[
                  { label: t('house'), value: 'HOUSE' },
                  { label: t('apartment'), value: 'APARTMENT' },
                  { label: t('land'), value: 'land' },
                  { label: t('other'), value: 'OTHER' },
                ]}
                onChange={(value) => handleChange('constructionType', value)}
              />
              <InputField
                label={t('isAvailable')}
                type="select"
                value={formData.isAvailable ? 'true' : 'false'}
                isEditing={true}
                options={[
                  { label: t('available'), value: 'true' },
                  { label: t('notAvaliable'), value: 'false' },
                ]}
                onChange={(value) => handleChange('isAvailable', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('address')}
                value={formData.address}
                isEditing={true}
                onChange={(value) => handleChange('address', value)}
              />
              <InputField
                label={t('city')}
                value={formData.city}
                isEditing={true}
                onChange={(value) => handleChange('city', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('state')}
                value={formData.state}
                isEditing={true}
                onChange={(value) => handleChange('state', value)}
              />
              <InputField
                label={t('postalCode')}
                value={formData.postalCode}
                isEditing={true}
                onChange={(value) => handleChange('postalCode', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('fundingAmount')}
                type="number"
                value={formData.fundingAmount}
                isEditing={true}
                formatCurrency={true}
                onChange={(value) => handleChange('fundingAmount', value)}
              />
              <InputField
                label={t('typeofmarketing')}
                type="select"
                value={formData.commercializationType}
                isEditing={true}
                options={[
                  { label: t('Tokenization'), value: 'TOKENIZATION' },
                  { label: t('Quotas'), value: 'FRACTIONAL' },
                ]}
                onChange={(value) =>
                  handleChange('commercializationType', value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <InputField
                label={t('squareMeterValue')}
                type="number"
                value={formData.squareMeterValue}
                isEditing={true}
                onChange={(value) => handleChange('squareMeterValue', value)}
              />
              <InputField
                label={t('area')}
                type="number"
                value={formData.area}
                isEditing={true}
                onChange={(value) => handleChange('area', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <InputField
                label={t('floors')}
                type="number"
                value={formData.floors}
                isEditing={true}
                onChange={(value) => handleChange('floors', value)}
              />
              <InputField
                label={t('investmentType')}
                type="select"
                value={formData.investmentType}
                isEditing={true}
                options={[
                  { label: t('property'), value: 'PROPERTY' },
                  { label: t('other'), value: 'OTHER' },
                ]}
                onChange={(value) => handleChange('investmentType', value)}
              />
            </div>
            <InputField
              label={t('images')}
              type="file"
              value={formData.images}
              isEditing={true}
              onChange={(value) => handleChange('images', value)}
            />
          </div>
          <div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-zinc-600 text-white py-2 px-4 rounded-lg"
              >
                {t('cancel')}
              </button>
              <ButtonGlobal
                type="submit"
                disabled={loading}
                params={{
                  title: loading ? (
                    <PulseLoader
                      color="#fff"
                      loading={loading}
                      size={6}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    t('add')
                  ),
                  color: 'bg-primary',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVentureModal
