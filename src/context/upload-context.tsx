'use client'

import React, { createContext, useContext, useState } from 'react'

interface UploadContextType {
  files: Record<number, File[]> // Step -> Arquivos
  addFiles: (step: number, newFiles: File[]) => void
  removeFiles: (step: number) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<Record<number, File[]>>({})

  const addFiles = (step: number, newFiles: File[]) => {
    setFiles((prev) => ({
      ...prev,
      [step]: newFiles,
    }))
  }

  const removeFiles = (step: number) => {
    setFiles((prev) => {
      const updatedFiles = { ...prev }
      delete updatedFiles[step]
      return updatedFiles
    })
  }

  return (
    <UploadContext.Provider value={{ files, addFiles, removeFiles }}>
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
