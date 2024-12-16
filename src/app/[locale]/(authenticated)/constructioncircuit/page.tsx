'use client'

import { Contract } from '@/components/cards/contract'
import { useLayoutContext } from '@/context/layout-context'
// import Image from 'next/image'

export default function ConstructionCircuit() {
  const { textConstructionCircuit } = useLayoutContext()

  const data = [
    {
      document: '1234567654',
      initialDate: 'Mar/2024',
      address: 'Linha Adolfo Konder, S/N Caçador-SC',
    },
    {
      document: '9876543210',
      initialDate: 'Apr/2024',
      address: 'Rua XV de Novembro, 123 Curitiba-PR',
    },
    {
      document: '9876543210',
      initialDate: 'Apr/2024',
      address: 'Rua XV de Novembro, 123 Curitiba-PR',
    },
    {
      document: '9876543210',
      initialDate: 'Apr/2024',
      address: 'Rua XV de Novembro, 123 Curitiba-PR',
    },
  ]

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{textConstructionCircuit.constructionCircuit}</h1>
        {data.map((item, index) => (
          <Contract key={index} data={item} />
        ))}
      </div>
    </main>
  )
}
