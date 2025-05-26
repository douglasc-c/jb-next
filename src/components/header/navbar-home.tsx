'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                src={`/images/png/logo.png`}
                alt="logo"
                height={130}
                width={130}
                className="transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-semibold transition-colors relative group ${
                pathname === '/' ? 'text-title' : ''
              }`}
            >
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/services"
              className={`font-semibold transition-colors relative group ${
                pathname === '/services' ? 'text-title' : ''
              }`}
            >
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/equipment"
              className={`font-semibold transition-colors relative group ${
                pathname === '/equipment' ? 'text-title' : ''
              }`}
            >
              Equipamentos e Ferramental
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className={`font-semibold transition-colors relative group ${
                pathname === '/about' ? 'text-title' : ''
              }`}
            >
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className={`font-semibold transition-colors relative group ${
                pathname === '/contact' ? 'text-title' : ''
              }`}
            >
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-semibold transition-colors"
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
                className={`font-semibold transition-colors py-2 relative group ${
                  pathname === '/' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/services"
                className={`font-semibold transition-colors py-2 relative group ${
                  pathname === '/services' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/equipment"
                className={`font-semibold transition-colors py-2 relative group ${
                  pathname === '/equipment' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Equipamentos e Ferramental
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className={`font-semibold transition-colors py-2 relative group ${
                  pathname === '/about' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className={`font-semibold transition-colors py-2 relative group ${
                  pathname === '/contact' ? 'text-title' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-title transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
