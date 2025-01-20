'use client'

import FAQAccordion from '@/components/cards/faq-accordion'
import { Loading } from '@/components/loading/loading'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

export default function Support() {
  const { texts } = useLayoutContext()
  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState<Category[]>([])

  const fetchFaqCategories = async () => {
    setLoading(true)
    try {
      const response = await api.get('/admin/faq/categories')
      setCategories(response.data.categories || [])
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
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium text-white">
          {texts.frequentlyAskedQuestions}
        </h1>
        <section className="flex flex-col w-full rounded-xl  p-4 bg-zinc-800 space-y-5 max-h-[calc(76vh)]">
          <section className="flex flex-col w-full space-y-5 overflow-auto">
            {categories.map((category) => (
              <div key={category.id}>
                <FAQAccordion topic={category.name} faqs={category.faqs} />
              </div>
            ))}
          </section>
          <div className="flex flex-col text-zinc-400 items-center space-y-3">
            <h1 className="text-sm">{texts.stillHaveQuestions}</h1>
            <button className="flex items-center justify-center border border-primary rounded-full text-primary py-2 px-4 bg-transparent transition-colors duration-300">
              <Image
                className="mr-2"
                src="/images/svg/whatsapp.svg"
                alt="WiseBot Logo"
                height={16}
                width={16}
              />
              <span className="text-sm">{texts.talkToTheSupport}</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
