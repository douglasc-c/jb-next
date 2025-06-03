'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/header/navbar-home'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'

export default function Home() {
  const t = useTranslations('TextLang')

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 to-blue-900 text-white md:p-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carrossel-1.jpeg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-md md:text-1xl mb-8 max-w-3xl mx-auto"
          >
            {t('home.hero.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/services"
              className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('home.hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('home.differentials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['experience', 'quality', 'partnerships', 'expertise'].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    {t(`home.differentials.items.${item}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`home.differentials.items.${item}.description`)}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section className="py-20 bg-gradient-to-t from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-title">
            {t('services.title')}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('services.subtitle')}
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['equipment', 'packaging', 'technical'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-stone-100 p-6 rounded-lg shadow-md"
              >
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/png/${category}.jpeg`}
                    alt={t(`services.${category}.title`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                  {t(`services.${category}.title`)}
                </h3>
                <p className="text-stone-600 mb-6">
                  {t(`services.${category}.description`)}
                </p>
                <Link
                  href={`/services#${category}`}
                  className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                  Saiba mais →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parceiros Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-title">
            {t('partners.title')}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('partners.subtitle')}
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t('partners.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['freund', 'fabrima', 'acg', 'gerresheimer', 'controlar'].map(
              (partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    {t(`partners.list.${partner}.name`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`partners.list.${partner}.description`)}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('contact.form.title')}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
