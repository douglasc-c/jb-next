'use client'

import { useEffect, useState } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import AddContractModal from '@/components/modals/add-contract'
import Image from 'next/image'

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
  const [pdfUrl] = useState<string | null>(null)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)

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

  const openContract = async (templateType: string) => {
    try {
      const response = await api.get(`/users/contracts/view/${templateType}`)

      if (response.status === 200 && response.data.pdfUrl) {
        window.open(response.data.pdfUrl, '_blank', 'noopener,noreferrer')
        // setPdfUrl(response.data.pdfUrl)
        // setIsPdfModalOpen(true)
      } else {
        setError(response.data.message || 'Erro ao abrir o contrato')
      }
    } catch (err) {
      setError('Erro na comunicação com a API')
    } finally {
      setLoadingButton(false)
    }
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
        closeModal()
        await fetchContractPending()
        setLoadingButton(false)
      } else {
        setError(response.data.message || 'Erro ao adicionar contrato')
        setLoadingButton(false)
      }
    } catch (err) {
      setError('Erro na comunicação com a API')
      setLoadingButton(false)
    }
  }

  const fetchContractPending = async () => {
    try {
      const response = await api.get('/admin/contract/pending')
      console.log(response)
    } catch (err) {
      console.error('Erro ao buscar categorias de FAQ:', err)
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
      <div className="grid grid-cols-4 items-center gap-4 w-full">
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
        {types.length > 0 ? (
          <div></div>
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

      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full h-[80vh]">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsPdfModalOpen(false)}
            >
              Fechar
            </button>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                frameBorder="0"
              ></iframe>
            ) : (
              <Loading loading={loading} width={300} />
            )}
          </div>
        </div>
      )}
    </main>
  )
}
