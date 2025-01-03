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
  const { textYourResources } = useLayoutContext()

  const colors = ['#bac914', '#a4a96b', '#525820']

  return (
    <div className="flex p-6 bg-zinc-700 rounded-xl h-auto justify-around">
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
          <p className="text-xs font-light">
            {textYourResources.estimatedAssets}
          </p>
        </div>
      </section>
      <span className="border border-zinc-500" />
      <section className="flex flex-col justify-between">
        <h1 className="uppercase font-medium">
          {textYourResources.youResources}
        </h1>
        <div className="flex items-center space-x-2 font-light p-5">
          <span className="p-2 bg-[#bac914] rounded-full" />
          <p>{textYourResources.numberOfHouse}</p>
        </div>
        <span className="border border-zinc-500" />
        <div className="flex items-center space-x-2 font-light p-5">
          <span className="p-2 bg-[#a4a96b] rounded-full" />
          <p>{textYourResources.land}</p>
        </div>
        <span className="border border-zinc-500" />
        <div className="flex items-center space-x-2 font-light p-5">
          <span className="p-2 bg-[#525820] rounded-full" />
          <p>{textYourResources.avaliableValue}</p>
        </div>
      </section>
    </div>
  )
}
