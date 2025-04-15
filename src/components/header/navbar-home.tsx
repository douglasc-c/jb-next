'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      })
      setIsMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-title">
              <Image
                src={`/images/svg/logo.svg`}
                alt="logo"
                height={180}
                width={180}
                className="transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToTop}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('problems')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Problemas
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('steps')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Passo a Passo
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Solução
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              Contato
            </button>
            <Link href="/signin">
              <Button
                variant="secondary"
                size="sm"
                className="bg-title text-white hover:bg-title/90"
              >
                Entrar
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-200 hover:text-title transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={scrollToTop}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('problems')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Problemas
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection('steps')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Passo a Passo
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Solução
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-zinc-200 hover:text-title transition-colors py-2"
              >
                Contato
              </button>
              <Link href="/signin" className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-title text-white hover:bg-title/90"
                >
                  Entrar
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
