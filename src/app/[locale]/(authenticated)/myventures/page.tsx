'use client'

import { MyContracts } from '@/components/cards/my-contracts'
import { useLayoutContext } from '@/context/layout-context'
// import Image from 'next/image'

export default function MyVentures() {
  const { textMyVentures } = useLayoutContext()

  const data = [
    {
      status: 'AGUARDANDO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '02/06/2024',
      valorInvestimento: 'R$ 999.999,99',
      valorRepassado: 'R$ 999.999,99',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '01/02/2024',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
    {
      status: 'CONFIRMADO',
      empresa: 'RAZÃO SOCIAL DA EMPRESA',
      data: '13/10/2023',
      valorInvestimento: 'R$ 999.999,00',
      valorRepassado: 'R$ 999.999,00',
    },
  ]

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{textMyVentures.myVentures}</h1>
        <MyContracts  bgColor="bg-zinc-800" data={data} />
      </div>
    </main>
  )
}
