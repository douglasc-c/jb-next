'use client'

import { useState } from 'react'
import { useLayoutContext } from '@/context/layout-context'
import { useUploadContext } from '@/context/upload-context'
import ComplianceStep from '@/components/cards/compliance-step'
import Image from 'next/image'

export default function Compliance() {
  const { textCompliance } = useLayoutContext()
  const { files, addFiles } = useUploadContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false) // Estado para controle de submissão

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
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (newFiles: File[]) => {
    addFiles(currentStep, newFiles)
  }

  const handleSubmit = () => {
    console.log('Enviando arquivos:', files)
    // Simulação de envio (substitua pelo código real de chamada API)
    setTimeout(() => {
      setIsSubmitted(true) // Alterar para true após "envio" simulado
    }, 1000)
  }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium">{textCompliance.compliance}</h1>

        {!isSubmitted ? (
          <ComplianceStep
            documentType={steps[currentStep].documentType}
            issuingBody={steps[currentStep].issuingBody}
            buttonLabel={steps[currentStep].buttonLabel}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            onFileUpload={handleFileUpload}
            step={currentStep + 1}
            totalSteps={steps.length}
          />
        ) : (
          <div className="p-10 py-[10rem] bg-zinc-800 rounded-xl items-center justify-center">
            <div className="text-center space-y-4">
              <div className="bg-zinc-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto">
                <Image
                  src="/images/svg/check.svg"
                  width={40}
                  height={40}
                  alt="Document"
                />
              </div>
              <h1 className="text-xl font-medium text-zinc-400">
                {textCompliance.verificationCompleted}
              </h1>
              <p className="text-sm font-light text-zinc-500">
                {
                  textCompliance.congratulationsYouHaveSubmittedYourDocumentsAndCompletedTheMandatoryComplianceStep
                }
              </p>
              <p className="text-sm font-light text-primary underline">
                {textCompliance.howDoIChangeMyDataAndDocuments}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
