import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { InputField } from '../inputs/input-field'

interface UserData {
  walletBalance: number
  totalInvested: number
  totalValuation: number
}

interface FinancialTabProps {
  isEditing: boolean
  editableData: UserData
  handleInputChange: (
    field: string,
    value: string | number | boolean | File[] | null,
  ) => void
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
        label={texts.totalInvested}
        value={editableData.totalInvested.toString()}
        isEditing={false}
        onChange={(value) => handleInputChange('walletBalance', value)}
      />
      <InputField
        label={texts.totalValuation}
        value={editableData.totalValuation.toString()}
        isEditing={false}
        onChange={(value) => handleInputChange('walletBalance', value)}
      />
      <InputField
        label={texts.balance}
        value={editableData.walletBalance.toString()}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('walletBalance', value)}
      />
    </div>
  )
}
