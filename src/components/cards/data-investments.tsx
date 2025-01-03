'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

interface DataInvestmentsPros {
  params: {
    text: {
      type?: string
      balance?: string
    }
    bgColor: string
    image: string
    imageColor: string
    totalValue: number
    enterpriseCount: number
  }
}

export function DataInvestments({ params }: DataInvestmentsPros) {
  const { text, bgColor, image, imageColor, totalValue, enterpriseCount } =
    params
  const { textDataInvestments } = useLayoutContext()

  return (
    <div
      className={`flex items-center p-4 pr-10 rounded-xl ${bgColor} text-white, justify-between`}
    >
      <div className="flex flex-col justify-center items-center">
        <span className="text-xs transform -rotate-90 tracking-wide uppercase">
          {text.type}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div
          className={`w-16 h-16 rounded-full ${imageColor} flex items-center justify-center`}
        >
          <Image
            src={`/images/svg/${image}.svg`}
            alt="image"
            height={40}
            width={40}
          />
        </div>
        <div className="flex flex-col text-center">
          <span className="text-lg font-semibold">U$ {totalValue}</span>
          <span className="text-sm text-zinc-300">{text.balance}</span>
          <span className="text-xl font-bold">{enterpriseCount}</span>
          <span className="text-sm text-zinc-300">
            {textDataInvestments.developments}
          </span>
        </div>
      </div>
    </div>
  )
}
