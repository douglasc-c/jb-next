'use client'

import { useTranslations } from 'next-intl'
import InputField from '../inputs/input-field'
import { PulseLoader } from 'react-spinners'
import ButtonGlobal from '../buttons/global'

interface FormData {
  tradeName: string
  companyName: string
  cnpj: string
  phone: string
  responsible: string
  address?: {
    street: string
    number: string
    zipCode: string
    complement: string
    city: string
    state: string
    country: string
  }
}

interface AddEstablishmentModalProps {
  isOpen: boolean
  formData: FormData
  error: string | null
  loading: boolean
  handleChange: (
    field: keyof FormData,
    value: string | number | boolean | File[] | null,
  ) => void
  handleSubmit: (e: React.FormEvent) => void
  closeModal: () => void
}

export default function AddEstablishmentModal({
  isOpen,
  formData,
  error,
  loading,
  handleChange,
  handleSubmit,
  closeModal,
}: AddEstablishmentModalProps) {
  const t = useTranslations('TextLang')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold text-zinc-200 mb-4">
          {t('addEstablishment')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <InputField
                label={t('companyName')}
                value={formData.companyName}
                isEditing={true}
                onChange={(value) => handleChange('companyName', value)}
              />
            </div>
            <InputField
              label={t('tradeName')}
              value={formData.tradeName}
              isEditing={true}
              onChange={(value) => handleChange('tradeName', value)}
            />
            <InputField
              label={t('cnpj')}
              value={formData.cnpj}
              isEditing={true}
              onChange={(value) => handleChange('cnpj', value)}
            />
            <InputField
              label={t('phone')}
              value={formData.phone}
              isEditing={true}
              onChange={(value) => handleChange('phone', value)}
            />
            <InputField
              label={t('responsible')}
              value={formData.responsible}
              isEditing={true}
              onChange={(value) => handleChange('responsible', value)}
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-zinc-600 text-zinc-300 py-2 px-4 rounded-lg"
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
                color: 'bg-title',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
