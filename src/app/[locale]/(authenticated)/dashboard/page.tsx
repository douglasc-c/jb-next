'use client'

import { DataInvestments } from '@/components/cards/data-investments'
import { MyContracts } from '@/components/cards/my-contracts'
import { NewOpportunities } from '@/components/cards/new-opportunities'
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

  const data = [
    {
      status: 'CONFIRMADO',
      company: 'Empresa XYZ',
      name: 'Residencial 1',
      document: '1234567654',
      initialDate: 'Mar/2024',
      address: 'Linha Adolfo Konder, S/N Caçador-SC',
      typeOfConstruction: 'Casa',
      contributionAmount: '10,000.00',
      amountPassed: '10,000.00',
      postalCode: '1234567',
      city: 'MIAMI',
      valueM2: '600.00',
      footage: '120',
      floors: '1 Andar',
      data: '2025/02/01',
      provisionalCompletion: '2025/02/01',
      progressStatus: 'Previsto',
      constructionStatus: 50,
      stage: 3,
    },
    {
      status: 'CONFIRMADO',
      company: 'Empresa XYZ',
      name: 'Residencial 2',
      document: '7894561230',
      initialDate: 'Apr/2024',
      address: 'Rua Nova Esperança, 25',
      typeOfConstruction: 'Apartamento',
      contributionAmount: '15,000.00',
      amountPassed: '8,000.00',
      postalCode: '8904567',
      city: 'NEW YORK',
      valueM2: '700.00',
      footage: '200',
      floors: '5 Andares',
      data: '2026/01/01',
      provisionalCompletion: '2026/01/01',
      progressStatus: 'Em Andamento',
      constructionStatus: 30,
      stage: 2,
    },
    {
      status: 'CONFIRMADO',
      company: 'Empresa ABC',
      name: 'Residencial 3',
      document: '9876543210',
      initialDate: 'May/2024',
      address: 'Av. Principal, 123',
      typeOfConstruction: 'Condomínio',
      contributionAmount: '25,000.00',
      amountPassed: '12,000.00',
      postalCode: '4567890',
      city: 'LONDON',
      valueM2: '800.00',
      footage: '500',
      floors: '10 Andares',
      data: '2027/05/01',
      provisionalCompletion: '2027/05/01',
      progressStatus: 'Previsto',
      constructionStatus: 10,
      stage: 1,
    },
  ]

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col items-start p-6 pr-36 space-y-4">
      <section className="flex w-full space-x-6">
        <div className="flex flex-col w-2/3">
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
      <section className="flex w-full space-x-6">
        <NewOpportunities />
      </section>
      <section className="flex w-full rounded-xl bg-zinc-700 space-x-6 overflow-auto">
        <MyContracts data={data} />
      </section>
    </main>
  )
}
