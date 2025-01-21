'use client'

import React, { createContext, useContext, useState } from 'react'

// Definindo a estrutura dos arquivos por tipo de documento
interface UploadContextType {
  files: {
    [key: string]: File[] // Chaves para diferentes tipos de documentos
  }
  addFiles: (documentKey: string, newFiles: File[]) => void
  removeFile: (documentKey: string, index: number) => void // Remove um arquivo por chave e índice
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Inicializando o estado com um objeto vazio para cada tipo de documento
  const [files, setFiles] = useState<UploadContextType['files']>({
    documentFront: [],
    documentBack: [],
    proofOfAddress: [],
    incomeTaxProof: [],
  })

  // Função para adicionar arquivos a uma chave específica
  const addFiles = (documentKey: string, newFiles: File[]) => {
    setFiles((prev) => ({
      ...prev,
      [documentKey]: [...(prev[documentKey] || []), ...newFiles], // Garante que prev[documentKey] seja um array
    }))
  }

  // Função para remover um arquivo de uma chave específica
  const removeFile = (documentKey: string, index: number) => {
    setFiles((prev) => ({
      ...prev,
      [documentKey]: prev[documentKey].filter((_, i) => i !== index), // Remove arquivo pela chave e índice
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
