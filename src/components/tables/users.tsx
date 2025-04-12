'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface UsersTableProps {
  data: User[]
  onUserUpdate: (updatedUser: User) => void
}

export function UsersTable({ data }: UsersTableProps) {
  const t = useTranslations('TextLang')
  const router = useRouter()

  const handleSeeMore = (user: User) => {
    router.push(`/admin/users/${user.id}`)
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
                {t('email')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('role')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('shares')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {data.map((user) => (
              <tr key={user.id} className="">
                <td className="px-4 py-2 text-xs text-left">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2 text-xs text-center">{user.email}</td>
                <td className="px-4 py-2 text-xs text-center">{user.role}</td>
                <td className="px-4 py-2 text-xs text-center">
                  <button
                    onClick={() => handleSeeMore(user)}
                    className="rounded-full hover:bg-title hover:text-primary py-1 px-4 bg-transparent"
                  >
                    {t('seeMore')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
