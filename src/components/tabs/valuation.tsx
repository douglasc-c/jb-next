import { useLayoutAdminContext } from '@/context/layout-admin-context'
import React from 'react'
import { InputField } from '../inputs/input-field'

interface ValuationFormProps {
  newValuation: number | string
  setNewValuation: (value: number | string) => void
  mode: string
  setMode: (value: string) => void
  handleValuationUpdate: () => void
  valuationData: {
    enterprise: {
      difference: number
      percentageChange: number
      valuationAfter: number
      valuationBefore: number
    }
    user: {
      difference: number
      email: string
      id: number
      percentageChange: number
      username: string
      valuationAfter: number
      valuationBefore: number
    }
  } | null
}

const ValuationForm: React.FC<ValuationFormProps> = ({
  newValuation,
  setNewValuation,
  mode,
  setMode,
  handleValuationUpdate,
  valuationData,
}) => {
  const { texts } = useLayoutAdminContext()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <InputField
            label={texts.newValuation}
            value={newValuation}
            type="number"
            isEditing={true}
            onChange={(value) => {
              if (
                value !== null &&
                (typeof value === 'string' || typeof value === 'number')
              ) {
                setNewValuation(value)
              }
            }}
          />
          <InputField
            label={texts.mode}
            value={mode}
            isEditing={true}
            type="select"
            options={[
              { value: 'consulting', label: texts.consulting },
              { value: 'confirmed', label: texts.confirmed },
            ]}
            onChange={(value) => {
              if (typeof value === 'string') {
                setMode(value)
              }
            }}
          />
        </div>
        <div className="item-end">
          <button
            onClick={handleValuationUpdate}
            className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark"
          >
            {texts.confirmed}
          </button>
        </div>
      </div>

      {valuationData && (
        <div className="flex space-x-10 mt-5 text-zinc-400">
          <div>
            <h3 className="text-zinc-300">{texts.venture}</h3>
            <p>
              {texts.percentage}:{' '}
              <span className="font-medium text-white">
                {valuationData.enterprise.percentageChange.toFixed(2)}%
              </span>
            </p>
            <p>
              {texts.valuationBefore}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.enterprise.valuationBefore}
              </span>
            </p>
            <p>
              {texts.valuationAfter}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.enterprise.valuationAfter}
              </span>
            </p>
            <p>
              {texts.difference}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.enterprise.difference}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-zinc-300">{texts.user}</h3>
            <p>
              {texts.email}:{' '}
              <span className="font-medium text-white">
                {valuationData.user.email}
              </span>
            </p>
            <p>
              {texts.valuationBefore}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.user.valuationBefore}
              </span>
            </p>
            <p>
              {texts.valuationAfter}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.user.valuationAfter}
              </span>
            </p>
            <p>
              {texts.difference}:{' '}
              <span className="font-medium text-white">
                $ {valuationData.user.difference}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ValuationForm
