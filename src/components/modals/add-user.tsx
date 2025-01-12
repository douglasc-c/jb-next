import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { PulseLoader } from 'react-spinners'

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-zinc-200 text-2xl mb-4">{texts.addUser}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-zinc-300 block">{texts.name}</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                />
              </div>
              <div>
                <label className="text-zinc-300 block">{texts.lastName}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-zinc-300 block">
                  {texts.documentNumber}
                </label>
                <input
                  type="text"
                  name="numberDocument"
                  value={formData.numberDocument}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                />
              </div>
              <div>
                <label className="text-zinc-300 block">{texts.phone}</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                />
              </div>
              <div>
                <label className="text-zinc-300 block">{texts.username}</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                />
              </div>
              {/* <div>
                <label className="text-white block">{texts.dateOfBith}</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                  required
                />
              </div> */}
            </div>
            <div>
              <label className="text-zinc-300 block">{texts.email}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
            </div>
            <div>
              <label className="text-zinc-300 block">{texts.password}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-zinc-300 block">{texts.userType}</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="COMPANY">Empresa</option>
                </select>
              </div>
              <div>
                <label className="text-zinc-300 block">{texts.role}</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                >
                  <option value="ADMIN">{texts.admin}</option>
                  <option value="USER">{texts.user}</option>
                </select>
              </div>
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
