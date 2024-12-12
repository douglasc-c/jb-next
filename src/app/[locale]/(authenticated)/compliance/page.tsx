'use client'

import { useState } from 'react'

import { useLayoutContext } from '@/context/layout-context'
import ComplianceStep from '@/components/cards/compliance-step'

export default function Compliance() {
  const { textCompliance } = useLayoutContext()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      documentType: 'RG',
      issuingBody: 'Brasil',
      buttonLabel: textCompliance.next,
    },
    {
      documentType: 'CPF',
      issuingBody: 'Brasil',
      buttonLabel: textCompliance.next,
    },
    {
      documentType: 'Comprovante de residência',
      issuingBody: 'Brasil',
      buttonLabel: textCompliance.next,
    },
    {
      documentType: 'Declaração de imposto de renda',
      issuingBody: 'Brasil',
      buttonLabel: textCompliance.finish,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <ComplianceStep
          documentType={steps[currentStep].documentType}
          issuingBody={steps[currentStep].issuingBody}
          buttonLabel={steps[currentStep].buttonLabel}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
          step={currentStep + 1}
          totalSteps={steps.length}
        />
      </div>
    </main>
  )
}
