'use client'

import { useTranslations } from 'next-intl'
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
  const t = useTranslations('TextLang')
  const colors = ['#A47659', '#86776B', '#A38C7E']

  return (
    <div className="flex antialiased flex-col md:flex-row p-6 gap-6 bg-primary text-textPrimary border border-border rounded-xl h-auto justify-around">
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
          <p className="text-xs font-light">{t('estimatedAssets')}</p>
        </div>
      </section>

      <section className="flex-col justify-between">
        <h1 className="uppercase font-medium">{t('youResources')}</h1>
        <div className="flex items-center gap-x-2 font-light p-2 md:p-5">
          <span className="p-2 bg-[#A47659] rounded-full" />
          <p>{t('numberOfHouse')}</p>
        </div>

        <div className="flex items-center gap-x-2 font-light p-2 md:p-5 border-y border-zinc-500">
          <span className="p-2 bg-[#86776B] rounded-full" />
          <p>{t('land')}</p>
        </div>

        <div className="flex items-center gap-x-2 font-light p-2 md:p-5">
          <span className="p-2 bg-[#A38C7E] rounded-full" />
          <p>{t('avaliableValue')}</p>
        </div>
      </section>
    </div>
  )
}
