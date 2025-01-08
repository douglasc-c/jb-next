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

interface FinancialTabProps {
  isEditing: boolean
  editableData: UserData
  handleInputChange: (field: string, value: string, isAddress?: boolean) => void
}

export const FinancialTab: React.FC<FinancialTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const { texts } = useLayoutAdminContext()
  return (
    <div className="grid grid-cols-2 gap-4 text-left">
      <InputField
        label={texts.balance}
        value={editableData.walletBalance.toString()}
        isEditing={isEditing}
        onChange={(value) =>
          handleInputChange('walletBalance', parseFloat(value).toString())
        }
      />
    </div>
  )
}
