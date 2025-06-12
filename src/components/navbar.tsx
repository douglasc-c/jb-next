'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
    <header
      className={`fixed top-0 left-0 right-0 z-50  ${
        scrolled
          ? 'bg-slate-50/90 backdrop-blur-md shadow-lg text-zinc-200 md:text-zinc-900'
          : 'bg-transparent text-zinc-200'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-title">
              <Image
                src={`/images/svg/logo.svg`}
                alt="logo"
                height={280}
                width={280}
                className=""
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`font-medium transition-colors relative group ${
                pathname === '/' ? 'text-title' : ''
              }`}
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors relative group ${
                pathname === '/about' ? 'text-title' : ''
              }`}
            >
              {t('about')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
            <Link
              href="/products"
              className={`font-medium transition-colors relative group ${
                pathname === '/products' ? 'text-title' : ''
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
                  <Link
                    href="/expertise"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('expertise')}
                  </Link>
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
                  <Link
                    href="/imports&exports"
                    className="block px-4 py-2 text-sm text-zinc-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {t('imports')}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/partners"
              className={`font-medium transition-colors relative group ${
                pathname === '/partners' ? 'text-title' : ''
              }`}
            >
              {t('partners')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors relative group ${
                pathname === '/contact' ? 'text-title' : ''
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
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-md">
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
                <Link
                  href="/expertise"
                  className={`font-medium transition-colors py-2 relative group ${
                    pathname === '/expertise' ? 'text-title' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('expertise')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
                </Link>
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
              </div>
              <Link
                href="/partners"
                className={`font-medium transition-colors py-2 relative group ${
                  pathname === '/partners' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('partners')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title  group-hover:w-full"></span>
              </Link>
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
        </div>
      )}
    </header>
  )
}
