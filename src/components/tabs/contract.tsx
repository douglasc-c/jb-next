import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import { useEffect, useState, ChangeEvent } from 'react'
import { BarLoader, PulseLoader } from 'react-spinners'
interface Contract {
  id: string
  filePath: string
  isFinalized: string
  enterpriseId: string
}

interface Links {
  docxUrl: string
  pdfUrl: string
}

interface ContractTabProps {
  links: Links | null
  contracts: Contract[]
}

export const ContractTab: React.FC<ContractTabProps> = ({
  links,
  contracts,
}) => {
  const { texts } = useLayoutAdminContext()
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [signal, setSignal] = useState(false)
  const contract = contracts[0]

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo antes de enviar.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('enterpriseId', contract.enterpriseId)

    setUploading(true)

    try {
      const response = await api.post('admin/contract/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(`Upload realizado com sucesso!, ${response}`)
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = () => {
    if (links?.docxUrl) {
      const link = document.createElement('a')
      link.href = links.docxUrl
      link.download = 'contrato.docx'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleOpenPdf = () => {
    if (links?.pdfUrl) {
      window.open(links.pdfUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleSignalPdf = async () => {
    setSignal(true)
    try {
      const response = await api.post(
        `/admin/contract/send-signature/${contract.enterpriseId}`,
      )
      if (response.status === 200) {
        const linkAdmin = response.data.adminSigningUrl

        if (linkAdmin) {
          window.open(linkAdmin, '_blank', 'noopener,noreferrer')
        }
      }
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setSignal(false)
    }
  }

  useEffect(() => {
    if (links) {
      setLoading(false)
    }
  }, [links])

  return (
    <div className="">
      {loading ? (
        <BarLoader color="#A47659" width={100} />
      ) : (
        <div className="grid grid-cols-3 gap-4 text-xs md:text-sm">
          <button
            className="bg-secondary text-white px-4 py-2 rounded-md"
            onClick={handleDownload}
            disabled={!links?.docxUrl}
          >
            {texts.downloadContract}
          </button>

          <button
            className="bg-secondary text-white px-4 py-2 rounded-md"
            onClick={handleOpenPdf}
            disabled={!links?.pdfUrl}
          >
            {texts.viewContract}
          </button>

          <button
            className="bg-secondary text-white px-4 py-2 rounded-md"
            onClick={handleSignalPdf}
            disabled={!links?.pdfUrl}
          >
            {signal ? (
              <PulseLoader color="#fff" size={6} />
            ) : (
              texts.signalContract
            )}
          </button>

          <input
            type="file"
            onChange={handleFileChange}
            className="bg-secondary text-white px-4 py-2 rounded-md cursor-pointer col-span-2"
            id="file-upload"
          />

          {/* <label
            htmlFor="file-upload"
            className="bg-secondary text-white px-4 py-2 rounded-md cursor-pointer col-span-2"
          >
            Escolher Arquivo
          </label> */}

          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleFileUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? <PulseLoader color="#fff" size={6} /> : texts.send}
          </button>
        </div>
      )}
    </div>
  )
}
