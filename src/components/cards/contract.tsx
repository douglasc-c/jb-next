'use client'

import { useLayoutContext } from '@/context/layout-context'
import { useState } from 'react'
import { DetailContract } from '../modals/contract-datails'
import api from '@/lib/api'

interface Enterprise {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount: number
  postalCode: string
  address: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string | null
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
}

interface ContractProps {
  data: Enterprise
}

export function Contract({ data }: ContractProps) {
  const { textNewOpportunities } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (id: number) => {
    console.log(id)
    try {
      const response = await api.post('/users/interest-enterprise', {
        enterpriseId: id,
      })
      if (response.status === 200) {
        // const data = response.data
      } else {
        setError('Falha no login')

        console.error('Falha no login:', response.statusText)
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor')
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-white">Carregando...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-col p-4 bg-zinc-800 rounded-xl h-auto justify-around w-full">
      <section className="hidden md:block w-full h-64 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
      </section>
      <section className="flex flex-col text-xs space-y-3 pt-4">
        <div className="flex ">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.document}
            </p>
            <span className="font-light"> {data.id}</span>
          </div>
          <div className="w-full flex justify-end space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.startDate}
            </p>
            <span className="font-light">
              {new Date(data.completionDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textNewOpportunities.address}
            </p>
            <span className="font-light">{data.address}</span>
          </div>
          <div className="flex justify-end w-2/6 space-x-3">
            <button
              onClick={openModal}
              className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent w-full`}
            >
              {textNewOpportunities.seeMore}
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailContract
              onClick={closeModal}
              handleClick={handleSubmit}
              data={data}
            />
          </div>
        </div>
      )}
    </div>
  )
}
