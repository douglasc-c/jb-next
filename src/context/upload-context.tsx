'use client'

import React, { createContext, useContext, useState } from 'react'

interface UploadContextType {
  files: {
    [key: string]: File[]
  }
  addFiles: (documentKey: string, newFiles: File[]) => void
  removeFile: (documentKey: string, index: number) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<UploadContextType['files']>({
    documentFront: [],
    documentBack: [],
    proofOfAddress: [],
    incomeTaxProof: [],
  })

  const addFiles = (documentKey: string, newFiles: File[]) => {
    setFiles((prev) => ({
      ...prev,
      [documentKey]: [...(prev[documentKey] || []), ...newFiles],
    }))
  }

  const removeFile = (documentKey: string, index: number) => {
    setFiles((prev) => ({
      ...prev,
      [documentKey]: prev[documentKey].filter((_, i) => i !== index),
    }))
  }

  return (
    <UploadContext.Provider value={{ files, addFiles, removeFile }}>
      {children}
    </UploadContext.Provider>
  )
}

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within an UploadProvider')
  }
  return context
}
