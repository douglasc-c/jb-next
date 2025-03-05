'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import AddVentureModal from '@/components/modals/add-venture'
import Search from '@/components/searchs/search'
import { VenturesTable } from '@/components/tables/ventures'
import { useEnterpriseContext } from '@/context/enterprise-context'
import api from '@/lib/api'

interface FormData {
  name: string
  description: string
  corporateName: string
  investmentType: 'PROPERTY' | 'OTHER'
  address: string
  isAvailable: boolean
  constructionType: 'HOUSE' | 'APARTMENT' | 'OTHER'
  fundingAmount: number
  transferAmount: number | null
  postalCode: string
  state: string
  city: string
  squareMeterValue: number
  area: number
  floors: number
  completionDate: string
  startDate: string
  images: File[]
  commercializationType: 'TOKENIZATION' | 'FRACTIONAL'
}

interface Totals {
  total: number
  inProgress: number
  available: number
}

export default function VenturesPage() {
  const t = useTranslations('TextLang')
  
  // Pega os dados do contexto
  const { enterprises, fetchEnterprises } = useEnterpriseContext()

  // Estados locais
  const [pageLoading, setPageLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estado para o filtro local
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredVentures, setFilteredVentures] = useState(enterprises)

  const [totals, setTotals] = useState<Totals>({
    total: 0,
    inProgress: 0,
    available: 0,
  })

  // Formulário para novo empreendimento
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    corporateName: '',
    investmentType: 'PROPERTY',
    address: '',
    isAvailable: true,
    constructionType: 'HOUSE',
    fundingAmount: 0,
    transferAmount: null,
    postalCode: '',
    state: '',
    city: '',
    squareMeterValue: 0,
    area: 0,
    floors: 0,
    completionDate: '',
    startDate: '',
    images: [],
    commercializationType: 'TOKENIZATION',
  })

  // Chama fetchEnterprises sempre que a página monta
  useEffect(() => {
    async function loadEnterprises() {
      try {
        setPageLoading(true)
        await fetchEnterprises()
      } catch (err) {
        console.error('Erro ao carregar ventures:', err)
      } finally {
        setPageLoading(false)
      }
    }
    loadEnterprises()
  }, [fetchEnterprises])

  // Atualiza o estado do filtro sempre que enterprises mudar
  useEffect(() => {
    setFilteredVentures(enterprises)
  }, [enterprises])

  const handleChange = (
    field: string,
    value: string | number | File[] | null,
  ) => {
    setFormData((prev) => {
      if (field === 'images' && Array.isArray(value)) {
        return { ...prev, images: value }
      }
      if (field === 'transferAmount') {
        return {
          ...prev,
          transferAmount:
            value === '' || value === null ? null : parseFloat(value as string),
        }
      }
      if (['fundingAmount', 'squareMeterValue', 'area', 'floors'].includes(field)) {
        return {
          ...prev,
          [field]: value ? parseFloat(value as string) : 0,
        }
      }
      if (field === 'isAvailable') {
        return { ...prev, isAvailable: value === 'true' }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingButton(true)
    setError(null)

    try {
      const response = await api.post('/admin/create-enterprise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 201) {
        // Atualiza o contexto após criar
        await fetchEnterprises()
        // Limpa o formulário
        setFormData({
          name: '',
          description: '',
          corporateName: '',
          investmentType: 'PROPERTY',
          address: '',
          isAvailable: true,
          constructionType: 'HOUSE',
          fundingAmount: 0,
          transferAmount: null,
          postalCode: '',
          state: '',
          city: '',
          squareMeterValue: 0,
          area: 0,
          floors: 0,
          completionDate: '',
          startDate: '',
          images: [],
          commercializationType: 'TOKENIZATION',
        })
      } else {
        setError(response.data.message || 'Erro ao adicionar empreendimento')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message || 'Erro ao adicionar.')
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setLoadingButton(false)
      closeModal()
    }
  }

  // Filtra os empreendimentos conforme a busca
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const lowerQuery = query.toLowerCase()
    const results = enterprises.filter((venture) =>
      [
        venture.name,
        venture.description,
        venture.corporateName,
        venture.investmentType,
        venture.address,
        venture.constructionType,
        venture.city,
      ].some((field) => field.toLowerCase().includes(lowerQuery)),
    )
    setFilteredVentures(results)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading width={300} />
      </div>
    )
  }

  return (
    <main className="bg-gray border h-[calc(80vh)] overflow-y-auto border-border flex flex-col p-10 rounded-lg space-y-4">

      <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-4 w-full">
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/totalVentures.svg"
            width={25}
            height={25}
            alt="Projects"
          />
          <p>
            {t('total')}: {totals.total}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/sale.svg"
            width={25}
            height={25}
            alt="Available"
          />
          <p>
            {t('available')}: {totals.available}
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-zinc-300 rounded-md p-1 px-4 flex space-x-2 items-center text-sm">
          <Image
            src="/images/svg/clock.svg"
            width={25}
            height={25}
            alt="In Progress"
          />
          <p>
            {t('inProgress')}: {totals.inProgress}
          </p>
        </div>
        <div className="col-span-2">
          <Search
            placeholder="Buscar empreendimento..."
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-center items-center">
          <ButtonGlobal
            type="button"
            params={{
              title: t('addVenture'),
              color: 'bg-primary',
            }}
            onClick={openModal}
          />
        </div>
      </div>

      <section className="flex flex-col w-full rounded-xl bg-zinc-300 space-y-4">
        <VenturesTable data={filteredVentures} />
      </section>

      {isModalOpen && (
        <AddVentureModal
          isOpen={isModalOpen}
          formData={formData}
          error={error}
          loading={loadingButton}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </main>
  )
}
