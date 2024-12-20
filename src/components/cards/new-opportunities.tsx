'use client'

import { useLayoutContext } from '@/context/layout-context'
import { OpportunitiesPreview } from './opportunities-preview'
import { SmallOpportunitiesPreview } from './small-opportunities-preview'
import { DetailContract } from '../modals/detail-contract'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RowData {
  status: string
  company: string
  name: string
  document: string
  initialDate: string
  address: string
  typeOfConstruction: string
  contributionAmount: string
  amountPassed: string
  postalCode: string
  city: string
  valueM2: string
  footage: string
  floors: string
  data: string
  provisionalCompletion: string
  progressStatus: string
  constructionStatus: number
  stage: number
}

const data: RowData[] = [
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

export function NewOpportunities() {
  const { textNewOpportunities } = useLayoutContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<RowData | null>(null)
  const router = useRouter()

  const openModal = (row: RowData) => {
    setSelectedContract(row)
    setIsModalOpen(true)
  }

  const handleClick = () => {
    router.push(`/constructioncircuit`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContract(null)
  }

  return (
    <section className="flex p-4 bg-zinc-700 rounded-xl h-auto justify-around w-full space-x-12">
      <div className="flex flex-col w-2/3 space-y-3">
        <h3 className="uppercase font-medium">
          {textNewOpportunities.newOpportunitiesPortifolio}
        </h3>
        <div className="relative flex flex-row-reverse">
          <button
            onClick={handleClick}
            className="absolute bg-zinc-600 rounded-full p-2 h-10 w-10 flex items-center justify-center -mt-3 -mr-3"
          >
            <Image
              src="/images/svg/arrowRightGreen.svg"
              alt="arrow icon"
              height={14}
              width={14}
            />
          </button>

          <OpportunitiesPreview data={data[0]} onClick={openModal} />
        </div>
      </div>

      <div className="w-1/3 flex flex-col justify-between">
        <SmallOpportunitiesPreview data={data[1]} onClick={openModal} />
        <SmallOpportunitiesPreview data={data[2]} onClick={openModal} />
      </div>

      {isModalOpen && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 shadow-lg w-full md:w-2/3">
            <DetailContract onClick={closeModal} data={selectedContract} />
          </div>
        </div>
      )}
    </section>
  )
}
