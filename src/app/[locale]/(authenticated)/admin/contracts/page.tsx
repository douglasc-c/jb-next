'use client'

import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import AddContractModal from '@/components/modals/add-contract'
import ContractsList from '@/components/tables/contracts'
import { useLayoutAdminContext } from '@/context/admin-context'
import api from '@/lib/api'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Signature {
  signedAt: string
  user: {
    email: string
    firstName: string
    lastName: string
    userName: string
  }
}
interface Contract {
  adminSigningUrl: string
  clientSigningUrl: string
  id: string
  signatures: Signature[]
}
interface Enterprise {
  contracts: Contract[]
  name: string
  id: number
}

interface Type {
  id: number
  name: string
  templateType: string
}

interface FormData {
  file: File[] | null
  templateType: string
}

export default function Contract() {
  const { texts } = useLayoutAdminContext()
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contracts, setContracts] = useState<Enterprise[]>([])

  const [types] = useState<Type[]>([
    { name: `${texts.model} 1`, templateType: 'TYPE1', id: 0 },
    { name: `${texts.model} 2`, templateType: 'TYPE2', id: 1 },
    { name: `${texts.model} 3`, templateType: 'TYPE3', id: 2 },
  ])
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    file: null,
    templateType: '',
  })

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ file: null, templateType: '' })
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = Array.from(e.target.files || [])
      setFormData((prev) => ({
        ...prev,
        file: [...(prev.file || []), ...files],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const openContract = async (templateType: string) => {
    try {
      const response = await api.get(`/users/contracts/view/${templateType}`)

      if (response.status === 200 && response.data.pdfUrl) {
        window.open(response.data.pdfUrl, '_blank', 'noopener,noreferrer')
      } else {
        setError(response.data.message || 'Erro ao abrir o contrato')
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
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setLoadingButton(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    setLoadingButton(true)
    e.preventDefault()
    setError(null)

    if (!formData.templateType) {
      setError('Por favor, selecione um tipo de template.')
      setLoadingButton(false)
      return
    }

    if (!formData.file || formData.file.length === 0) {
      setError('Por favor, selecione um arquivo.')
      setLoadingButton(false)
      return
    }

    const data = new FormData()
    data.append('templateType', formData.templateType)
    formData.file.forEach((file) => {
      data.append('file', file)
    })

    try {
      const response = await api.post('/admin/upload/contract/template', data)

      if (response.status === 200) {
        await fetchContractPending()
      } else {
        setError(response.data.message || 'Erro ao adicionar contrato')
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
          setError(error.response?.data.message)
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

  const fetchContractPending = async () => {
    try {
      const response = await api.get('/admin/contract/pending')
      setContracts(response.data.enterprises)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContractPending()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <div className="grid md:grid-cols-2 items-center gap-4 w-full">
        <div className="grid grid-cols-3 items-center gap-4 w-full">
          <ButtonGlobal
            type="button"
            params={{
              title: `${texts.model} 1`,
              color: 'bg-primary',
            }}
            onClick={() => openContract('TYPE1')}
          />
          <ButtonGlobal
            type="button"
            params={{
              title: `${texts.model} 2`,
              color: 'bg-primary',
            }}
            onClick={() => openContract('TYPE2')}
          />
          <ButtonGlobal
            type="button"
            params={{
              title: `${texts.model} 3`,
              color: 'bg-primary',
            }}
            onClick={() => openContract('TYPE3')}
          />
        </div>
        <ButtonGlobal
          type="button"
          params={{
            title: texts.addContract,
            color: 'bg-primary',
          }}
          onClick={openModal}
        />
      </div>

      <section className="flex flex-col w-full rounded-xl bg-zinc-300 space-y-4 p-4">
        {contracts.length > 0 ? (
          <div>
            <ContractsList companies={contracts} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <Image
              src="/images/svg/warning-grey.svg"
              width={100}
              height={100}
              alt="warning"
            />
            <p className="text-zinc-100 text-lg font-medium">
              {texts.noInterestedPartiesFound}
            </p>
            <p className="text-zinc-400 text-sm">
              {texts.thereAreStillNoInterestedPartiesForTheRegisteredProjects}
            </p>
          </div>
        )}
      </section>

      {isModalOpen && (
        <AddContractModal
          isOpen={isModalOpen}
          formData={formData}
          types={types}
          loading={loadingButton}
          error={error}
          handleChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          closeModal={closeModal}
        />
      )}
    </main>
  )
}
