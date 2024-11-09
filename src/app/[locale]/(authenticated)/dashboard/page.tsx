'use client'

import { DataInvestments } from '@/components/cards/data-investments'
import { YorResources } from '@/components/cards/you-resources'
import { useLayoutContext } from '@/context/layout-context'

export default function Dashboard() {
  const { textDataInvestments } = useLayoutContext()
  const textPortfoli0 = {
    balance: textDataInvestments.totalBalance,
    type: textDataInvestments.portfolio,
  }
  const textInvested = {
    balance: textDataInvestments.balanceInvested,
    type: textDataInvestments.invested,
  }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex items-start p-10">
      <section className="flex w-full space-x-6">
        <div className="flex flex-col w-1/2">
          <YorResources />
        </div>
        <div className="flex flex-col space-y-5">
          <DataInvestments
            params={{
              text: textPortfoli0,
              bgColor: 'bg-secondary',
              image: 'wallet',
              imageColor: 'bg-primary',
            }}
          />
          <DataInvestments
            params={{
              text: textInvested,
              bgColor: 'bg-tertiary',
              image: 'investment',
              imageColor: 'bg-quaternary',
            }}
          />
        </div>
      </section>
    </main>
  )
}
