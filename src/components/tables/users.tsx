'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { UserDetails } from '../modals/user-datails'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface MyVenturesProps {
  data: User[]
  onUserUpdate: (updatedUser: User) => void
}

export function UsersTable({ data, onUserUpdate }: MyVenturesProps) {
  const t = useTranslations('TextLang')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const openModal = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <section className="h-auto w-full p-4 bg-primary antialiased border border-border text-textPrimary rounded-md">
      <div className="custom-scroll max-h-[40rem]">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium">
                {t('name')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('type')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('email')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('seeMore')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${index !== data.length - 1 ? 'border-b border-zinc-400' : ''}`}
              >
                <td className="px-4 py-2 text-xs text-left">
                  {row.firstName} {row.lastName}
                </td>
                <td className="px-4 py-2 text-xs text-center">{row.role}</td>
                <td className="px-4 py-2 text-xs text-center">{row.email}</td>

                <td className="px-4 py-2 text-xs text-center">
                  <button
                    className="rounded-full border border-primary py-1 px-4 bg-transparent"
                    onClick={() => openModal(row)}
                  >
                    {t('seeMore')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
          >
            <div className="w-full md:w-2/3">
              <UserDetails
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={closeModal}
                onUpdate={onUserUpdate}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
