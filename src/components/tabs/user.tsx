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
  handleInputChange: (field: string, value: string, isAddress?: boolean) => void
}
export const UserTab: React.FC<UserTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const { texts } = useLayoutAdminContext()
  return (
    <div className="grid grid-cols-2 gap-4 text-left">
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
      {isEditing ? (
        <div className="flex flex-col space-y-1">
          <label className="text-zinc-500">{texts.userType}</label>
          <select
            className="px-4 py-2 rounded-md bg-zinc-900 text-zinc-400 font-light text-sm border border-zinc-500"
            value={editableData.userType}
            onChange={(e) => handleInputChange('userType', e.target.value)}
          >
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="COMPANY">COMPANY</option>
          </select>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          <label className="text-zinc-500 text-sm">{texts.userType}</label>
          <p className="px-4 py-2 rounded-md bg-zinc-900 text-zinc-400 text-xs">
            {editableData.userType}
          </p>
        </div>
      )}
      {isEditing ? (
        <div className="flex flex-col space-y-1">
          <label className="text-zinc-500">{texts.role}</label>
          <select
            className="px-4 py-2 rounded-md bg-zinc-900 text-zinc-400 font-light text-sm border border-zinc-500"
            value={editableData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          <label className="text-zinc-500 text-sm">{texts.role}</label>
          <p className="px-4 py-2 rounded-md bg-zinc-900 text-zinc-400 text-xs">
            {editableData.role}
          </p>
        </div>
      )}
    </div>
  )
}
