'use client'

import FAQAccordion from '@/components/cards/faq-accordion'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useEffect } from 'react'

// interface Questys {}

// interface Category {}

export default function Support() {
  const { texts } = useLayoutContext()

  const data = [
    {
      topic: 'Introdução à Programação',
      questions: [
        {
          question: 'O que é programação?',
          answer:
            'Programação é o processo de escrever, testar, depurar e manter o código-fonte de programas de computador.',
        },
        {
          question: 'Quais são as principais linguagens de programação?',
          answer:
            'Algumas das principais linguagens são Python, JavaScript, Java, C++ e C#.',
        },
        {
          question: 'O que é um algoritmo?',
          answer:
            'Um algoritmo é uma sequência de passos para resolver um problema ou realizar uma tarefa.',
        },
      ],
    },
  ]

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const response = await api.get('/admin/faq/categories')
        // const fetchedFaq: Category[] = response.data.enterprises
        console.log(response)
        // setFilteredVentures(fetchedFaq)
      } catch (err) {
        console.error('Erro ao buscar faqs:', err)
      } finally {
        // setLoading(false)
      }
    }

    fetchVentures()
  }, [])

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium text-white">
          {texts.frequentlyAskedQuestions}
        </h1>
        <section className="flex flex-col w-full rounded-xl  p-4 bg-zinc-800 space-y-5 max-h-[calc(76vh)]">
          <section className="flex flex-col w-full space-y-5 overflow-auto">
            {data.map((section, idx) => (
              <FAQAccordion
                key={idx}
                topic={section.topic}
                faqs={section.questions}
              />
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
