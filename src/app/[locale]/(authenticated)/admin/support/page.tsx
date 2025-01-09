'use client'

import { useEffect, useState } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import AddFaqModal from '@/components/modals/add-faq'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import Search from '@/components/searchs/search'
import CategoryList from '@/components/tables/category'

interface Faq {
  id: number
  question: string
  answer: string
}

interface Category {
  id: number
  name: string
  faqs: Faq[]
}

interface FormData {
  question: string
  answer: string
  categoryId: number
}

export default function Support() {
  const { texts } = useLayoutAdminContext()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredFaq, setFilteredFaq] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    question: '',
    answer: '',
    categoryId: 0,
  })

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ question: '', answer: '', categoryId: 0 })
    setError(null)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    const results = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query.toLowerCase()) || // Busca no nome da categoria
        category.faqs.some(
          (faq) =>
            faq.question.toLowerCase().includes(query.toLowerCase()) || // Busca nas perguntas
            faq.answer.toLowerCase().includes(query.toLowerCase()), // Busca nas respostas
        ),
    )

    setFilteredFaq(results)
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
        await fetchFaqCategories()
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

  const fetchFaqCategories = async () => {
    try {
      const response = await api.get('/admin/faq/categories')
      setCategories(response.data.categories || [])
      setFilteredFaq(response.data.categories || [])
    } catch (err) {
      console.error('Erro ao buscar categorias de FAQ:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <div className="text-white grid grid-cols-4 items-center gap-4 w-full">
        <div className="col-span-3">
          <Search
            placeholder="Search FAQs..."
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
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

      <section className="flex flex-col w-full rounded-xl bg-zinc-700 space-y-4 p-4">
        <CategoryList categories={filteredFaq} />
      </section>

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
