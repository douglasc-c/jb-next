'use client'

import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import AddUserModal from '@/components/modals/add-user'
import Search from '@/components/searchs/search'
import { UsersTable } from '@/components/tables/users'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface User {
  firstName: string
  lastName: string
  email: string
  role: string
  id: string
}

interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'USER'
}

interface Totals {
  total: number
  totalUsers: number
  totalAdmins: number
}

export default function Users() {
  const t = useTranslations('TextLang')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [totals, setTotals] = useState<Totals>({
    total: 0,
    totalUsers: 0,
    totalAdmins: 0,
  })

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'USER',
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredUsers(results)
  }

  const handleInputChange = (
    field: string,
    value: string | number | boolean | File[] | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingButton(true)
    e.preventDefault()
    try {
      const response = await api.post('/users', formData)
      if (response.status === 201) {
        const newUser = response.data.user
        setUsers((prevUsers) => [...prevUsers, newUser])
        setFilteredUsers((prevFilteredUsers) => [...prevFilteredUsers, newUser])
      } else {
        setError(
          response.data.message ||
            t('errorAddingUser') ||
            'Erro ao adicionar usuário',
        )
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      fetchUsers()
      setLoadingButton(false)
      closeModal()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      const fetchedUsers: User[] = response.data
      const computedTotals = fetchedUsers.reduce<Totals>(
        (acc, user) => {
          acc.total += 1
          if (user.role === 'USER') acc.totalUsers += 1
          if (user.role === 'ADMIN') acc.totalAdmins += 1
          return acc
        },
        { total: 0, totalUsers: 0, totalAdmins: 0 },
      )
      setUsers(fetchedUsers)
      setFilteredUsers(fetchedUsers)
      setTotals(computedTotals)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    )
    setFilteredUsers((prevFilteredUsers) =>
      prevFilteredUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    )
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-zinc-700 h-[calc(100vh-5rem)] flex flex-col items-start md:p-10 p-4 rounded-lg space-y-4 antialiased">
      <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-4 w-full">
        <div className="col-span-2 md:col-span-1 bg-primary text-textPrimary shadow rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/users.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {t('total')}: {totals.total}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-primary text-textPrimary shadow rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/user.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {t('users')}: {totals.totalUsers}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-primary text-textPrimary shadow rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/admin.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {t('admins')}: {totals.totalAdmins}
          </p>
        </div>
        <div className="col-span-2">
          <Search
            placeholder="Buscar usuários..."
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-center items-center">
          <ButtonGlobal
            type="button"
            params={{ title: t('addUser'), color: 'bg-primary' }}
            onClick={openModal}
          />
        </div>
      </div>
      <section className="flex flex-col w-full rounded-xl bg-zinc-300 space-y-4">
        <UsersTable data={filteredUsers} onUserUpdate={handleUserUpdate} />
      </section>
      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          formData={formData}
          error={error}
          loading={loadingButton}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </main>
  )
}
