'use client'

import { useLayoutContext } from '@/context/layout-context'
import DoughnutChart from '../charts/doughnut-chart'

export function YorResources() {
  const { textYourResources } = useLayoutContext()

  const labels = ['Red', 'Blue', 'Yellow']
  const data = [30, 50, 20]
  const colors = ['#FF6384', '#36A2EB', '#FFCE56']

  return (
    <div className="flex p-5 bg-zinc-700 rounded-xl h-auto space-x-8">
      <section className="relative flex justify-center items-center">
        <DoughnutChart labels={labels} data={data} colors={colors} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p>U$ 999,999.99</p>
          <p className="text-xs font-light">{textYourResources.estimatedAssets}</p>
    </div>
      </section>
      <span className="border border-zinc-500" />
      <section className='flex flex-col justify-center'>
        <h1 className='uppercase'>{textYourResources.youResources}</h1>
        <div>
          <div className="flex items-center space-x-2 font-light p-2">
            <span className="p-2 bg-white rounded-full" />
            <p>{textYourResources.numberOfHouse}</p>
          </div>
          <div className="flex items-center space-x-2 font-light border-y border-zinc-500 p-2">
            <span className="p-2 bg-white rounded-full" />
            <p>{textYourResources.land}</p>
          </div>
          <div className="flex items-center space-x-2 font-light p-2">
            <span className="p-2 bg-white rounded-full" />
            <p>{textYourResources.avaliableValue}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
