import { useTranslations } from 'next-intl'
import { InputField } from '../inputs/input-field'

interface Venture {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount?: number | null
  postalCode: string
  address: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  coverImageUrl: string
}

interface VentureTabProps {
  isEditing: boolean
  editableData: Venture
  handleInputChange: (
    field: string,
    value: string | number | boolean | File[] | null,
  ) => void
}

export const VentureTab: React.FC<VentureTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const t = useTranslations('TextLang')

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 text-left items-end custom-scroll max-h-[400px]">
      <div className="col-span-2 grid-cols-2 grid gap-4">
        <InputField
          label={t('name')}
          value={editableData.name}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('name', value)}
        />
        <InputField
          label={t('corporateName')}
          value={editableData.corporateName}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('corporateName', value)}
        />
      </div>
      <div className="col-span-2 grid-cols-1 grid">
        <InputField
          label={t('description')}
          value={editableData.description}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
      <InputField
        label={t('constructionType')}
        value={editableData.constructionType}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'HOUSE', label: t('house') },
          { value: 'APARTMENT', label: t('apartment') },
          { value: 'OTHER', label: t('other') },
        ]}
        onChange={(value) => handleInputChange('constructionType', value)}
      />
      <InputField
        label={t('address')}
        value={editableData.address}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('address', value)}
      />
      <InputField
        label={t('city')}
        value={editableData.city}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('city', value)}
      />
      <InputField
        label={t('isAvailable')}
        value={editableData.isAvailable ? 'true' : 'false'}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'true', label: t('available') },
          { value: 'false', label: t('notAvaliable') },
        ]}
        onChange={(value) => handleInputChange('isAvailable', value)}
      />
      <InputField
        label={t('postalCode')}
        value={editableData.postalCode}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('postalCode', value)}
      />
      <InputField
        type="date"
        label={t('startDate')}
        value={editableData.startDate}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('startDate', value)}
      />
      <InputField
        type="date"
        label={t('completionDate')}
        value={editableData.completionDate}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('completionDate', value)}
      />
      <InputField
        type="number"
        label={t('fundingAmount')}
        value={editableData.fundingAmount.toString()}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('fundingAmount', value)}
      />
      <InputField
        type="number"
        label={t('squareMeterValue')}
        value={editableData.squareMeterValue.toString()}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('squareMeterValue', value)}
      />
      <InputField
        type="number"
        label={t('area')}
        value={editableData.area.toString()}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('area', value)}
      />
      <InputField
        label={t('investmentType')}
        value={editableData.investmentType}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'PROPERTY', label: t('property') },
          { value: 'MONEY', label: t('other') },
        ]}
        onChange={(value) => handleInputChange('investmentType', value)}
      />
    </div>
  )
}
