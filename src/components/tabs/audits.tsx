'use client'

import { useTranslations } from 'next-intl'

interface Audit {
  id: number
  exported: boolean
  createdAt: string
  updatedAt: string
}

interface AuditsProps {
  audits?: Audit[]
}

export function Audits({ audits }: AuditsProps) {
  const t = useTranslations('TextLang')

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 text-zinc-200 font-medium">
              {t('id')}
            </th>
            <th className="text-left py-2 text-zinc-200 font-medium">
              {t('status')}
            </th>
            <th className="text-left py-2 text-zinc-200 font-medium">
              {t('createdAt')}
            </th>
            <th className="text-left py-2 text-zinc-200 font-medium">
              {t('updatedAt')}
            </th>
          </tr>
        </thead>
        <tbody>
          {audits?.map((audit) => (
            <tr key={audit.id} className="border-b border-border">
              <td className="py-2 text-textPrimary">{audit.id}</td>
              <td className="py-2 text-textPrimary">
                {audit.exported ? t('exported') : t('notExported')}
              </td>
              <td className="py-2 text-textPrimary">
                {new Date(audit.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 text-textPrimary">
                {new Date(audit.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
