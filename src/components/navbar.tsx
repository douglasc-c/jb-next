'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('TextLang.navbar')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('services-dropdown')
      const trigger = document.getElementById('services-trigger')
      if (
        dropdown &&
        trigger &&
        !dropdown.contains(event.target as Node) &&
        !trigger.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(248, 250, 252)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
        color: scrolled ? 'rgb(15, 23, 42)' : 'rgb(228, 228, 231)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <Link href="/" className="text-2xl font-bold text-title">
                <Image
                  src={`/images/svg/logo.svg`}
                  alt="logo"
                  height={280}
                  width={280}
                  className=""
                />
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`font-medium transition-colors relative group ${
                pathname === '/' ? 'text-blue-900' : ''
              }`}
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors relative group ${
                pathname === '/about' ? 'text-blue-900' : ''
              }`}
            >
              {t('about')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
            <Link
              href="/products"
              className={`font-medium transition-colors relative group ${
                pathname === '/products' ? 'text-blue-900' : ''
              }`}
            >
              {t('products')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>

            <div className="relative">
              <button
                id="services-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="font-medium transition-colors relative group flex items-center gap-1"
              >
                {t('services')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </button>

              {isDropdownOpen && (
                <div
                  id="services-dropdown"
                  className="absolute top-full left-0 mt-2 min-w-[220px] bg-white rounded-md shadow-lg py-2"
                >
                  {/* <Link
                    href="/expertise"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('expertise')}
                  </Link> */}
                  <Link
                    href="/supplier"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('supplier')}
                  </Link>
                  <Link
                    href="/clients"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('clients')}
                  </Link>
                  {/* <Link
                    href="/imports&exports"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('imports')}
                  </Link> */}
                </div>
              )}
            </div>

            {/* <Link
              href="/partners"
              className={`font-medium transition-colors relative group ${
                pathname === '/partners' ? 'text-blue-900' : ''
              }`}
            >
              {t('partners')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link> */}
            <Link
              href="/contact"
              className={`font-medium transition-colors relative group ${
                pathname === '/contact' ? 'text-blue-900' : ''
              }`}
            >
              {t('contact')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-medium transition-colors"
            >
              {isMenuOpen ? (
                <X
                  size={24}
                  className={` ${scrolled ? 'text-zinc-900' : 'text-zinc-200'}`}
                />
              ) : (
                <Menu
                  size={24}
                  className={` ${scrolled ? 'text-zinc-900' : 'text-zinc-200'}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden backdrop-blur-md"
          animate={{
            backgroundColor: scrolled
              ? 'rgba(248, 250, 252, 0.95)'
              : 'rgba(24, 24, 27, 0.95)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/about' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link>
              <Link
                href="/products"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/products' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('products')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link>
              <div className="flex flex-col space-y-2 pl-4">
                <span className="font-medium text-gray-200">
                  {t('services')}
                </span>
                {/* <Link
                  href="/expertise"
                  className={`font-medium transition-colors py-2 relative group ${
                    pathname === '/expertise' ? 'text-title' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('expertise')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
                </Link> */}
                <Link
                  href="/supplier"
                  className={`font-medium transition-colors py-2 relative group ${
                    pathname === '/supplier' ? 'text-title' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('supplier')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
                </Link>
                <Link
                  href="/clients"
                  className={`font-medium transition-colors py-2 relative group ${
                    pathname === '/clients' ? 'text-title' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('clients')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
                </Link>
                {/* <Link
                  href="/imports&exports"
                  className={`font-medium transition-colors py-2 relative group ${
                    pathname === '/imports&exports' ? 'text-title' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('imports')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
                </Link> */}
              </div>
              {/* <Link
                href="/partners"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/partners' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('partners')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link> */}
              <Link
                href="/contact"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/contact' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
