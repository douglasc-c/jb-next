'use client'
import React from 'react'
import Image from 'next/image'
import { useLayoutContext } from '@/context/layout-context'

interface Order {
  price: string
  volume: string
}

interface OrderBook {
  asks: Order[]
  bids: Order[]
}

interface BookData {
  buyOrderbook: OrderBook
  sellOrderbook: OrderBook
  exchangeBuy: string
  exchangeSell: string
}

interface BookProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  data: BookData
}

export function Book({ isOpen, onClose, children, data }: BookProps) {
  const { textOpportunity } = useLayoutContext()

  const [isSelected, setIsSelected] = React.useState('buy')

  if (!isOpen) return null

  const onSelectBuy = () => setIsSelected('buy')
  const onSelectSell = () => setIsSelected('sell')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-5">
      <div className="bg-stone-950 rounded-t-md rounded-b-md shadow-lg max-w-md w-full border border-stone-800">
        <section className="items-center justify-between flex">
          <button
            className={`border-b-4 p-4 ${isSelected === 'buy' ? 'border-green-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
            onClick={onSelectBuy}
          >
            <a className="font-bold">{textOpportunity.purchaseBook}</a>
          </button>
          <button
            className={`border-b-4 p-4 ${isSelected === 'sell' ? 'border-red-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
            onClick={onSelectSell}
          >
            <a className="font-bold">{textOpportunity.salesBook}</a>
          </button>
        </section>
        <div className="flex justify-between px-16 py-3 ">
          <Image
            className="py-4"
            src={`/images/exchanges/${data.exchangeBuy}.svg`}
            alt="mercadobitcoin"
            height={50}
            width={50}
          />
          <Image
            src="/images/svg/iconArrow.svg"
            alt="arrow"
            className="mx-2"
            width={20}
            height={30}
          />
          <Image
            className="py-4"
            src={`/images/exchanges/${data.exchangeSell}.svg`}
            alt="mercadobitcoin"
            height={50}
            width={50}
          />
        </div>
        <div className="overflow-x-auto h-44 ">
          <table className="min-w-full text-sm text-gray-400">
            <thead className="text-xs bg-zinc-800 uppercase text-gray-400 border-b ">
              <tr>
                <th scope="col" className="w-1/3 px-6 py-3 text-left">
                  {textOpportunity.price}
                </th>
                <th scope="col" className="w-1/3 px-6 py-3 text-center">
                  {textOpportunity.volume}
                </th>
                <th scope="col" className="w-1/3 px-6 py-3 text-right">
                  {textOpportunity.volume}
                </th>
              </tr>
            </thead>
            <tbody className="h-32 overflow-y-auto bg-zinc-800">
              {isSelected === 'buy'
                ? data.buyOrderbook.asks.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="w-1/3 px-6 py-2 text-xs text-left">
                        $ {order.price}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-center">
                        {order.volume}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-right">
                        $ {order.volume}
                      </td>
                    </tr>
                  ))
                : data.sellOrderbook.bids.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="w-1/3 px-6 py-2 text-xs text-left">
                        $ {order.price}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-center">
                        {order.volume}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-right">
                        $ {order.volume}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <section className="flex items-center justify-center">
          <button
            className="items-center justify-center flex bg-red-500 w-[40%] p-1 m-2 rounded-md"
            onClick={onClose}
          >
            <a className="text-sm">{textOpportunity.cancel}</a>
          </button>
        </section>
        {children}
      </div>
    </div>
  )
}
