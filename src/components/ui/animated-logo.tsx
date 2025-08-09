'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface AnimatedLogoProps {
  variant?:
    | 'fade-in'
    | 'slide-in'
    | 'scale-in'
    | 'rotate-in'
    | 'bounce-in'
    | 'flip-in'
    | 'pulse'
    | 'float'
    | 'glow'
    | 'morph'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xl1' | 'xl2' | 'xl3' | 'xl4'
  className?: string
  href?: string
  delay?: number
  duration?: number
  loop?: boolean
}

export function AnimatedLogo({
  variant = 'fade-in',
  size = 'md',
  className = '',
  href = '/',
  delay = 0,
  duration = 0.8,
  loop = false,
}: AnimatedLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
    xl1: 'h-24 w-64',
    xl2: 'h-28 w-72',
    xl3: 'h-32 w-80',
    xl4: 'h-36 w-96',
  }

  const animations = {
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration, delay },
    },
    'slide-in': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration, delay, type: 'spring', stiffness: 100 },
    },
    'scale-in': {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration, delay, type: 'spring', stiffness: 200 },
    },
    'rotate-in': {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration, delay, type: 'spring', stiffness: 100 },
    },
    'bounce-in': {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration,
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
    'flip-in': {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      transition: { duration, delay, type: 'spring', stiffness: 100 },
    },
    pulse: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: [0.8, 1.1, 1],
        transition: {
          duration: 1.5,
          delay,
          repeat: loop ? Infinity : 0,
          repeatType: 'reverse' as const,
        },
      },
    },
    float: {
      initial: { opacity: 0, y: 0 },
      animate: {
        opacity: 1,
        y: [-10, 10, -10],
        transition: {
          duration: 3,
          delay,
          repeat: loop ? Infinity : 0,
          ease: 'easeInOut',
        },
      },
    },
    glow: {
      initial: { opacity: 0, filter: 'brightness(1)' },
      animate: {
        opacity: 1,
        filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        transition: {
          duration: 2,
          delay,
          repeat: loop ? Infinity : 0,
          ease: 'easeInOut',
        },
      },
    },
    morph: {
      initial: { opacity: 0, scale: 0.8, rotate: -5 },
      animate: {
        opacity: 1,
        scale: [0.8, 1.1, 1],
        rotate: [-5, 5, 0],
        transition: {
          duration: 1.2,
          delay,
          type: 'spring',
          stiffness: 200,
        },
      },
    },
  }

  const hoverAnimations = {
    'fade-in': { scale: 1.05, transition: { duration: 0.2 } },
    'slide-in': { scale: 1.05, x: 5, transition: { duration: 0.2 } },
    'scale-in': { scale: 1.1, transition: { duration: 0.2 } },
    'rotate-in': { rotate: 5, scale: 1.05, transition: { duration: 0.2 } },
    'bounce-in': { y: -5, scale: 1.05, transition: { duration: 0.2 } },
    'flip-in': { rotateY: 10, scale: 1.05, transition: { duration: 0.2 } },
    pulse: { scale: 1.1, transition: { duration: 0.2 } },
    float: { y: -15, scale: 1.05, transition: { duration: 0.2 } },
    glow: {
      filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(17, 90, 166, 0.5))',
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    morph: {
      scale: 1.1,
      rotate: 2,
      filter: 'brightness(1.1)',
      transition: { duration: 0.2 },
    },
  }

  const LogoComponent = (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={hoverAnimations[variant]}
      {...animations[variant]}
    >
      {/* Sombra branca de fundo */}
      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110"></div>
      <Image
        src="/images/svg/logo.svg"
        alt="JBE Logo"
        fill
        className="object-contain relative z-10"
        priority
      />
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {LogoComponent}
      </Link>
    )
  }

  return LogoComponent
}

// Componente específico para loading com animação de rotação
export function LoadingLogo({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <Image
        src="/images/svg/logo.svg"
        alt="JBE Logo Loading"
        fill
        className="object-contain"
      />
    </motion.div>
  )
}

// Componente de logo com efeito de partículas
export function ParticleLogo({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-12 w-32',
    lg: 'h-16 w-40',
    xl: 'h-20 w-48',
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle, rgba(17, 90, 166, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(17, 90, 166, 0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(17, 90, 166, 0.1) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Image
        src="/images/svg/logo.svg"
        alt="JBE Logo"
        fill
        className="object-contain relative z-10"
      />
    </div>
  )
}
