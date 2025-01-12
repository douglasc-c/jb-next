import { useLayoutAdminContext } from '@/context/layout-admin-context'
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
  transferAmount: number
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
  handleInputChange: (field: string, value: string) => void
}

export const VentureTab: React.FC<VentureTabProps> = ({
  isEditing,
  editableData,
  handleInputChange,
}) => {
  const { texts } = useLayoutAdminContext()

  return (
    <div className="grid grid-cols-4 gap-4 text-left">
      <div className="col-span-2">
        <InputField
          label={texts.name}
          value={editableData.name}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('name', value)}
        />
      </div>
      <div className="col-span-2">
        <InputField
          label={texts.corporateName}
          value={editableData.corporateName}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('corporateName', value)}
        />
      </div>

      <div className="col-span-3">
        <InputField
          label={texts.description}
          value={editableData.description}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
      <div className="col-span-1">
        {isEditing ? (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.constructionType}</label>
            <select
              className="px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
              value={editableData.constructionType}
              onChange={(e) =>
                handleInputChange('constructionType', e.target.value)
              }
            >
              <option value="HOUSE">{texts.house}</option>
              <option value="APARTMENT">{texts.apartment}</option>
              <option value="OTHER">{texts.other}</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.constructionType}</label>
            <p className="px-4 py-2 rounded-md bg-zinc-800 text-gray-300">
              {editableData.constructionType}
            </p>
          </div>
        )}
      </div>

      <div className="col-span-2">
        <InputField
          label={texts.address}
          value={editableData.address}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('address', value)}
        />
      </div>
      <InputField
        label={texts.city}
        value={editableData.city}
        isEditing={isEditing}
        onChange={(value) => handleInputChange('city', value)}
      />
      <div className="col-span-1">
        {isEditing ? (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.isAvailable}</label>
            <select
              name="isAvailable"
              value={editableData.isAvailable ? 'true' : 'false'}
              onChange={(e) => handleInputChange('isAvailable', e.target.value)}
              className="w-full p-2 mt-1 rounded-lg bg-zinc-800 text-white"
            >
              <option value="true">{texts.available}</option>
              <option value="false">{texts.notAvaliable}</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.isAvailable}</label>
            <p className="px-4 py-2 rounded-md bg-zinc-800 text-gray-300">
              {editableData.isAvailable ? 'Disponível' : 'Indisponível'}
            </p>
          </div>
        )}
      </div>

      <div className="col-span-2">
        <InputField
          label={texts.postalCode}
          value={editableData.postalCode}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('postalCode', value)}
        />
      </div>
      <div className="col-span-1">
        <InputField
          type={'date'}
          label={texts.startDate}
          value={editableData.startDate}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('startDate', value)}
        />
      </div>
      <div className="col-span-1">
        <InputField
          type={'date'}
          label={texts.completionDate}
          value={editableData.completionDate}
          isEditing={isEditing}
          onChange={(value) => handleInputChange('completionDate', value)}
        />
      </div>

      <div className="col-span-2">
        <InputField
          type={'number'}
          label={texts.fundingAmount}
          value={editableData.fundingAmount.toString()}
          isEditing={isEditing}
          onChange={(value) =>
            handleInputChange('fundingAmount', parseFloat(value).toString())
          }
        />
      </div>
      <div className="col-span-2">
        <InputField
          type={'number'}
          label={texts.transferAmount}
          value={editableData.transferAmount.toString()}
          isEditing={isEditing}
          onChange={(value) =>
            handleInputChange('transferAmount', parseFloat(value).toString())
          }
        />
      </div>

      <div className="col-span-2">
        <InputField
          type={'number'}
          label={texts.squareMeterValue}
          value={editableData.squareMeterValue.toString()}
          isEditing={isEditing}
          onChange={(value) =>
            handleInputChange('squareMeterValue', parseFloat(value).toString())
          }
        />
      </div>
      <div className="col-span-1">
        <InputField
          type={'number'}
          label={texts.area}
          value={editableData.area.toString()}
          isEditing={isEditing}
          onChange={(value) =>
            handleInputChange('area', parseFloat(value).toString())
          }
        />
      </div>
      <div className="col-span-1">
        {isEditing ? (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.investmentType}</label>
            <select
              className="px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
              value={editableData.investmentType}
              onChange={(e) =>
                handleInputChange('investmentType', e.target.value)
              }
            >
              <option value="PROPERTY">{texts.property}</option>
              <option value="OTHER">{texts.other}</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300">{texts.investmentType}</label>
            <p className="px-4 py-2 rounded-md bg-zinc-800 text-gray-300">
              {editableData.investmentType}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
