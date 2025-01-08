'use client'

import { DataInvestments } from '@/components/cards/data-investments'
// import { MyContracts } from '@/components/tables/my-contracts'
import { NewOpportunities } from '@/components/cards/new-opportunities'
import { YorResources } from '@/components/cards/you-resources'
import { useLayoutContext } from '@/context/layout-context'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface PieChart {
  houses: number
  lands: number
  walletBalance: number
}

export default function Dashboard() {
  const { textDataInvestments } = useLayoutContext()

  const [loading, setLoading] = useState(true)
  const [pieChart, setPieChart] = useState<PieChart>({
    houses: 0,
    lands: 0,
    walletBalance: 0,
  })
  const [totalInvested, setTotalInvested] = useState(0)
  const [totalValution, setTotalValution] = useState(0)
  const [enterpriseCount, setEnterpriseCount] = useState(0)
  const [recentEnterprises, setRecentEnterprises] = useState([])
  const [error, setError] = useState<string | null>(null)

  const textPortfoli0 = {
    balance: textDataInvestments.totalBalance,
    type: textDataInvestments.portfolio,
  }

  const textInvested = {
    balance: textDataInvestments.balanceInvested,
    type: textDataInvestments.invested,
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/users/dashboard')
        const fetchedPieChart = response.data.data.pieChart
        const fetchedTotalInvested = response.data.data.totalInvested
        const fetchedTotalValution = response.data.data.totalValution
        const fetchedEnterpriseCount = response.data.data.enterpriseCount
        const fetchedRecentEnterprises = response.data.data.recentEnterprises

        setPieChart(fetchedPieChart)
        setTotalInvested(fetchedTotalInvested)
        setTotalValution(fetchedTotalValution)
        setEnterpriseCount(fetchedEnterpriseCount)
        setRecentEnterprises(fetchedRecentEnterprises)
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err)
        setError('Erro ao carregar os dados. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 pr-36">
        <span>Carregando...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 pr-36 space-y-4">
      <section className="flex w-full space-x-6">
        <div className="flex flex-col w-9/12">
          <YorResources chart={pieChart} totalInvested={totalInvested} />
        </div>
        <div className="flex flex-col w-4/12 space-y-5">
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
      <section className="flex w-full space-x-6">
        <NewOpportunities recentEnterprises={recentEnterprises} />
      </section>
      <section className="flex w-full rounded-xl bg-zinc-700 space-x-6 overflow-auto">
        {/* <MyContracts data={data} /> */}
      </section>
    </main>
  )
}
