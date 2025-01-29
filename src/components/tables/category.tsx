import { useState } from 'react'
import DeleteModal from '../modals/delete'
import api from '@/lib/api'
import { useLayoutAdminContext } from '@/context/layout-admin-context'

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

interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { texts } = useLayoutAdminContext()
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'category' | 'faq'
    id: number
  } | null>(null)

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      if (itemToDelete.type === 'category') {
        await api.delete(`/admin/faq/category/${itemToDelete.id}`)
      } else if (itemToDelete.type === 'faq') {
        await api.delete(`/admin/faq/${itemToDelete.id}`)
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
    } finally {
      closeModalDelete()
    }
  }

  const closeModalDelete = () => {
    setItemToDelete(null)
    setIsModalDeleteOpen(false)
  }

  const openDeleteModal = (type: 'category' | 'faq', id: number) => {
    setItemToDelete({ type, id })
    setIsModalDeleteOpen(true)
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-zinc-300 p-2 border-b border-zinc-400"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-medium bg-zinc-700">{category.name}</h2>
            <div className="flex space-x-2">
              {expandedCategory === category.id && (
                <button
                  onClick={() => openDeleteModal('category', category.id)}
                  className="bg-red-600 px-4 rounded-md text-sm"
                >
                  {texts.delete} Categoria
                </button>
              )}
              <button
                onClick={() => toggleCategory(category.id)}
                className="text-primary"
              >
                {expandedCategory === category.id ? '-' : '+'}
              </button>
            </div>
          </div>
          {expandedCategory === category.id && (
            <div className="mt-2 space-y-2">
              {category.faqs.map((faq) => (
                <div key={faq.id} className="p-3 bg-zinc-800 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="bg-zinc-700">{faq.question}</h3>
                    <button
                      onClick={() => openDeleteModal('faq', faq.id)}
                      className="bg-red-600 px-4 rounded-md text-sm"
                    >
                      {texts.delete} FAQ
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {isModalDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded-lg w-3/4">
            <DeleteModal
              onClose={closeModalDelete}
              isOpen={isModalDeleteOpen}
              handleSubmit={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
