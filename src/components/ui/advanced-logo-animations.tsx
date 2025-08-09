'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface AdvancedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

// Logo com efeito de digitação
export function TypewriterLogo({
  size = 'md',
  className = '',
}: AdvancedLogoProps) {
  const [text, setText] = useState('')
  const fullText = 'JBE'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 200)

    return () => clearInterval(timer)
  }, [])

  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/images/svg/logo.svg"
        alt="JBE Logo"
        fill
        className="object-contain"
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-2xl font-bold text-blue-900">
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            |
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  )
}

// Logo com efeito de quebra e reconstrução
export function ShatterLogo({
  size = 'md',
  className = '',
}: AdvancedLogoProps) {
  const controls = useAnimation()
  const [isAnimating, setIsAnimating] = useState(false)

  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  const handleClick = async () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Animação de quebra
    await controls.start({
      scale: [1, 1.2, 0.8],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.3 },
    })

    // Peças voando
    await controls.start({
      scale: [0.8, 0.5],
      x: [0, 50],
      y: [0, -30],
      opacity: [1, 0],
      transition: { duration: 0.4 },
    })

    // Reconstrução
    await controls.start({
      scale: [0.5, 1.2, 1],
      x: [50, 0],
      y: [-30, 0],
      opacity: [0, 1],
      transition: { duration: 0.5, type: 'spring', stiffness: 200 },
    })

    setIsAnimating(false)
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
      animate={controls}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src="/images/svg/logo.svg"
        alt="JBE Logo"
        fill
        className="object-contain"
      />
    </motion.div>
  )
}

// Logo com efeito de partículas 3D
export function Particle3DLogo({
  size = 'md',
  className = '',
}: AdvancedLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Partículas de fundo */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="relative z-10"
        animate={{
          rotateY: [0, 10, 0],
          rotateX: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/images/svg/logo.svg"
          alt="JBE Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  )
}

// Logo com efeito de energia
export function EnergyLogo({ size = 'md', className = '' }: AdvancedLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Raios de energia */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 bg-gradient-to-t from-blue-400 to-blue-600"
          style={{
            left: '50%',
            top: '50%',
            height: '100%',
            transformOrigin: 'center',
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            scaleY: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="relative z-10"
        animate={{
          filter: [
            'brightness(1) drop-shadow(0 0 5px rgba(17, 90, 166, 0.3))',
            'brightness(1.3) drop-shadow(0 0 15px rgba(17, 90, 166, 0.8))',
            'brightness(1) drop-shadow(0 0 5px rgba(17, 90, 166, 0.3))',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/images/svg/logo.svg"
          alt="JBE Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  )
}

// Logo com efeito de holograma
export function HologramLogo({
  size = 'md',
  className = '',
}: AdvancedLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Linhas de holograma */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="relative z-10"
        animate={{
          opacity: [0.7, 1, 0.7],
          filter: [
            'hue-rotate(0deg)',
            'hue-rotate(180deg)',
            'hue-rotate(360deg)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Image
          src="/images/svg/logo.svg"
          alt="JBE Logo"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Reflexo holográfico */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{
          background:
            'linear-gradient(45deg, transparent 30%, rgba(17, 90, 166, 0.1) 50%, transparent 70%)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
