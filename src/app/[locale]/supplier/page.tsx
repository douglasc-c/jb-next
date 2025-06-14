'use client'

import { NavbarHome } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Supplier() {
  const t = useTranslations('TextLang.supplier')

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-20 pt-36 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carrossel-2.jpeg"
            alt="Services Background"
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
              {t('title')}
            </h1>
            <p className="text-xl text-white/90">{t('description')}</p>
          </motion.div>
        </div>
      </section>

      {/* SICAF Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('sicaf.title')}
            </h2>
            <h2 className="text-1xl md:text-2xl font-bold mb-6 text-gray-900">
              {t('sicaf.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
              {t('sicaf.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:pl-14">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/png/sicaf.png"
                alt="SICAF Illustration"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                'health',
                'education',
                'science',
                'defense',
                'sports',
                'tourism',
              ].map((ministry, index) => (
                <motion.div
                  key={ministry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-2 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-blue-900">
                    {t(`sicaf.ministries.${ministry}`)}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registrations Section */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('registrations.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('registrations.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['crea', 'cfc', 'core'].map((registration, index) => (
              <motion.div
                key={registration}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                  {t(`registrations.${registration}.title`)}
                </h3>
                <p className="text-gray-600 text-justify">
                  {t(`registrations.${registration}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* National Presence Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:pl-14">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t('national.title')}
              </h2>
              <p className="text-xl text-gray-600 md:text-justify">
                {t('national.description')}
              </p>
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-96 h-96"
              >
                <Image
                  src="/images/png/actuation.png"
                  alt="SICAF Illustration"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['technical', 'legal', 'financial', 'commercial'].map(
              (qualification, index) => (
                <motion.div
                  key={qualification}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white shadow-lg p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">
                    {t(`team.${qualification}.title`)}
                  </h3>
                  <p className="text-gray-600 text-justify">
                    {t(`team.${qualification}.description`)}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('commitment.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('commitment.description')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('cta.description')}
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Entre em Contato
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
