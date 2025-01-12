import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { PulseLoader } from 'react-spinners'

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
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
}

const AddVentureModal: FC<AddVentureModalProps> = ({
  isOpen,
  formData,
  loading,
  error,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  const { texts } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg w-full md:w-2/3">
        <h2 className="text-white text-2xl mb-4">{texts.addVenture}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-white block">{texts.ventureName}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="text-white block">
                  {texts.corporateName}
                </label>
                <input
                  type="text"
                  name="corporateName"
                  value={formData.corporateName}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-2/3">
                <label className="text-white block">{texts.description}</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">
                  {texts.constructionType}
                </label>
                <select
                  name="constructionType"
                  value={formData.constructionType}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                >
                  <option value="HOUSE">{texts.house}</option>
                  <option value="APARTMENT">{texts.apartment}</option>
                  <option value="OTHER">{texts.other}</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-2/3">
                <label className="text-white block">{texts.address}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">{texts.city}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-white block">{texts.isAvailable}</label>
                <select
                  name="isAvailable"
                  value={formData.isAvailable ? 'true' : 'false'}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                >
                  <option value="true">{texts.available}</option>
                  <option value="false">{texts.notAvaliable}</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-white block">{texts.postalCode}</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="text-white block">
                  {texts.completionDate}
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="text-white block">
                  {texts.fundingAmount}
                </label>
                <input
                  type="number"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">
                  {texts.transferAmount}
                </label>
                <input
                  type="number"
                  name="transferAmount"
                  value={formData.transferAmount}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">
                  {texts.investmentType}
                </label>
                <select
                  name="investmentType"
                  value={formData.investmentType}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                >
                  <option value="PROPERTY">{texts.property}</option>
                  <option value="OTHER">{texts.other}</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="text-white block">
                  {texts.squareMeterValue}
                </label>
                <input
                  type="number"
                  name="squareMeterValue"
                  value={formData.squareMeterValue}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">{texts.area}</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="text-white block">{texts.floorNumber}</label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-white block">{texts.photos}</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
              />
            </div>
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
