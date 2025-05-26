'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/header/navbar-home'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Equipment() {
  const t = useTranslations('TextLang')

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-20 pt-36 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carrossel-5.jpeg"
            alt="Equipment Background"
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
              {t('services.equipment.title')}
            </h1>
            <p className="text-xl">{t('services.equipment.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Equipamentos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['solids', 'packaging', 'cleanroom'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                  {t(`services.equipment.categories.${category}.title`)}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t(`services.equipment.categories.${category}.description`)}
                </p>
                <Link
                  href="/contact"
                  className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                  Solicitar orçamento →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Embalagens Section */}
      <section className="py-20  bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('services.packaging.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.packaging.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['plastic', 'blister', 'glass'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                  {t(`services.packaging.categories.${category}.title`)}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t(`services.packaging.categories.${category}.description`)}
                </p>
                <Link
                  href="/contact"
                  className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                  Solicitar orçamento →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Técnicos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('services.technical.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.technical.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['installation', 'maintenance', 'consulting'].map(
              (service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                    {t(`services.technical.services.${service}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t(`services.technical.services.${service}.description`)}
                  </p>
                  <Link
                    href="/contact"
                    className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Solicitar orçamento →
                  </Link>
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
