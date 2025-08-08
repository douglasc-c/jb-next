'use client'

import { NavbarHome } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  AnimatedLogo,
  LoadingLogo,
  ParticleLogo,
} from '@/components/ui/animated-logo'
import {
  TypewriterLogo,
  ShatterLogo,
  Particle3DLogo,
  EnergyLogo,
  HologramLogo,
} from '@/components/ui/advanced-logo-animations'
import { motion } from 'framer-motion'

export default function LogoAnimationsPage() {
  const animations = [
    { name: 'Fade In', variant: 'fade-in' as const },
    { name: 'Slide In', variant: 'slide-in' as const },
    { name: 'Scale In', variant: 'scale-in' as const },
    { name: 'Rotate In', variant: 'rotate-in' as const },
    { name: 'Bounce In', variant: 'bounce-in' as const },
    { name: 'Flip In', variant: 'flip-in' as const },
    { name: 'Pulse', variant: 'pulse' as const },
    { name: 'Float', variant: 'float' as const },
    { name: 'Glow', variant: 'glow' as const },
    { name: 'Morph', variant: 'morph' as const },
  ]

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-20 pt-36 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Animações de Logo
            </h1>
            <p className="text-xl text-white/90">
              Demonstração de todas as animações disponíveis para o logo da JBE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animações Básicas */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Animações de Entrada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animations.slice(0, 6).map((animation, index) => (
              <motion.div
                key={animation.variant}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <AnimatedLogo
                    variant={animation.variant}
                    size="lg"
                    delay={0.2}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-900">
                  {animation.name}
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  Clique para ver a animação novamente
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animações Contínuas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Animações Contínuas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animations.slice(6).map((animation, index) => (
              <motion.div
                key={animation.variant}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <AnimatedLogo
                    variant={animation.variant}
                    size="md"
                    loop={true}
                    delay={0.2}
                  />
                </div>
                <h3 className="text-lg font-semibold text-center text-blue-900">
                  {animation.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animações Especiais */}
      <section className="py-20 bg-gradient-to-t from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Animações Especiais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Loading Logo
              </h3>
              <div className="flex justify-center mb-4">
                <LoadingLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Rotação contínua para carregamento
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Particle Logo
              </h3>
              <div className="flex justify-center mb-4">
                <ParticleLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Efeito de partículas e brilho
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Typewriter Logo
              </h3>
              <div className="flex justify-center mb-4">
                <TypewriterLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Efeito de digitação
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animações Avançadas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Animações Avançadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Shatter Logo
              </h3>
              <div className="flex justify-center mb-4">
                <ShatterLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Clique para quebrar e reconstruir
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                3D Particle Logo
              </h3>
              <div className="flex justify-center mb-4">
                <Particle3DLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Partículas 3D e rotação
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Energy Logo
              </h3>
              <div className="flex justify-center mb-4">
                <EnergyLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Raios de energia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                Hologram Logo
              </h3>
              <div className="flex justify-center mb-4">
                <HologramLogo size="md" />
              </div>
              <p className="text-gray-600 text-center text-sm">
                Efeito holográfico
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tamanhos Disponíveis */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Tamanhos Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Pequeno', size: 'sm' as const },
              { name: 'Médio', size: 'md' as const },
              { name: 'Grande', size: 'lg' as const },
              { name: 'Extra Grande', size: 'xl' as const },
            ].map((size, index) => (
              <motion.div
                key={size.size}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <AnimatedLogo
                    variant="bounce-in"
                    size={size.size}
                    delay={0.2}
                  />
                </div>
                <h3 className="text-lg font-semibold text-center text-blue-900">
                  {size.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Usar */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Como Usar
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-blue-900">
                Exemplos de Implementação
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Animação Básica:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<AnimatedLogo variant="fade-in" size="md" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Animação com Loop:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<AnimatedLogo variant="pulse" size="lg" loop={true} />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo de Loading:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<LoadingLogo size="md" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo com Partículas:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<ParticleLogo size="lg" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo com Digitação:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<TypewriterLogo size="md" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo Interativo (Clique):
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<ShatterLogo size="lg" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo 3D com Partículas:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<Particle3DLogo size="lg" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo com Energia:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<EnergyLogo size="lg" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Logo Holográfico:
                  </h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`<HologramLogo size="lg" />`}
                  </pre>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-blue-900">
                  Variantes Básicas:
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    • <strong>fade-in:</strong> Aparece gradualmente
                  </li>
                  <li>
                    • <strong>slide-in:</strong> Desliza da esquerda
                  </li>
                  <li>
                    • <strong>scale-in:</strong> Cresce do centro
                  </li>
                  <li>
                    • <strong>rotate-in:</strong> Gira ao aparecer
                  </li>
                  <li>
                    • <strong>bounce-in:</strong> Quica ao entrar
                  </li>
                  <li>
                    • <strong>flip-in:</strong> Vira no eixo Y
                  </li>
                  <li>
                    • <strong>pulse:</strong> Pulsa continuamente
                  </li>
                  <li>
                    • <strong>float:</strong> Flutua suavemente
                  </li>
                  <li>
                    • <strong>glow:</strong> Brilha periodicamente
                  </li>
                  <li>
                    • <strong>morph:</strong> Transformação complexa
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-green-900">
                  Componentes Especiais:
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    • <strong>LoadingLogo:</strong> Rotação contínua
                  </li>
                  <li>
                    • <strong>ParticleLogo:</strong> Efeito de partículas
                  </li>
                  <li>
                    • <strong>TypewriterLogo:</strong> Efeito de digitação
                  </li>
                  <li>
                    • <strong>ShatterLogo:</strong> Quebra e reconstrução
                    (clique)
                  </li>
                  <li>
                    • <strong>Particle3DLogo:</strong> Partículas 3D
                  </li>
                  <li>
                    • <strong>EnergyLogo:</strong> Raios de energia
                  </li>
                  <li>
                    • <strong>HologramLogo:</strong> Efeito holográfico
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
