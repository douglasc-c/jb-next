'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Lab {
  name: string
  description: string
}

interface Category {
  title: string
  items: string[]
}

export default function Clients() {
  const t = useTranslations('TextLang')

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-20 pt-36 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carrossel-5.jpeg"
            alt="Laboratório Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('clients.hero.title')}
            </h1>
            <p className="text-xl">{t('clients.hero.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Laboratórios Estatais Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('clients.labs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('clients.labs.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.raw('clients.labs.list').map((lab: Lab, index: number) => (
              <motion.div
                key={lab.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-900">
                  {lab.name}
                </h3>
                <p className="text-gray-600 text-justify">{lab.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Repartições Públicas Section */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('clients.public.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('clients.public.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              t.raw('clients.public.categories.federal'),
              t.raw('clients.public.categories.state'),
              t.raw('clients.public.categories.municipal'),
            ].map((category: Category, index: number) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item: string, idx: number) => (
                    <li key={idx} className="text-gray-600 flex items-center">
                      <span className="text-blue-900 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('clients.commitment.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('clients.commitment.description')}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              {t('clients.cta.title')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
