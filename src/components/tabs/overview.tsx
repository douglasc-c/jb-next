'use client'

import { InputField } from '@/components/inputs/input-field'
import { useTranslations } from 'next-intl'

interface OverviewProps {
  isEditing: boolean
  data: {
    tradeName: string
    companyName: string
    cnpj: string
    phone: string
    responsible: string
  }
  onChange: (field: string, value: string) => void
}

export function Overview({ isEditing, data, onChange }: OverviewProps) {
  const t = useTranslations('TextLang')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-3">
        <InputField
          label={t('tradeName')}
          value={data.tradeName}
          isEditing={isEditing}
          onChange={(value) => onChange('tradeName', String(value))}
        />
      </div>
      <div className="col-span-3">
        <InputField
          label={t('companyName')}
          value={data.companyName}
          isEditing={isEditing}
          onChange={(value) => onChange('companyName', String(value))}
        />
      </div>
      <InputField
        label={t('cnpj')}
        value={data.cnpj}
        isEditing={isEditing}
        onChange={(value) => onChange('cnpj', String(value))}
      />
      <InputField
        label={t('phone')}
        value={data.phone}
        isEditing={isEditing}
        onChange={(value) => onChange('phone', String(value))}
      />
      <InputField
        label={t('responsible')}
        value={data.responsible}
        isEditing={isEditing}
        onChange={(value) => onChange('responsible', String(value))}
      />
    </div>
  )
}
