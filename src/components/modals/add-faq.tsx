import React, { useState } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { PulseLoader } from 'react-spinners'

interface FormData {
  question: string
  answer: string
  categoryId: number | null
}

interface Category {
  id: number
  name: string
}

interface AddFaqModalProps {
  isOpen: boolean
  formData: FormData
  categories: Category[]
  loading: boolean
  error: string | null
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  closeModal: () => void
  createCategory: (name: string) => Promise<void>
}

const AddFaqModal: React.FC<AddFaqModalProps> = ({
  isOpen,
  formData,
  categories,
  loading,
  error,
  handleChange,
  handleSubmit,
  closeModal,
  createCategory,
}) => {
  const { texts } = useLayoutAdminContext()
  const [newCategory, setNewCategory] = useState<string>('')
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false)

  if (!isOpen) return null

  const hasCategories = categories.length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-300 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-zinc-200 text-2xl mb-4">{texts.addFaq}</h2>

        <div className="mb-4">
          <label className="text-zinc-300 block mb-1">{texts.category}</label>
          {hasCategories ? (
            isCreatingCategory ? (
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder={texts.newCategory}
                  className="flex-grow p-2 rounded-lg bg-zinc-800 text-zinc-300"
                />
                <ButtonGlobal
                  type="button"
                  params={{
                    title: texts.create,
                    color: 'bg-primary',
                  }}
                  onClick={() => {
                    if (newCategory.trim()) {
                      createCategory(newCategory.trim())
                      setNewCategory('')
                      setIsCreatingCategory(false)
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-row space-y-2">
                <select
                  name="categoryId"
                  value={formData.categoryId || ''}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                  required
                >
                  <option value="">{texts.selectACategory}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCreatingCategory(true)}
                  className="text-sm text-primary underline"
                >
                  {texts.createNewCategory}
                </button>
              </div>
            )
          ) : (
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder={texts.newCategory}
                className="flex-grow p-2 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
              <ButtonGlobal
                type="button"
                params={{
                  title: texts.create,
                  color: 'bg-primary',
                }}
                onClick={() => {
                  if (newCategory.trim()) {
                    createCategory(newCategory.trim())
                    setNewCategory('')
                  }
                }}
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-300 block">{texts.question}</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
            </div>

            <div>
              <label className="text-zinc-300 block">{texts.answer}</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-zinc-300"
                required
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-zinc-600 text-zinc-300 py-2 px-4 rounded-lg"
              >
                {texts.cancel}
              </button>
              <ButtonGlobal
                type="submit"
                disabled={loading}
                params={{
                  title: loading ? (
                    <PulseLoader
                      color="#fff"
                      loading={loading}
                      size={6}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    texts.add
                  ),
                  color: 'bg-primary',
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFaqModal
