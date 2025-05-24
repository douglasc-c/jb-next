'use client'

import { NavbarHome } from '@/components/header/navbar-home'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
  const t = useTranslations('TextLang.home.services')

  return (
    <div className="min-h-screen bg-white">
      <NavbarHome />
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/service1.jpg"
                alt={t('service1.title')}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('service1.title')}</h3>
              <p className="text-gray-600 mb-6">{t('service1.description')}</p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/service2.jpg"
                alt={t('service2.title')}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('service2.title')}</h3>
              <p className="text-gray-600 mb-6">{t('service2.description')}</p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/service3.jpg"
                alt={t('service3.title')}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('service3.title')}</h3>
              <p className="text-gray-600 mb-6">{t('service3.description')}</p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">15+</h3>
              <p className="text-xl text-gray-600">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-xl text-gray-600">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Precisa de uma Solução Personalizada?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato conosco para discutir suas necessidades específicas
            e receber uma proposta personalizada.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Solicitar Proposta
          </Link>
        </div>
      </section>
    </div>
  )
}
