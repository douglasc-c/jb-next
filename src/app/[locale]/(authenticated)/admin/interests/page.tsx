'use client'

import { Loading } from '@/components/loading/loading'
import { InterestsTable } from '@/components/tables/interests'
import { useLayoutAdminContext } from '@/context/admin-context'
import api from '@/lib/api'
import axios from 'axios'
import Image from 'next/image'
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
  documentFront: string
  documentBack: string
  proofOfAddress: string
  incomeTaxProof: string
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

interface Image {
  url: string
}

interface Contract {
  id: string
  filePath: string
  isFinalized: string
  enterpriseId: string
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
  contracts: Contract[]
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

export default function Interests() {
  const { texts } = useLayoutAdminContext()
  const [loading, setLoading] = useState(true)
  const [ventures, setVentures] = useState<Venture[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const response = await api.get('/admin/get-interest-enterprise')
        const fetchedVentures: Venture[] = response.data.enterprises

        setVentures(fetchedVentures)
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

    fetchVentures()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <section className="flex flex-col w-full rounded-xl bg-zinc-300 space-y-4">
        {ventures.length > 0 ? (
          <InterestsTable data={ventures} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <Image
              src="/images/svg/warning-grey.svg"
              width={100}
              height={100}
              alt="warning"
            />
            <p className=" text-lg font-medium">
              {texts.noInterestedPartiesFound}
            </p>
            <p className="text-zinc-500 text-sm">
              {texts.thereAreStillNoInterestedPartiesForTheRegisteredProjects}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
