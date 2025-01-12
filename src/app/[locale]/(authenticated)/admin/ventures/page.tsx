'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import AddVentureModal from '@/components/modals/add-venture'
import { VenturesTable } from '@/components/tables/ventures'
import { Loading } from '@/components/loading/loading'
import Search from '@/components/searchs/search'

interface CurrentPhase {
  id: number
  phaseName: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

interface CurrentTask {
  id: number
  taskName: string
  description: string
  phaseId: number
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
}

interface Image {
  imageUrl: string
}

interface Venture {
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
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface FormData {
  name: string
  description: string
  corporateName: string
  investmentType: 'PROPERTY' | 'OTHER'
  address: string
  isAvailable: boolean
  constructionType: 'HOUSE' | 'APARTMENT' | 'OTHER'
  fundingAmount: number
  transferAmount: number
  postalCode: string
  city: string
  squareMeterValue: number
  area: number
  floors: number
  completionDate: string
  images: File[]
}

export default function Ventures() {
  const { texts } = useLayoutAdminContext()
  const [ventures, setVentures] = useState<Venture[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredVentures, setFilteredVentures] = useState<Venture[]>(ventures)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    corporateName: '',
    investmentType: 'PROPERTY',
    address: '',
    isAvailable: true,
    constructionType: 'HOUSE',
    fundingAmount: 0,
    transferAmount: 0,
    postalCode: '',
    city: '',
    squareMeterValue: 0,
    area: 0,
    floors: 0,
    completionDate: '',
    images: [],
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        images: Array.from(files).slice(0, 5),
      }))
    } else if (
      [
        'fundingAmount',
        'transferAmount',
        'squareMeterValue',
        'area',
        'floors',
      ].includes(name)
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value ? parseFloat(value) : 0,
      }))
    } else if (name === 'isAvailable') {
      setFormData((prevState) => ({
        ...prevState,
        isAvailable: value === 'true',
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingButton(true)
    e.preventDefault()

    try {
      const response = await api.post('/admin/create-enterprise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 201) {
        const venture = response.data.enterprise.enterprise

        setVentures((prevVentures) => [...prevVentures, venture])
        setFilteredVentures((prevFilteredVentures) => [
          ...prevFilteredVentures,
          venture,
        ])
        closeModal()
        setLoadingButton(false)
        setFormData({
          name: '',
          description: '',
          corporateName: '',
          investmentType: 'PROPERTY',
          address: '',
          isAvailable: true,
          constructionType: 'HOUSE',
          fundingAmount: 0,
          transferAmount: 0,
          postalCode: '',
          city: '',
          squareMeterValue: 0,
          area: 0,
          floors: 0,
          completionDate: '',
          images: [],
        })
      } else {
        setError(response.data.message || 'Erro ao adicionar empreendimento')
        setLoadingButton(false)
      }
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setLoadingButton(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = ventures.filter(
      (venture) =>
        venture.name.toLowerCase().includes(query.toLowerCase()) ||
        venture.description.toLowerCase().includes(query.toLowerCase()) ||
        venture.corporateName.toLowerCase().includes(query.toLowerCase()) ||
        venture.investmentType.toLowerCase().includes(query.toLowerCase()) ||
        venture.address.toLowerCase().includes(query.toLowerCase()) ||
        venture.constructionType.toLowerCase().includes(query.toLowerCase()) ||
        venture.city.toLowerCase().includes(query.toLowerCase()),
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

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const response = await api.get('/admin/get-enterprise')
        const fetchedVentures: Venture[] = response.data.enterprises

        // const computedTotals = fetchedVentures.reduce<Totals>(
        //   (acc, venture) => {
        //     acc.total += 1
        //     if (venture.isAvailable) acc.available += 1

        //     const approvedContracts = venture.contractInterests.filter(
        //       (interest) => interest.status === 'APPROVED',
        //     ).length

        //     acc.inProgress += approvedContracts > 0 ? 1 : 0
        //     return acc
        //   },
        //   { total: 0, available: 0, inProgress: 0 },
        // )

        setVentures(
          fetchedVentures.map((venture) => ({
            ...venture,
            progress: venture.contractInterests.filter(
              (interest) => interest.status === 'APPROVED',
            ).length,
          })),
        )
        setFilteredVentures(fetchedVentures)
        // setTotals(computedTotals)
      } catch (err) {
        console.error('Erro ao buscar empreendimentos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVentures()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <div className="text-white grid grid-cols-4 items-center gap-4 w-full">
        {/* <div className="col-span-1 bg-zinc-700 rounded-md p-2 px-4 flex space-x-2 items-center">
          <Image
            src="/images/svg/totalVentures.svg"
            width={25}
            height={25}
            alt="Projects"
          />
          <p>
            {texts.total}: {totals.total}
          </p>
        </div>
        <div className="col-span-1 bg-zinc-700 rounded-md p-2 px-4 flex space-x-2 items-center">
          <Image
            src="/images/svg/sale.svg"
            width={25}
            height={25}
            alt="Available"
          />
          <p>
            {texts.available}: {totals.available}
          </p>
        </div>
        <div className="col-span-1 bg-zinc-700 rounded-md p-2 px-4 flex space-x-2 items-center">
          <Image
            src="/images/svg/clock.svg"
            width={25}
            height={25}
            alt="In Progress"
          />
          <p>
            {texts.inProgress}: {totals.inProgress}
          </p>
        </div> */}
        <div className="col-span-3">
          <Search
            placeholder="Search users..."
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <ButtonGlobal
            type="button"
            params={{
              title: texts.addVenture,
              color: 'bg-primary',
            }}
            onClick={openModal}
          />
        </div>
      </div>
      <section className="flex flex-col w-full rounded-xl bg-zinc-700 space-y-4 p-4">
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
