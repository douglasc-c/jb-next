import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { PulseLoader } from 'react-spinners'
import { InputField } from '../inputs/input-field'

interface FormData {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  numberDocument: string
  phone: string
  userType: 'INDIVIDUAL' | 'COMPANY'
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
  const { texts } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-300 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl mb-4">{texts.addUser}</h2>
        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              <InputField
                label={texts.firstName}
                value={formData.firstName}
                isEditing={true}
                onChange={(value) => handleChange('firstName', value)}
              />
              <InputField
                label={texts.lastName}
                value={formData.lastName}
                isEditing={true}
                onChange={(value) => handleChange('lastName', value)}
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
              <InputField
                label={texts.username}
                value={formData.username}
                isEditing={true}
                onChange={(value) => handleChange('username', value)}
              />
              <InputField
                label={texts.phone}
                value={formData.phone}
                isEditing={true}
                onChange={(value) => handleChange('phone', value)}
              />
              <div className="col-span-2 md:col-span-1">
                <InputField
                  label={texts.documentNumber}
                  value={formData.numberDocument}
                  isEditing={true}
                  onChange={(value) => handleChange('numberDocument', value)}
                />
              </div>
            </div>
            <InputField
              label={texts.email}
              value={formData.email}
              isEditing={true}
              onChange={(value) => handleChange('email', value)}
            />
            <InputField
              label={texts.password}
              type="password"
              value={formData.password}
              isEditing={true}
              onChange={(value) => handleChange('password', value)}
            />
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
              <InputField
                label={texts.userType}
                value={formData.userType}
                isEditing={true}
                type="select"
                options={[
                  { value: 'INDIVIDUAL', label: texts.individual },
                  { value: 'COMPANY', label: texts.company },
                ]}
                onChange={(value) => handleChange('userType', value)}
              />
              <InputField
                label={texts.role}
                value={formData.role}
                isEditing={true}
                type="select"
                options={[
                  { value: 'ADMIN', label: texts.admin },
                  { value: 'USER', label: texts.user },
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

export default AddUserModal
