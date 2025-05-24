'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const MotionDiv = motion.div

export default function ProductsPage() {
  const t = useTranslations('TextLang.products')

  const products = [
    {
      id: 1,
      name: 'product1',
      description: 'product1.description',
      image: '/images/products/product-1.jpg',
      features: ['feature1', 'feature2', 'feature3'],
    },
    {
      id: 2,
      name: 'product2',
      description: 'product2.description',
      image: '/images/products/product-2.jpg',
      features: ['feature1', 'feature2', 'feature3'],
    },
    {
      id: 3,
      name: 'product3',
      description: 'product3.description',
      image: '/images/products/product-3.jpg',
      features: ['feature1', 'feature2', 'feature3'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/bg/products-bg.jpg"
            alt="Products Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {t('title')}
                </h1>
                <p className="text-xl mb-8">{t('subtitle')}</p>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <MotionDiv
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={t(product.name)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    {t(`${product.name}.name`)}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t(`${product.name}.description`)}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-title mr-2"
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
                        {t(feature)}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{t('learnMore')}</Button>
                </div>
              </MotionDiv>
            ))}
          </div>
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
            <Button variant="secondary" size="lg">
              {t('cta.button')}
            </Button>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}
