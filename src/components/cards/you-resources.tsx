'use client'

import { useLayoutContext } from '@/context/layout-context'
import DoughnutChart from '../charts/doughnut-chart'

interface PieChart {
  houses: number
  lands: number
  walletBalance: number
}

interface YorResourcesProps {
  chart: PieChart
  totalInvested: number
}

export function YorResources({ chart, totalInvested }: YorResourcesProps) {
  const { texts } = useLayoutContext()

  const colors = ['#A47659', '#a4a96b', '#525820']

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-zinc-700 rounded-xl h-auto justify-around">
      <section className="relative flex justify-center items-center">
        <DoughnutChart
          data={[chart.houses, chart.lands, chart.walletBalance]}
          colors={colors}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p>
            U${' '}
            {totalInvested.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs font-light">{texts.estimatedAssets}</p>
        </div>
      </section>

      <section className="flex-col justify-between">
        <h1 className="uppercase font-medium">{texts.youResources}</h1>
        <div className="flex items-center gap-x-2 font-light p-2 md:p-5">
          <span className="p-2 bg-[#A47659] rounded-full" />
          <p>{texts.numberOfHouse}</p>
        </div>

        <div className="flex items-center gap-x-2 font-light p-2 md:p-5 border-y border-zinc-500">
          <span className="p-2 bg-[#a4a96b] rounded-full" />
          <p>{texts.land}</p>
        </div>

        <div className="flex items-center gap-x-2 font-light p-2 md:p-5">
          <span className="p-2 bg-[#525820] rounded-full" />
          <p>{texts.avaliableValue}</p>
        </div>
      </section>
    </div>
  )
}
