'use client'

import { useEnterpriseContext } from '@/context/enterprise-context'; // <-- Importamos o contexto
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export interface Venture {
  // ... (seus campos)
}

interface MyVenturesProps {
  data: Venture[]
}

export function VenturesTable({ data }: MyVenturesProps) {
  const t = useTranslations('TextLang')
  const router = useRouter()
  const params = useParams() as { locale: string }
  const locale = params.locale

 
  const { setCurrentEnterprise } = useEnterpriseContext()

  const handleSeeMore = (row: Venture) => {
  
    setCurrentEnterprise(row)
    router.push(`/${locale}/admin/ventures/${row.id}`)
  }

  return (
    <section className="h-auto w-full p-4">
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-xs">
                {t('venture')}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {t('completionDate')}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {t('amountInvested')}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {t('amountTransferred')}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {t('seeMore')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={
                  index !== data.length - 1 ? 'border-b border-zinc-400' : ''
                }
              >
                <td className="px-4 py-2 text-xs">{row.name}</td>
                <td className="px-4 py-2 text-center text-xs">
                  {new Date(row.completionDate).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  U$ {row.fundingAmount}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  U$ {row.transferAmount}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  <button
                    className="border rounded-full text-primary border-primary py-1 px-4 bg-transparent"
                    onClick={() => handleSeeMore(row)}
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
