import { useState } from 'react'

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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-zinc-700 p-2 border-b border-zinc-400"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className="font-medium text-white">{category.name}</h2>
            <button className="text-primary">
              {expandedCategory === category.id ? '-' : '+'}
            </button>
          </div>
          {expandedCategory === category.id && (
            <div className="mt-2 space-y-2">
              {category.faqs.map((faq) => (
                <div key={faq.id} className="p-3 bg-zinc-800 rounded-lg">
                  <h3 className="text-white">{faq.question}</h3>
                  <p className="text-sm text-gray-400 mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
