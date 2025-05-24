'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/header/navbar-home'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const t = useTranslations('TextLang.home.about')

  const values = t.raw('values.items') as Record<string, string>

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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-xl font-semibold text-blue-600">
                {t('stats.equipamentos')}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold text-blue-600">
                {t('stats.clientes')}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold text-blue-600">
                {t('stats.equipe')}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold text-blue-600">
                {t('stats.representadas')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('history.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                {t('history.description')}
              </p>
              <p className="text-lg text-gray-600">
                {t('history.description2')}
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/about-company.jpg"
                alt="Nossa História"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">{t('mission.title')}</h2>
              <p className="text-lg text-gray-600">
                {t('mission.description')}
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">{t('vision.title')}</h2>
              <p className="text-lg text-gray-600">{t('vision.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {Object.entries(values).map(([key, value]) => (
              <div key={key} className="text-center">
                <h3 className="text-xl font-semibold text-blue-600">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Que tal uma conversa com um de nossos especialistas?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato conosco para discutir suas necessidades específicas
            e receber uma proposta personalizada.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            FALE CONOSCO
          </Link>
        </div>
      </section>
    </div>
  )
}
