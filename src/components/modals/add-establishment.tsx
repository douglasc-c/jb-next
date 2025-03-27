'use client'

import { useTranslations } from 'next-intl'

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
      <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold text-zinc-200 mb-4">
          {t('addEstablishment')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              value={formData.tradeName}
              onChange={(e) => handleChange('tradeName', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-1">
              Razão Social
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-1">
              Telefone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-1">
              Responsável
            </label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => handleChange('responsible', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-200"
              required
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-zinc-200 hover:text-zinc-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
