'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Establishment {
  id: number
  tradeName: string
  companyName: string
  cnpj: string
  phone: string
  responsible: string
  address?: {
    street: string
    number: string
    zipCode: string
    complement: string
    city: string
    state: string
    country: string
  }
}

interface EstablishmentsTableProps {
  data: Establishment[]
}

export function EstablishmentsTable({ data }: EstablishmentsTableProps) {
  const t = useTranslations('TextLang')
  const router = useRouter()

  const handleSeeMore = (establishment: Establishment) => {
    const isAdmin = window.location.pathname.includes('/admin/')
    router.push(`${isAdmin ? '/admin' : ''}/establishments/${establishment.id}`)
  }

  return (
    <section className="h-auto w-full p-4 bg-primary antialiased border border-border text-textPrimary rounded-md">
      <div className="custom-scroll max-h-[40rem]">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium">
                {t('tradeName')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('companyName')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('cnpj')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('phone')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('responsible')}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium">
                {t('shares')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {data.map((establishment) => (
              <tr key={establishment.id} className="">
                <td className="px-4 py-2 text-xs text-left">
                  {establishment.tradeName}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  {establishment.companyName}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  {establishment.cnpj}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  {establishment.phone}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  {establishment.responsible}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  <button
                    onClick={() => handleSeeMore(establishment)}
                    className="rounded-full hover:bg-title hover:text-primary py-1 px-4 bg-transparent"
                  >
                    {t('seeMore')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
