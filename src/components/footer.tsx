import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('TextLang')

  return (
    <footer className="bg-gradient-to-t from-slate-50 to-slate-100 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src={`/images/svg/logo.svg`}
              alt="logo"
              height={280}
              width={280}
              className="transition-all duration-300"
            />
            <p className="text-slate-900 mb-6 text-justify">
              {t('about.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/5541999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/whatsapp.svg"
                  width={24}
                  height={24}
                  alt="WhatsApp"
                />
              </a>
              <a
                href="https://instagram.com/jointbill"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/instagram.svg"
                  width={24}
                  height={24}
                  alt="Instagram"
                />
              </a>
              <a
                href="https://x.com/jointbill"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/x.svg"
                  width={24}
                  height={24}
                  alt="X (Twitter)"
                />
              </a>
              <a
                href="https://t.me/jointbill"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/telegram.svg"
                  width={24}
                  height={24}
                  alt="Telegram"
                />
              </a>
              <a
                href="https://linkedin.com/company/jointbill"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/linkedin.svg"
                  width={24}
                  height={24}
                  alt="LinkedIn"
                />
              </a>
              <a
                href="mailto:contato@jointbill.com.br"
                className="bg-title text-white p-3 rounded-full hover:bg-blue-900 transition-colors"
              >
                <Image
                  src="/images/svg/email.svg"
                  width={24}
                  height={24}
                  alt="Email"
                />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Links Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <Link
                href="/"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.home')}
              </Link>
              <Link
                href="/about"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.about')}
              </Link>
              <Link
                href="/products"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.products')}
              </Link>
              <Link
                href="/expertise"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.expertise')}
              </Link>
              <Link
                href="/supplier"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.supplier')}
              </Link>
              <Link
                href="/clients"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.clients')}
              </Link>
              <Link
                href="/imports&exports"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.imports')}
              </Link>
              <Link
                href="/partners"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.partners')}
              </Link>
              <Link
                href="/contact"
                className="text-slate-900 hover:text-white transition-colors"
              >
                {t('navbar.contact')}
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Contato
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-slate-900">(41) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-slate-900">contato@jointbill.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-slate-900">Curitiba, PR - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-slate-900">
          <p>
            &copy; {new Date().getFullYear()} JBE - Joint Bill Comercial,
            Industrial e Serviços de Engenharia Ltda. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
