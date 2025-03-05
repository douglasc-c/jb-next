'use client'

import { Loading } from '@/components/loading/loading'
import Search from '@/components/searchs/search'
import { DepositsTable } from '@/components/tables/deposit'
import { useLayoutAdminContext } from '@/context/admin-context'
import api from '@/lib/api'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DepositUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface Deposit {
  id: number
  userId: number
  codeDeposit: string
  amount: number
  status: string
  proofUrl: string
  adminComment: string | null
  approvedAt: string | null
  balanceUpdatedAt: string | null
  createdAt: string
  updatedAt: string
  user: DepositUser
}

interface DepositFormData {
  codeDeposit: string
  amount: number
  proof?: File | null
}

interface Totals {
  total: number
  pending: number
  approved: number
}

export default function Wallet() {
  const { texts } = useLayoutAdminContext()
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredDeposits, setFilteredDeposits] = useState<Deposit[]>([])

  const [totals, setTotals] = useState<Totals>({
    total: 0,
    pending: 0,
    approved: 0,
  })

  const [formData, setFormData] = useState<DepositFormData>({
    codeDeposit: '',
    amount: 0,
    proof: null,
  })

  const handleChange = (
    field: keyof DepositFormData,
    value: string | number | File | null,
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingButton(true)

    try {
      const dataToSend = new FormData()
      dataToSend.append('codeDeposit', formData.codeDeposit)
      dataToSend.append('amount', String(formData.amount))
      if (formData.proof) {
        dataToSend.append('proof', formData.proof)
      }

      const response = await api.post('/admin/create-deposit', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 201) {
        const deposit = response.data.deposit
        setDeposits((prev) => [...prev, deposit])
        setFilteredDeposits((prev) => [...prev, deposit])
        fetchDeposits()
        setFormData({
          codeDeposit: '',
          amount: 0,
          proof: null,
        })
      } else {
        setError(response.data.message || 'Erro ao adicionar depósito')
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
      setLoadingButton(false)
      fetchDeposits()
      closeModal()
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = deposits.filter((deposit) => {
      const userName =
        `${deposit.user.firstName} ${deposit.user.lastName}`.toLowerCase()
      return (
        deposit.codeDeposit.toLowerCase().includes(query.toLowerCase()) ||
        userName.includes(query.toLowerCase()) ||
        deposit.status.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredDeposits(results)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const fetchDeposits = async () => {
    try {
      const response = await api.get('admin/deposits')
      const { deposits: fetchedDeposits } = response.data

      setDeposits(fetchedDeposits)
      setFilteredDeposits(fetchedDeposits)

      const computedTotals = (fetchedDeposits as Deposit[]).reduce<Totals>(
        (acc, deposit) => {
          acc.total += 1
          if (deposit.status === 'PENDING') {
            acc.pending += 1
          } else if (deposit.status === 'APPROVED') {
            acc.approved += 1
          }
          return acc
        },
        { total: 0, pending: 0, approved: 0 },
      )
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
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeposits()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-4 w-full">
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/totalVentures.svg"
            width={25}
            height={25}
            alt="Total Deposits"
          />
          <p>
            {texts.total || 'Total'}: {totals.total}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/clock.svg"
            width={25}
            height={25}
            alt="Pending Deposits"
          />
          <p>
            {texts.pending || 'Pendente'}: {totals.pending}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/clock.svg"
            width={25}
            height={25}
            alt="Approved Deposits"
          />
          <p>
            {texts.approved || 'Aprovado'}: {totals.approved}
          </p>
        </div>
        <div className="col-span-2">
          <Search
            placeholder="Buscar depósito..."
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <section className="flex flex-col w-full rounded-xl bg-zinc-300 space-y-4">
        <DepositsTable data={filteredDeposits} />
      </section>

      {/* {isModalOpen && (
        <AddDepositModal
          isOpen={isModalOpen}
          formData={formData}
          error={error}
          loading={loadingButton}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )} */}
    </main>
  )
}
