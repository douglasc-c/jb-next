import React from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { PulseLoader } from 'react-spinners'

interface FormData {
  file: File[] | null
  templateType: string
}

interface Type {
  id: number
  name: string
  templateType: string
}

interface AddContractModalProps {
  isOpen: boolean
  formData: FormData
  types: Type[]
  loading: boolean
  error: string | null
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
}

const AddContractModal: React.FC<AddContractModalProps> = ({
  isOpen,
  formData,
  types,
  loading,
  error,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  const { texts } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-300 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-zinc-200 text-2xl mb-4">{texts.addContract}</h2>

        <div className="mb-4">
          <label className="text-zinc-300 block mb-1">{texts.model}</label>
          <div className="flex flex-row space-y-2">
            <select
              name="templateType"
              value={formData.templateType || ''}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
              required
            >
              <option value="">{texts.selectAModel}</option>
              {types.map((type) => (
                <option key={type.id} value={type.templateType}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="text-zinc-300 block mb-1">
                {texts.uploadContract}
              </label>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-zinc-600 text-zinc-300 py-2 px-4 rounded-lg"
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

export default AddContractModal
