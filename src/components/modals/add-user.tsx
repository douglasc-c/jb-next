import ButtonGlobal from '@/components/buttons/global'
import React, { FC } from 'react'
import { PulseLoader } from 'react-spinners'
import { InputField } from '../inputs/input-field'
import { useTranslations } from 'next-intl'

interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'USER'
}

interface AddUserModalProps {
  isOpen: boolean
  formData: FormData
  loading: boolean
  error: string | null
  handleChange: (
    key: string,
    value: string | number | boolean | File[] | null,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
}

const AddUserModal: FC<AddUserModalProps> = ({
  isOpen,
  formData,
  loading,
  error,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  const t = useTranslations('TextLang')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl mb-4 text-zinc-200">{t('addUser')}</h2>
        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              <InputField
                label={t('firstName')}
                value={formData.firstName}
                isEditing={true}
                onChange={(value) => handleChange('firstName', value)}
              />
              <InputField
                label={t('lastName')}
                value={formData.lastName}
                isEditing={true}
                onChange={(value) => handleChange('lastName', value)}
              />
            </div>
            <InputField
              label={t('email')}
              value={formData.email}
              isEditing={true}
              onChange={(value) => handleChange('email', value)}
            />
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              <InputField
                label={t('password')}
                type="password"
                value={formData.password}
                isEditing={true}
                onChange={(value) => handleChange('password', value)}
              />
              <InputField
                label={t('role')}
                value={formData.role}
                isEditing={true}
                type="select"
                options={[
                  { value: 'ADMIN', label: t('admin') },
                  { value: 'USER', label: t('user') },
                ]}
                onChange={(value) => handleChange('role', value)}
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal
