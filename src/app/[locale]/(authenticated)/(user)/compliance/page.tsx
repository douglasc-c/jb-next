'use client'

import { useState } from 'react'
import { useLayoutContext } from '@/context/layout-context'
import { useUploadContext } from '@/context/upload-context'
import ComplianceStep from '@/components/cards/compliance-step'
import Image from 'next/image'
import api from '@/lib/api'
import { useAuthContext } from '@/context/auth-context'
import { Loading } from '@/components/loading/loading'

interface FormData {
  documentType: string
}

export default function Compliance() {
  const { authData, isLoadingAuthData } = useAuthContext()
  const { texts } = useLayoutContext()
  const { files, addFiles } = useUploadContext()

  const [formData, setFormData] = useState<FormData>({ documentType: 'CNH' })
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      buttonLabel: texts.next,
    },
    {
      buttonLabel: texts.next,
    },
    {
      buttonLabel: texts.next,
    },
    {
      buttonLabel: texts.finish,
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

  const getDocumentKey = (step: number): string => {
    switch (step) {
      case 0:
        return 'documentFront'
      case 1:
        return 'documentBack'
      case 2:
        return 'proofOfAddress'
      case 3:
        return 'incomeTaxProof'
      default:
        return ''
    }
  }

  const handleFileUpload = (newFiles: File[]) => {
    const documentKey = getDocumentKey(currentStep)
    addFiles(documentKey, newFiles)
  }

  const handleFormDataUpdate = (updatedFormData: FormData) => {
    setFormData(updatedFormData)
  }

  const handleSubmit = async () => {
    const documentType = formData.documentType

    const formDataToSend = new FormData()

    formDataToSend.append('documentType', documentType)

    if (files.documentFront && files.documentFront[0]) {
      formDataToSend.append('documentFront', files.documentFront[0])
    }
    if (files.documentBack && files.documentBack[0]) {
      formDataToSend.append('documentBack', files.documentBack[0])
    }
    if (files.proofOfAddress && files.proofOfAddress[0]) {
      formDataToSend.append('proofOfAddress', files.proofOfAddress[0])
    }
    if (files.incomeTaxProof && files.incomeTaxProof[0]) {
      formDataToSend.append('incomeTaxProof', files.incomeTaxProof[0])
    }

    try {
      const response = await api.post(`/users/send-document`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Resposta do servidor:', response.data)
    } catch (error) {
      console.error('Erro ao enviar os documentos:', error)
    }
  }

  if (isLoadingAuthData) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={true} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-300 rounded-xl space-y-3">
        <h1 className="uppercase font-medium">{texts.compliance}</h1>

        {authData?.user.complianceStatus !== 'UNDER_REVIEW' ? (
          <ComplianceStep
            buttonLabel={steps[currentStep].buttonLabel}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            onFileUpload={handleFileUpload}
            step={currentStep + 1}
            totalSteps={steps.length}
            onFormDataUpdate={handleFormDataUpdate}
          />
        ) : (
          <div className="p-10 py-[10rem] bg-zinc-200 rounded-xl items-center justify-center">
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
                {texts.verificationCompleted}
              </h1>
              <p className="text-sm font-light text-zinc-500">
                {
                  texts.congratulationsYouHaveSubmittedYourDocumentsAndCompletedTheMandatoryComplianceStep
                }
              </p>
              <p className="text-sm font-light text-primary underline">
                {texts.howDoIChangeMyDataAndDocuments}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
