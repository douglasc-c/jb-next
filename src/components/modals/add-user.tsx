import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'

interface FormData {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
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
  const { textUsers } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-white text-2xl mb-4">{textUsers.addUser}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-white block">{textUsers.email}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white block">{textUsers.password}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white block">{textUsers.username}</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white block">{textUsers.name}</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white block">{textUsers.lastName}</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white block">{textUsers.userType}</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              >
                <option value="INDIVIDUAL">Individual</option>
                <option value="COMPANY">Empresa</option>
              </select>
            </div>
            <div>
              <label className="text-white block">{textUsers.role}</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
                required
              >
                <option value="ADMIN">{textUsers.admin}</option>
                <option value="USER">{textUsers.user}</option>
              </select>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-zinc-600 text-white py-2 px-4 rounded-lg"
              >
                {textUsers.cancel}
              </button>
              <ButtonGlobal
                type="submit"
                disabled={loading}
                params={{
                  title: loading ? textUsers.add : textUsers.add,
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
