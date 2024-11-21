'use client'

import { useLayoutContext } from '@/context/layout-context'
// import Image from 'next/image'

type RowData = {
  status: string
  empresa: string
  data: string
  valorInvestimento: string
  valorRepassado: string
}
export function MyContracts() {
  const { textMyContracts } = useLayoutContext()

  const data: RowData[] = [
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
  ]

  return (
    <section className="flex flex-col p-4 bg-zinc-700 rounded-xl h-auto justify-around w-full">
      <div className="grid grid-cols-7 gap-2 w-full uppercase text-sm font-medium items-center">
        <h3 className="text-center">{textMyContracts.status}</h3>
        <h3 className="col-span-2">{textMyContracts.company}</h3>
        <h3 className="">{textMyContracts.date}</h3>
        <h3 className="">{textMyContracts.amountInvested}</h3>
        <h3 className="">{textMyContracts.amountTransferred}</h3>
        <h3 className="text-center">{textMyContracts.shares}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-2 w-full text-sm font-normal py-1 items-center"
        >
          <div
            className={`border rounded-full text-center border-green-500 py-0.5 ${
              row.status === 'CONFIRMADO'
                ? 'bg-green-500 text-zinc-700'
                : 'bg-transparent'
            }`}
          >
            <p>{row.status}</p>
          </div>
          <p className="col-span-2">{row.empresa}</p>
          <p className="">{row.data}</p>
          <p className="">{row.valorInvestimento}</p>
          <p className="">{row.valorRepassado}</p>
          <p className="text-center">{textMyContracts.shares}</p>
        </div>
      ))}
    </section>
  )
}
