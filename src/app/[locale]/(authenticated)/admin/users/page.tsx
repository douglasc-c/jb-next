'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { UsersTable } from '@/components/tables/users'
import ButtonGlobal from '@/components/buttons/global'
import AddUserModal from '@/components/modals/add-user'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { Loading } from '@/components/loading/loading'
import Search from '@/components/searchs/search'
import Image from 'next/image'

interface User {
  firstName: string
  lastName: string
  complianceStatus: string
  email: string
  phone: string
  role: string
  birthDate: string
  createdAt: string
  totalInvested: number
  totalValuation: number
  documentFront: string
  documentBack: string
  proofOfAddress: string
  incomeTaxProof: string
  username: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
}

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

interface Totals {
  total: number
  totalUsers: number
  totalAdmins: number
}

export default function Users() {
  const { texts } = useLayoutAdminContext()
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
    username: '',
    firstName: '',
    lastName: '',
    numberDocument: '',
    phone: '',
    userType: 'INDIVIDUAL',
    role: 'USER',
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.complianceStatus.toLowerCase().includes(query.toLowerCase()) ||
        user.userType.toLowerCase().includes(query.toLowerCase()) ||
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
      const response = await api.post('/admin/register', formData)

      if (response.status === 201) {
        const newUser = response.data.user
        setUsers((prevUsers) => [...prevUsers, newUser])
        setFilteredUsers((prevFilteredUsers) => [...prevFilteredUsers, newUser])
        setLoadingButton(false)
        closeModal()
      } else {
        setLoadingButton(false)
        setError(response.data.message || 'Erro ao adicionar usuário')
      }
    } catch (err) {
      setLoadingButton(false)
      setError('Erro na comunicação com a API')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/get-all-users')
        const fetchedUsers: User[] = response.data.users

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
      } catch (err) {
        console.error('Erro ao buscar usuários:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <div className="text-white grid md:grid-cols-3 grid-cols-2 items-center gap-4 w-full">
        <div className="col-span-2 md:col-span-1 bg-zinc-700 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/users.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {texts.total}: {totals.total}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-700 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/user.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {texts.users}: {totals.totalUsers}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-700 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/admin.svg"
            width={30}
            height={30}
            alt="Document"
          />
          <p>
            {texts.admins}: {totals.totalAdmins}
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
            params={{
              title: texts.addUser,
              color: 'bg-primary',
            }}
            onClick={openModal}
          />
        </div>
      </div>
      <section className="flex flex-col w-full rounded-xl bg-zinc-700 space-y-4">
        <UsersTable data={filteredUsers} />
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
