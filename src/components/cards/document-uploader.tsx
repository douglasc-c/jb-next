import React from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface DocumentUploaderProps {
  onUpload: (documentKey: string, files: File[]) => void // Agora aceita dois parâmetros
  attachLabel: string
  dragHint: string
  documentKey: string // Adicionando a chave do documento
}

export default function DocumentUploader({
  onUpload,
  attachLabel,
  dragHint,
  documentKey, // A chave do documento será recebida como uma prop
}: DocumentUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(documentKey, [acceptedFiles[0]]) // Passa o primeiro arquivo dentro de um array
      }
    },
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.pdf'],
    },
  })

  return (
    <section
      {...getRootProps()}
      className="flex flex-col justify-center items-center py-24 bg-zinc-700 rounded-xl space-y-3 border-dashed border-2 border-gray-500 cursor-pointer hover:bg-zinc-600 hover:text-zinc-400 text-zinc-500 transition"
    >
      <input {...getInputProps()} />
      <Image
        src="/images/svg/document.svg"
        width={40}
        height={40}
        alt="Document"
      />
      <div className="flex flex-row space-x-1">
        <span className="text-2xl font-light underline">{attachLabel}</span>
        <span className="text-2xl font-medium">{dragHint}</span>
      </div>
    </section>
  )
}
