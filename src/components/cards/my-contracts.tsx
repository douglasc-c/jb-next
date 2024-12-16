'use client'

import { useLayoutContext } from '@/context/layout-context'

type RowData = {
  status: string
  empresa: string
  data: string
  valorInvestimento: string
  valorRepassado: string
}

interface MyContractsProps {
  bgColor: string 
  data: RowData[] 
}

export function MyContracts({ bgColor, data }: MyContractsProps) {
  const { textMyContracts } = useLayoutContext()

  return (
    <section className={`flex flex-col p-4 ${bgColor} rounded-xl h-auto justify-around w-full`}>
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
          className="grid grid-cols-7 gap-2 w-full text-sm font-normal py-3 items-center border-b border-zinc-500"
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
