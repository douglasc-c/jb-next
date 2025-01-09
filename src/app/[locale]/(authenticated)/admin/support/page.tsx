'use client'

import { useEffect, useState } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import AddFaqModal from '@/components/modals/add-faq'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'

interface FormData {
  question: string
  answer: string
  categoryId: number
}

export default function Support() {
  const { texts } = useLayoutAdminContext()

  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    question: '',
    answer: '',
    categoryId: 0,
  })
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  )
  const [error, setError] = useState<string | null>(null)

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ question: '', answer: '', categoryId: 0 })
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value,
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await api.post('/admin/faq/create', formData)
      if (response.status === 201) {
        closeModal()
      } else {
        setError(response.data.message || 'Erro ao adicionar FAQ')
      }
    } catch (err) {
      setError('Erro na comunicação com a API')
    }
  }

  const createCategory = async (name: string) => {
    try {
      const response = await api.post('/admin/faq/create-category', { name })
      if (response.status === 201) {
        const newCategory = response.data.faqCategory

        if (newCategory && newCategory.id) {
          setCategories((prev) => [...prev, newCategory])
          setFormData((prev) => ({ ...prev, categoryId: newCategory.id }))
        } else {
          setError(
            'Categoria criada, mas os dados retornados estão incompletos.',
          )
        }
      } else {
        setError(response.data.message || 'Erro ao criar categoria')
      }
    } catch (err) {
      setError('Erro na comunicação com a API')
    }
  }

  useEffect(() => {
    const fetchFaqCategories = async () => {
      try {
        const response = await api.get('/admin/faq/categories')
        setCategories(response.data.categories || [])
      } catch (err) {
        console.error('Erro ao buscar categorias de FAQ:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 pr-36 space-y-4">
      <div className="text-white grid grid-cols-4 items-center gap-4 w-full">
        <div className="col-span-1 flex justify-center items-center">
          <ButtonGlobal
            type="button"
            params={{
              title: texts.addFaq,
              color: 'bg-primary',
            }}
            onClick={openModal}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddFaqModal
          isOpen={isModalOpen}
          formData={formData}
          categories={categories}
          loading={loading}
          error={error}
          handleChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          closeModal={closeModal}
          createCategory={createCategory}
        />
      )}
    </main>
  )
}
