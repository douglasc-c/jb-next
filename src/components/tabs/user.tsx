import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { InputField } from '../inputs/input-field'

interface UserData {
  firstName: string
  lastName: string
  complianceStatus: string
  email: string
  phone: string
  role: string
  birthDate: string
  createdAt: string
  totalInvested: number
  totalValuation: number
  username: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
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
  const { texts } = useLayoutAdminContext()
  return (
    <div className="grid grid-cols-2 gap-4 text-left items-end">
      <InputField
        label={texts.firstName}
        value={editableData.firstName}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('firstName', value)}
      />
      <InputField
        label={texts.lastName}
        value={editableData.lastName}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('lastName', value)}
      />
      <div className="col-span-2 md:col-span-1">
        <InputField
          label={texts.email}
          value={editableData.email}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('email', value)}
        />
      </div>
      <InputField
        label={texts.phone}
        value={editableData.phone}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('phone', value)}
      />
      <InputField
        type={'date'}
        label={texts.dateOfBith}
        value={editableData.birthDate}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('birthDate', value)}
      />
      <InputField
        label={texts.documentNumber}
        value={editableData.numberDocument}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('numberDocument', value)}
      />
      <InputField
        label={texts.userType}
        value={editableData.userType}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'INDIVIDUAL', label: texts.individual },
          { value: 'COMPANY', label: texts.company },
        ]}
        onChange={(value) => handleInputChange('userType', value)}
      />
      <InputField
        label={texts.role}
        value={editableData.role}
        isEditing={isEditing}
        type="select"
        options={[
          { value: 'ADMIN', label: texts.admin },
          { value: 'USER', label: texts.user },
        ]}
        onChange={(value) => handleInputChange('role', value)}
      />
    </div>
  )
}
