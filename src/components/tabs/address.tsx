import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { InputField } from '../inputs/input-field'

interface UserData {
  address?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    postalCode?: string
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
  const { texts } = useLayoutAdminContext()

  return (
    <div className="grid grid-cols-3 gap-4 text-left items-end">
      <div className="col-span-2">
        <InputField
          label={texts.street}
          value={editableData.address?.street || ''}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('street', value, true)}
        />
      </div>
      <InputField
        label={texts.number}
        value={editableData.address?.number || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('number', value, true)}
      />
      <div className="col-span-2">
        <InputField
          label={texts.complement}
          value={editableData.address?.complement || ''}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('complement', value, true)}
        />
      </div>
      <InputField
        label={texts.neighborhood}
        value={editableData.address?.neighborhood || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('neighborhood', value, true)}
      />
      <InputField
        label={texts.city}
        value={editableData.address?.city || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('city', value, true)}
      />
      <InputField
        label={texts.state}
        value={editableData.address?.state || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('state', value, true)}
      />
      <InputField
        label={texts.postalCode}
        value={editableData.address?.postalCode || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('postalCode', value, true)}
      />
      <InputField
        label={texts.country}
        value={editableData.address?.country || ''}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('country', value, true)}
      />
    </div>
  )
}
