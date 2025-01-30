import React from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface DocumentUploaderProps {
  onUpload: (documentKey: string, files: File[]) => void
  attachLabel: string
  dragHint: string
  documentKey: string
}

export default function DocumentUploader({
  onUpload,
  attachLabel,
  dragHint,
  documentKey,
}: DocumentUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(documentKey, [acceptedFiles[0]])
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
      className="flex flex-col justify-center items-center py-24 bg-zinc-300 rounded-xl space-y-3 border-dashed border-2 border-gray-500 cursor-pointer hover:bg-zinc-600 hover:text-zinc-400 text-zinc-500 transition"
    >
      <input {...getInputProps()} />
      <Image
        src="/images/svg/document.svg"
        width={40}
        height={40}
        alt="Document"
      />
      <div className="flex flex-row space-x-1">
        <span className="md:text-2xl text-sm font-light underline">
          {attachLabel}
        </span>
        <span className="md:text-2xl text-sm font-medium">{dragHint}</span>
      </div>
    </section>
  )
}
