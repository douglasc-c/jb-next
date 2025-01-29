'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  topic: string
  faqs: FAQItem[]
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ topic, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full">
      <h2 className="text-sm font-medium text-zinc-300 mb-4">{topic}</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          <button
            onClick={() => toggleAnswer(index)}
            className={`flex justify-between items-center w-full px-5 bg-zinc-300 text-left text-zinc-300 transition-all text-sm ${
              openIndex === index ? 'rounded-t-lg' : 'rounded-lg'
            }`}
          >
            <span>{`${index + 1}. ${faq.question}`}</span>
            <span>
              {openIndex === index ? (
                <Image
                  className="py-4"
                  src="/images/svg/arrowUpGreen.svg"
                  alt="WiseBot Logo"
                  height={16}
                  width={16}
                />
              ) : (
                <Image
                  className="py-4"
                  src="/images/svg/arrowDownGreen.svg"
                  alt="WiseBot Logo"
                  height={16}
                  width={16}
                />
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className="p-4 bg-zinc-300 text-zinc-300 rounded-b-lg font-light text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}

export default FAQAccordion
