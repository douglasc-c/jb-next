import { InputField } from '../inputs/input-field'
import { useTranslations } from 'next-intl'

interface UserData {
  address?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
}

interface AddressTabProps {
  isEditing: boolean
  editableData: UserData
  handleInputChange: (
    field: string,
    value: string | number | File[] | null,
    isAddress?: boolean,
  ) => void
}
export const AddressTab: React.FC<AddressTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const t = useTranslations('TextLang')

  return (
    <div className="grid grid-cols-3 gap-4 text-left items-end">
      <div className="col-span-2">
        <InputField
          label={t('street')}
          value={editableData.address?.street || ''}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('street', value, true)}
        />
      </div>
      <InputField
        label={t('number')}
        value={editableData.address?.number || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('number', value, true)}
      />

      <InputField
        label={t('complement')}
        value={editableData.address?.complement || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('complement', value, true)}
      />

      <InputField
        label={t('city')}
        value={editableData.address?.city || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('city', value, true)}
      />
      <InputField
        label={t('postalCode')}
        value={editableData.address?.zipCode || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('zipCode', value, true)}
      />
      <InputField
        label={t('state')}
        value={editableData.address?.state || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('state', value, true)}
      />

      <InputField
        label={t('country')}
        value={editableData.address?.country || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('country', value, true)}
      />
    </div>
  )
}
