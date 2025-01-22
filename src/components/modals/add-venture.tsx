import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
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
  transferAmount: number
  postalCode: string
  city: string
  squareMeterValue: number
  area: number
  floors: number
  completionDate: string
  images: File[]
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
  const { texts } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg w-full md:w-2/3 max-h-[90vh] overflow-hidden">
        <h2 className="text-white text-2xl mb-4">{texts.addVenture}</h2>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label={texts.ventureName}
              value={formData.name}
              isEditing={true}
              onChange={(value) => handleChange('name', value)}
            />
            <InputField
              label={texts.corporateName}
              value={formData.corporateName}
              isEditing={true}
              onChange={(value) => handleChange('corporateName', value)}
            />
            <InputField
              label={texts.description}
              value={formData.description}
              isEditing={true}
              onChange={(value) => handleChange('description', value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={texts.constructionType}
                type="select"
                value={formData.constructionType}
                isEditing={true}
                options={[
                  { label: texts.house, value: 'HOUSE' },
                  { label: texts.apartment, value: 'APARTMENT' },
                  { label: texts.other, value: 'OTHER' },
                ]}
                onChange={(value) => handleChange('constructionType', value)}
              />
              <InputField
                label={texts.isAvailable}
                type="select"
                value={formData.isAvailable ? 'true' : 'false'}
                isEditing={true}
                options={[
                  { label: texts.available, value: 'true' },
                  { label: texts.notAvaliable, value: 'false' },
                ]}
                onChange={(value) => handleChange('isAvailable', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={texts.address}
                value={formData.address}
                isEditing={true}
                onChange={(value) => handleChange('address', value)}
              />
              <InputField
                label={texts.city}
                value={formData.city}
                isEditing={true}
                onChange={(value) => handleChange('city', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={texts.postalCode}
                value={formData.postalCode}
                isEditing={true}
                onChange={(value) => handleChange('postalCode', value)}
              />
              <InputField
                label={texts.completionDate}
                type="date"
                value={formData.completionDate}
                isEditing={true}
                onChange={(value) => handleChange('completionDate', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={texts.fundingAmount}
                type="number"
                value={formData.fundingAmount}
                isEditing={true}
                onChange={(value) => handleChange('fundingAmount', value)}
              />
              <InputField
                label={texts.transferAmount}
                type="number"
                value={formData.transferAmount}
                isEditing={true}
                onChange={(value) => handleChange('transferAmount', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <InputField
                label={texts.squareMeterValue}
                type="number"
                value={formData.squareMeterValue}
                isEditing={true}
                onChange={(value) => handleChange('squareMeterValue', value)}
              />
              <InputField
                label={texts.area}
                type="number"
                value={formData.area}
                isEditing={true}
                onChange={(value) => handleChange('area', value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <InputField
                label={texts.floors}
                type="number"
                value={formData.floors}
                isEditing={true}
                onChange={(value) => handleChange('floors', value)}
              />
              <InputField
                label={texts.investmentType}
                type="select"
                value={formData.investmentType}
                isEditing={true}
                options={[
                  { label: texts.property, value: 'PROPERTY' },
                  { label: texts.other, value: 'OTHER' },
                ]}
                onChange={(value) => handleChange('investment', value)}
              />
            </div>
            <InputField
              label={texts.images}
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
                {texts.cancel}
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
                    texts.add
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
