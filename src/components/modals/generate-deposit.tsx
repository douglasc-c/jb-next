import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { PulseLoader } from 'react-spinners'
import { InputField } from '../inputs/input-field'
import { useLayoutContext } from '@/context/layout-context'

interface FormData {
  amount: number
}

interface GenerateDepositProps {
  isOpen: boolean
  formData: FormData
  loading: boolean
  error: string
  success: string
  handleChange: (
    key: string,
    value: string | number | boolean | File[] | null,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
}

const GenerateDeposit: FC<GenerateDepositProps> = ({
  isOpen,
  formData,
  loading,
  error,
  success,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  const { texts } = useLayoutContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-300 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl mb-4">{texts.generateDeposit}</h2>
        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              <InputField
                label={texts.value}
                value={formData.amount}
                isEditing={true}
                onChange={(value) => handleChange('firstName', value)}
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
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
                    texts.generate
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

export default GenerateDeposit
