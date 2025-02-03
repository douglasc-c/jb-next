'use client'

import { DataInvestments } from '@/components/cards/data-investments'
import { NewOpportunities } from '@/components/cards/new-opportunities'
import { YorResources } from '@/components/cards/you-resources'
import { useLayoutContext } from '@/context/layout-context'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Loading } from '@/components/loading/loading'
import Image from 'next/image'
import { MyVenturesTable } from '@/components/tables/my-ventures'
import axios from 'axios'

interface PieChart {
  houses: number
  lands: number
  walletBalance: number
}

interface CurrentPhase {
  id: number
  phaseName: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

interface CurrentTask {
  id: number
  taskName: string
  description: string
  phaseId: number
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
}

interface ImageItem {
  imageUrl: string
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
  squareMeterValue: number
  area: number
  contracts: Contract[]
  totalValuation: number
  progress: number
  floors: number
  completionDate: string
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: ImageItem[]
}

export default function Dashboard() {
  const { texts } = useLayoutContext()

  const [loading, setLoading] = useState(true)
  const [pieChart, setPieChart] = useState<PieChart>({
    houses: 0,
    lands: 0,
    walletBalance: 0,
  })
  const [totalInvested, setTotalInvested] = useState(0)
  const [totalValution, setTotalValution] = useState(0)
  const [enterpriseCount, setEnterpriseCount] = useState(0)
  const [recentEnterprises, setRecentEnterprises] = useState<Venture[]>([])
  const [error, setError] = useState('')
  const [userRecentEnterprises, setUserRecentEnterprises] = useState<Venture[]>(
    [],
  )

  const textPortfoli0 = {
    balance: texts.totalBalance,
    type: texts.portfolio,
  }

  const textInvested = {
    balance: texts.balanceInvested,
    type: texts.invested,
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/users/web/dashboard')

        const fetchedPieChart = response.data.data.pieChart
        const fetchedTotalInvested = response.data.data.totalInvested
        const fetchedTotalValuation = response.data.data.totalValuation
        const fetchedEnterpriseCount = response.data.data.enterpriseCount
        const fetchedRecentEnterprises = response.data.data.recentEnterprises
        const fetchedUserRecentEnterprises = response.data.data.userEnterprises

        setPieChart(fetchedPieChart)
        setTotalInvested(fetchedTotalInvested)
        setTotalValution(fetchedTotalValuation)
        setEnterpriseCount(fetchedEnterpriseCount)
        setRecentEnterprises(fetchedRecentEnterprises)
        setUserRecentEnterprises(fetchedUserRecentEnterprises)
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

    fetchDashboard()
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
    <main className="bg-zinc-200 md:h-[calc(91vh)] flex flex-col items-start p-6 gap-6">
      <section className="flex w-full flex-col md:flex-row gap-6">
        <div className="flex flex-col md:w-9/12">
          <YorResources chart={pieChart} totalInvested={totalInvested} />
        </div>
        <div className="flex flex-col gap-5">
          <DataInvestments
            params={{
              text: textPortfoli0,
              bgColor: 'bg-secondary',
              image: 'wallet',
              imageColor: 'bg-primary',
              totalValue: totalValution,
              enterpriseCount,
            }}
          />
          <DataInvestments
            params={{
              text: textInvested,
              bgColor: 'bg-tertiary',
              image: 'investment',
              imageColor: 'bg-quaternary',
              totalValue: totalInvested,
              enterpriseCount,
            }}
          />
        </div>
      </section>
      <section className="flex w-full">
        <NewOpportunities recentEnterprises={recentEnterprises} />
      </section>
      <section className="flex w-full rounded-xl bg-zinc-300 space-x-6 overflow-auto">
        {userRecentEnterprises.length > 0 ? (
          <MyVenturesTable data={userRecentEnterprises} />
        ) : (
          <div className="p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative w-full">
            <div className="text-center items-center flex flex-col space-y-4">
              <Image
                src="/images/svg/warning-grey.svg"
                alt="arrow icon"
                height={90}
                width={90}
              />
              <span className="text-lg">{texts.youHaveNoBusiness}</span>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
