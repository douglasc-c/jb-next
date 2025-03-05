'use client'

import { useEnterpriseContext } from '@/context/enterprise-context'
import api from '@/lib/api'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import React, { useEffect, useState } from 'react'

interface SliderHandleProps {
  value: number
  dragging: boolean
  index: number
}

interface Venture {
  id: number
  name: string
  description: string
  fundingAmount: number
  transferAmount: number
  commercializationType: string
  corporateName: string
  status: string
  investmentType: string
  constructionType: string
  postalCode: string
  state: string
  city: string
  squareMeterValue: number
  floors: number
}

function handleRender(
  origin: React.ReactElement,
  props: SliderHandleProps,
): React.ReactElement {
  const { value, dragging, index } = props
  return (
    <Tooltip
      key={index}
      overlay={`${value}%`}
      visible={dragging}
      placement="top"
    >
      {origin}
    </Tooltip>
  )
}

function formatCurrency(num: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(num)
}

interface ResumeTabProps {
  venture: Venture
}

export function ResumeTab({ venture }: ResumeTabProps) {
  const { enterprises, fetchEnterprises, setCurrentEnterprise } =
    useEnterpriseContext()
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [shares, setShares] = useState('')
  const [sharePrice, setSharePrice] = useState('')
  const [partialValue, setPartialValue] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const s = Number(shares.replace(/[^\d.]/g, ''))
    const p = Number(sharePrice.replace(/[^\d.]/g, ''))
    const totalImovel = venture.fundingAmount

    if (totalImovel <= 0 || s <= 0 || p <= 0) {
      setPartialValue(0)
      setSliderValue(0)
      return
    }

    const partial = s * p
    setPartialValue(partial)

    let fraction = partial / totalImovel
    if (fraction < 0) fraction = 0
    if (fraction > 1) fraction = 1

    setSliderValue(fraction * 100)
  }, [shares, sharePrice, venture.fundingAmount])

  function handleSharePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d.]/g, '')
    setSharePrice(raw)
  }

  const sharePriceFormatted = sharePrice
    ? formatCurrency(Number(sharePrice.replace(/[^\d.]/g, '')))
    : ''

  const canConfigure = partialValue === venture.fundingAmount

  async function handleConfigureFractionalSale() {
    try {
      const totalQuotas = Number(shares.replace(/[^\d.]/g, ''))
      const quotaPrice = Number(sharePrice.replace(/[^\d.]/g, ''))
      const response = await api.post(
        `/admin/enterprise/${venture.id}/fraction`,
        {
          totalQuotas,
          quotaPrice,
        },
      )

      const updatedList = await fetchEnterprises()

      const updatedEnterprise = updatedList?.find(
        (e: any) => e.id === venture.id,
      )
      if (updatedEnterprise) {
        setCurrentEnterprise(updatedEnterprise)
      }

      setMessage(
        `Cotas configuradas com sucesso: ${JSON.stringify(response.data)}`,
      )
    } catch (error: any) {
      console.error(error)
      setMessage(
        `Erro ao configurar cotas: ${error.response?.data?.error || error.message}`,
      )
    }
  }

  return (
    <section className="bg-primary flex justify-between items-center">
      <div className="bg-primary rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <p className="text-sm font-normal text-[#696969]">Valor do Funding</p>
          <p className="text-2xl font-bold">
            {formatCurrency(venture.fundingAmount)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-normal text-[#696969]">
            Valor Transferido
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(venture.transferAmount)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-normal text-[#696969]">
            Tipo de Comercialização
          </p>
          <p className="text-2xl font-bold">{venture.commercializationType}</p>
        </div>
      </div>
      <section className="bg-primary p-6 m-4 flex flex-col justify-end rounded-xl shadow-md border border-border w-[27%] min-w-[270px]">
        <h2 className="text-md font-bold mb-4 text-textPrimary">
          Tipo de comercialização
        </h2>
        <div className="mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setOrderType('market')}
              className={`px-4 py-1 rounded ${
                orderType === 'market'
                  ? 'bg-yellow-400 text-input'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Tokenizar
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={`px-4 py-1 rounded ${
                orderType === 'limit'
                  ? 'bg-yellow-400 text-input'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Cotas
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          {/* Número de Cotas */}
          <div>
            <label className="block text-sm font-normal text-[#696969] mb-1">
              Número de Cotas
            </label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="Ex: 10"
              className="mt-1 block w-full h-10 rounded-md border border-border bg-input p-2 shadow-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Valor da Cota (com formatação em dólar) */}
          <div>
            <label className="block text-sm font-normal text-[#696969] mb-1">
              Valor da Cota
            </label>
            <input
              type="text"
              value={sharePriceFormatted}
              onChange={handleSharePriceChange}
              placeholder="$1000"
              className="mt-1 block w-full h-10 rounded-md border border-border bg-input p-2 shadow-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Valor total ($) somente leitura */}
          <div>
            <label className="block text-sm font-normal text-[#696969] mb-1">
              Valor total ($)
            </label>
            <input
              type="text"
              readOnly
              value={formatCurrency(partialValue)}
              className="mt-1 block w-full h-10 rounded-md border border-border bg-input p-2 shadow-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Slider: mostra quantos % do fundingAmount isso representa */}
          <div>
            <label className="block text-sm font-normal text-[#696969] mb-1">
              Ajuste de cotas
            </label>
            <div className="px-2 py-2">
              <Slider
                min={0}
                max={100}
                step={1}
                value={sliderValue}
                handleRender={handleRender}
                marks={{
                  0: '0%',
                  25: '',
                  50: '',
                  75: '',
                  100: '100%',
                }}
                dots
                dotStyle={(dotValue) => {
                  if ([0, 25, 50, 75, 100].includes(dotValue)) {
                    return {
                      borderColor: '#3a3a3a',
                      backgroundColor: '#3a3a3a',
                      width: 10,
                      height: 10,
                      marginLeft: 0,
                      marginTop: -5,
                    }
                  }
                  return { display: 'none' }
                }}
                activeDotStyle={(dotValue) => {
                  if ([0, 25, 50, 75, 100].includes(dotValue)) {
                    return {
                      borderColor: '#fff',
                      backgroundColor: '#000',
                    }
                  }
                  return { display: 'none' }
                }}
                styles={{
                  rail: {
                    backgroundColor: '#3a3a3a',
                    height: 2,
                  },
                  track: {
                    backgroundColor: '#F9A602',
                    height: 2,
                  },
                  handle: {
                    height: 24,
                    width: 24,
                    marginLeft: 0,
                    marginTop: -11,
                    borderColor: '#F9A602',
                    backgroundColor: '#222',
                    boxShadow: 'none',
                  },
                }}
              />
            </div>
          </div>
        </div>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          onClick={handleConfigureFractionalSale}
          disabled={!canConfigure}
        >
          Configurar Cotas
        </button>

        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      </section>
    </section>
  )
}
