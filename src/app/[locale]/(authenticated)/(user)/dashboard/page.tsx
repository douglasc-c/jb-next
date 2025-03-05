'use client'

import { DataInvestments } from '@/components/cards/data-investments'
import { NewOpportunities } from '@/components/cards/new-opportunities'
import { YorResources } from '@/components/cards/you-resources'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

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
  const t = useTranslations('TextLang')

  const [loading, setLoading] = useState(true)
  const [pieChart, setPieChart] = useState<PieChart>({
    houses: 0,
    lands: 0,
    walletBalance: 0,
  })
  const [totalInvested, setTotalInvested] = useState(0)
  const [totalValuation, setTotalValuation] = useState(0)
  const [enterpriseCount, setEnterpriseCount] = useState(0)
  const [recentEnterprises, setRecentEnterprises] = useState<Venture[]>([])
  const [error, setError] = useState('')
  const [userRecentEnterprises, setUserRecentEnterprises] = useState<Venture[]>(
    [],
  )

  const textPortfolio = {
    balance: t('totalBalance'),
    type: t('portfolio'),
  }

  const textInvested = {
    balance: t('balanceInvested'),
    type: t('invested'),
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/users/web/dashboard')
        const data = response.data.data

        setPieChart(data.pieChart)
        setTotalInvested(data.totalInvested)
        setTotalValuation(data.totalValuation)
        setEnterpriseCount(data.enterpriseCount)
        setRecentEnterprises(data.recentEnterprises)
        setUserRecentEnterprises(data.userEnterprises)
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
      <div className="flex justify-center items-center h-screen bg-primary">
        <PulseLoader loading={loading} size={300} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main className=" m-7 bg-gray  h-screen p-10 border border-border rounded-lg flex flex-col items-start gap-6">
      <section className="flex w-full flex-col md:flex-row gap-6   ">
        <div className="flex flex-col md:w-9/12">
          <YorResources chart={pieChart} totalInvested={totalInvested} />
        </div>
        <div className="flex flex-col gap-5">
          <DataInvestments
            params={{
              text: textPortfolio,
              bgColor: 'bg-primary',
              image: 'wallet',
              imageColor: 'bg-primary',
              totalValue: totalValuation,
              enterpriseCount,
            }}
          />
          <DataInvestments
            params={{
              text: textInvested,
              bgColor: 'bg-primary',
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
    </main>
  )
}
