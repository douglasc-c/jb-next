'use client'
import { useLayoutContext } from '@/context/layout-context'
import { useEffect, useState } from 'react'
import { Networks } from '../cards/networks'
import { OrderBook } from '../cards/order-book'
import ProfitCalculator from '../widgets/profit-calculator'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBook {
  asks: Order[]
  bids: Order[]
}

interface Network {
  exchange: string
  network: string
  symbol: string
  withdrawFee: string
}

interface Opportunity {
  svgIcon: string
  coinName: string
  symbol: string
  spreadPercent: number
  withdrawFee: number
  network: string
  buyPrice: number
  sellPrice: number
  exchangeBuy: string
  exchangeSell: string
  buyOrderbook: OrderBook
  sellOrderbook: OrderBook
  allNetworksBuy: Network[]
  allNetworksSell: Network[]
}

interface OpportunityProps {
  isOpen: boolean
  onClose: () => void
  symbol: string
  opportunity: Opportunity | null
}

export function OperationDetails({
  isOpen,
  onClose,
  symbol,
  opportunity,
}: OpportunityProps) {
  const { textOpportunity } = useLayoutContext()
  const [localData, setLocalData] = useState<Opportunity | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    if (opportunity && opportunity.symbol === symbol) {
      setLocalData(opportunity)
    }
  }, [symbol, opportunity])
  if (!isOpen || !localData) return null

  const adjustSvgSize = (svgContent: string, width: string, height: string) => {
    return svgContent
      .replace(/width="[^"]*"/, `width="${width}"`)
      .replace(/height="[^"]*"/, `height="${height}"`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-[100vh] w-[100vw] overflow-hidden">
      <div className="bg-stone-950 rounded-xl border w-full h-full border-stone-800 px-10">
        <div className="flex justify-between py-4">
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-row items-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: adjustSvgSize(localData.svgIcon, '50px', '50px'),
                }}
                aria-label="coin-icon"
              />
              <p className="font-semibold text-2xl ml-2 ">
                {localData.coinName}{' '}
              </p>
              <p className="font-semibold text-2xl ml-2">
                ({localData.symbol})
              </p>
            </div>
            <p>
              {textOpportunity.spread}: {localData.spreadPercent}%
            </p>
            <p>
              {textOpportunity.fee}: 0.60% + $ {localData.withdrawFee}
            </p>
          </div>
          <div className="flex flex-row py-2 items-center justify-end">
            <button
              className="items-center justify-center flex bg-red-500 p-1 px-3 rounded-md"
              onClick={onClose}
            >
              <a className="text-sm">{textOpportunity.cancel}</a>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-full">
          <Networks
            networksBuy={localData?.allNetworksBuy}
            networksSell={localData?.allNetworksSell}
          />
          <ProfitCalculator />

          <OrderBook
            title={textOpportunity.purchaseBook}
            orders={localData.buyOrderbook.asks}
            lastPrice={localData.buyPrice}
            exchangeIcon={`/images/exchanges/${localData.exchangeBuy}.svg`}
            isBuy={true}
          />

          <OrderBook
            title={textOpportunity.salesBook}
            orders={localData.sellOrderbook.bids}
            lastPrice={localData.sellPrice}
            exchangeIcon={`/images/exchanges/${localData.exchangeSell}.svg`}
            isBuy={false}
          />
        </div>
      </div>
    </div>
  )
}
