'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Footer } from '@/components/footer'
import { NavbarHome } from '@/components/navbar'

const MotionDiv = motion.div

export default function ProductsPage() {
  const t = useTranslations('TextLang.products')

  const products = [
    {
      id: 1,
      name: 'plasticBags',
      description: 'plasticBags.description',
      image: '/images/jpg/ziplock.jpeg',
      features: ['selfWashable', 'sealable', 'zipLock', 'pharmaGrade'],
    },
    {
      id: 2,
      name: 'ultraFreezers',
      description: 'ultraFreezers.description',
      image: '/images/jpg/congeladores.jpeg',
      features: [
        'temperatureControl',
        'vaccineStorage',
        'scientificGrade',
        'certified',
      ],
    },
    {
      id: 3,
      name: 'cartonage',
      description: 'cartonage.description',
      image: '/images/jpg/cartonagem.jpeg',
      features: [
        'customDesign',
        'highResistance',
        'regulatoryCompliant',
        'pharmaGrade',
      ],
    },
    {
      id: 4,
      name: 'leaflets',
      description: 'leaflets.description',
      image: '/images/png/bulas.png',
      features: ['highQuality', 'anvisaCompliant', 'clearInfo', 'customizable'],
    },
    {
      id: 5,
      name: 'labEquipment',
      description: 'labEquipment.description',
      image: '/images/jpg/equipments.jpeg',
      features: ['microbiology', 'chemistry', 'physics', 'validated'],
    },
    {
      id: 6,
      name: 'thermalBoxes',
      description: 'thermalBoxes.description',
      image: '/images/png/thermal.png',
      features: [
        'vaccineTransport',
        'temperatureControl',
        'biosafety',
        'longDuration',
      ],
    },
    {
      id: 7,
      name: 'orthopedicEquipment',
      description: 'orthopedicEquipment.description',
      image: '/images/png/orthopedic.png',
      features: ['mobility', 'rehabilitation', 'fitness', 'ergonomic'],
    },
    {
      id: 8,
      name: 'specialLabels',
      description: 'specialLabels.description',
      image: '/images/jpg/labels.jpeg',
      features: [
        'highDefinition',
        'resistant',
        'customizable',
        'regulatoryCompliant',
      ],
    },
    {
      id: 9,
      name: 'software',
      description: 'software.description',
      image: '/images/jpg/software.jpeg',
      features: ['automation', 'management', 'scalable', 'innovative'],
    },
    {
      id: 10,
      name: 'stainlessFurniture',
      description: 'stainlessFurniture.description',
      image: '/images/jpg/armario.jpg',
      features: ['cleanRoom', 'corrosionResistant', 'hygienic', 'customizable'],
    },
  ]

  return (
    <div className="min-h-screen">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-32 pt-40 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/jpg/equipment2.jpeg"
            alt="Products Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-blue-900/90"></div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-xl md:text-5xl font-bold mb-8 text-left">
                  {t('title')}
                </h1>
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed">{t('subtitle')}</p>
                  <p className="text-lg leading-relaxed text-white/90">
                    {t('expertise')}
                  </p>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-950 mb-4">
                {t('multisector.title')}
              </h2>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-slate-50 rounded-xl p-8 shadow-lg"
            >
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                {t('multisector.description')}
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {t('expertiseItems.certifications')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {t('expertiseItems.globalPartnerships')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {t('expertiseItems.stateLabs')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {t('expertiseItems.startups')}
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-12">
          <div className="max-w-4xl mx-auto mb-12">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-blue-950 mb-4">
                {t('productsGrid.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('productsGrid.description')}
              </p>
            </MotionDiv>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <MotionDiv
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={product.image}
                      alt={t(`${product.name}.name`)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold mb-4">
                      {t(`${product.name}.name`)}
                    </h3>
                    <p className="text-gray-600 mb-6 text-justify">
                      {t(`${product.name}.description`)}
                    </p>
                    <ul className="space-y-3">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-title mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm">
                            {t(`features.${feature}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">{t('quality.title')}</h2>
            <p className="text-xl mb-8 text-gray-600">
              {t('quality.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  {t('quality.certifications')}
                </h3>
                <p className="text-gray-600">
                  {t('quality.certificationsDesc')}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  {t('quality.technical')}
                </h3>
                <p className="text-gray-600">{t('quality.technicalDesc')}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  {t('quality.support')}
                </h3>
                <p className="text-gray-600">{t('quality.supportDesc')}</p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-title">
        <div className="container mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90">{t('cta.description')}</p>
            <div className="flex flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open('/docs/apresentacao-1.pdf', '_blank')
                }
              >
                {t('cta.catalog')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open('/docs/apresentacao-2.pdf', '_blank')
                }
              >
                {t('cta.specs')}
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>
      <Footer />
    </div>
  )
}
