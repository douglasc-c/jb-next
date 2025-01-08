'use client'

import { Loading } from '@/components/loading/loading'
import { InterestsTable } from '@/components/tables/interests'
import api from '@/lib/api'
import { useEffect, useState } from 'react'

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
  username: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
  address?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
  user: User
}

interface Venture {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount: number
  postalCode: string
  address: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string | null
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  contractInterests: ContractInterest[]
}

export default function Interests() {
  const [loading, setLoading] = useState(true)
  const [ventures, setVentures] = useState<Venture[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const response = await api.get('/admin/get-interest-enterprise')
        const fetchedVentures: Venture[] = response.data.enterprises

        setVentures(fetchedVentures)
      } catch (err) {
        console.error('Erro ao buscar empreendimentos:', err)
        setError('Erro ao buscar empreendimentos')
      } finally {
        setLoading(false)
      }
    }

    fetchVentures()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <section className="flex flex-col w-full rounded-xl bg-zinc-700 space-y-4 p-4">
        <InterestsTable data={ventures} />
      </section>
    </main>
  )
}
