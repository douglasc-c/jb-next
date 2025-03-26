import { InputField } from '../inputs/input-field'
import { useTranslations } from 'next-intl'

interface UserData {
  firstName: string
  lastName: string
  email: string
  role: string
  id: string
}

interface UserTabProps {
  isEditing: boolean
  editableData: UserData
  handleInputChange: (
    field: string,
    value: string | number | File[] | null,
    isAddress?: boolean,
  ) => void
}
export const UserTab: React.FC<UserTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const t = useTranslations('TextLang')

  return (
    <div className="grid grid-cols-2 gap-4 text-left items-end">
      <InputField
        label={t('firstName')}
        value={editableData.firstName}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('firstName', value)}
      />
      <InputField
        label={t('lastName')}
        value={editableData.lastName}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('lastName', value)}
      />
      <div className="col-span-2 md:col-span-1">
        <InputField
          label={t('email')}
          value={editableData.email}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('email', value)}
        />
      </div>

      <InputField
        label={t('role')}
        value={editableData.role}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'ADMIN', label: t('admin') },
          { value: 'USER', label: t('user') },
        ]}
        onChange={(value) => handleInputChange('role', value)}
      />
    </div>
  )
}
