import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ButtonGlobal from '../buttons/global'
import processApi from '@/lib/process-api'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Audit } from '@/types/audit'

interface FlagPercentage {
  bandeira: string
  tipoTransacao: string
  percentage: number
}

interface NewAuditModalProps {
  isOpen: boolean
  onClose: () => void
  establishmentId: string
  onSuccess?: (newAudit: Audit) => void
}

export function NewAuditModal({
  isOpen,
  onClose,
  establishmentId,
  onSuccess,
}: NewAuditModalProps) {
  const t = useTranslations('TextLang')
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [flagPercentages, setFlagPercentages] = useState<FlagPercentage[]>([
    { bandeira: '', tipoTransacao: '', percentage: 0 },
  ])
  const [loading, setLoading] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const clearForm = () => {
    setFiles([])
    setFlagPercentages([{ bandeira: '', tipoTransacao: '', percentage: 0 }])
  }

  const handleAddFlag = () => {
    setFlagPercentages([
      ...flagPercentages,
      { bandeira: '', tipoTransacao: '', percentage: 0 },
    ])
  }

  const handleRemoveFlag = (index: number) => {
    setFlagPercentages(flagPercentages.filter((_, i) => i !== index))
  }

  const handleFlagChange = (
    index: number,
    field: 'bandeira' | 'tipoTransacao' | 'percentage',
    value: string,
  ) => {
    const newFlagPercentages = [...flagPercentages]
    newFlagPercentages[index] = {
      ...newFlagPercentages[index],
      [field]: field === 'percentage' ? parseFloat(value) || 0 : value,
    }
    setFlagPercentages(newFlagPercentages)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length === 0) return

    setLoading(true)
    try {
      const formData = new FormData()

      // Adicionar todos os arquivos
      files.forEach((file) => {
        formData.append('files', file)
      })

      // Converter array de flagPercentages para objeto agrupado por bandeira
      const flagPercentagesObject = flagPercentages.reduce(
        (acc, { bandeira, tipoTransacao, percentage }) => {
          if (bandeira && tipoTransacao && percentage > 0) {
            if (!acc[bandeira]) {
              acc[bandeira] = {}
            }
            acc[bandeira][tipoTransacao] = percentage
          }
          return acc
        },
        {} as Record<string, Record<string, number>>,
      )

      // Adicionar flag_percentages como um objeto JSON
      formData.append('flag_percentages', JSON.stringify(flagPercentagesObject))

      // Processar os arquivos
      let processResponse
      try {
        processResponse = await processApi.post('/process-excel/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log(
          'Processamento de Excel bem-sucedido:',
          processResponse.data,
        )
      } catch (processError) {
        console.error('Erro no processamento do Excel:', processError)
        throw new Error(
          'Falha no processamento da planilha. Verifique se os nomes das colunas estão corretos.',
        )
      }

      // Salvar os dados processados no backend principal
      try {
        const response = await api.post(
          `/establishments/${establishmentId}/audits`,
          {
            detailsData: processResponse.data.details,
            summaryData: processResponse.data.summary,
          },
        )

        console.log('Auditoria criada com sucesso:', response.data)

        if (onSuccess) {
          onSuccess(response.data.audit)
        }

        clearForm()
        onClose()

        // Redirecionar para a página de detalhes da auditoria
        router.push(`/audits/${response.data.audit.id}`)
      } catch (apiError) {
        console.error('Erro ao salvar auditoria na API:', apiError)
        throw new Error('Falha ao salvar a auditoria no sistema.')
      }
    } catch (error) {
      console.error('Erro ao criar auditoria:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao processar a auditoria.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    clearForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-zinc-200">
            {t('newAudit')}
          </h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="flex items-center gap-2 text-zinc-200 hover:text-title"
            >
              <span className="text-sm font-medium">
                {t('requiredColumns')}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isHelpOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isHelpOpen && (
              <div className="mt-4 space-y-4 text-sm text-zinc-300">
                <div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t('columnDataPagamento')}</li>
                    <li>{t('columnDataVenda')}</li>
                    <li>{t('columnNumeroEstabelecimento')}</li>
                    <li>{t('columnCodigoAutorizacao')}</li>
                    <li>{t('columnProduto')}</li>
                    <li>{t('columnTipoCartao')}</li>
                    <li>{t('columnBandeira')}</li>
                    <li>{t('columnStatusVenda')}</li>
                    <li>{t('columnValorBruto')}</li>
                    <li>{t('columnValorTaxa')}</li>
                    <li>{t('columnValorLiquido')}</li>
                    <li>{t('columnNumeroCartao')}</li>
                  </ul>
                  <p className="mt-4 text-yellow-400 font-medium">
                    {t('columnNamesWarning')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              {t('uploadFiles')} (.xlsx / .xls)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              multiple
              className="w-full p-2 bg-zinc-800 text-zinc-200 rounded border border-zinc-700"
            />
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-zinc-800 rounded"
                  >
                    <span className="text-sm text-zinc-200 truncate">
                      {file.name}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-zinc-400 hover:text-zinc-200 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-zinc-200">
                {t('flagPercentages')}
              </label>
              <button
                onClick={handleAddFlag}
                className="text-sm text-title hover:text-title/80"
              >
                {t('addFlag')}
              </button>
            </div>
            <div className="space-y-2">
              {flagPercentages.map((flag, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={flag.bandeira}
                    onChange={(e) =>
                      handleFlagChange(index, 'bandeira', e.target.value)
                    }
                    placeholder={t('flag')}
                    className="flex-1 p-2 bg-zinc-800 text-zinc-200 rounded border border-zinc-700"
                  />
                  <input
                    type="text"
                    value={flag.tipoTransacao}
                    onChange={(e) =>
                      handleFlagChange(index, 'tipoTransacao', e.target.value)
                    }
                    placeholder={t('tipoTransacao')}
                    className="flex-1 p-2 bg-zinc-800 text-zinc-200 rounded border border-zinc-700"
                  />
                  <input
                    type="number"
                    value={flag.percentage}
                    onChange={(e) =>
                      handleFlagChange(index, 'percentage', e.target.value)
                    }
                    placeholder={t('percentage')}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-24 p-2 bg-zinc-800 text-zinc-200 rounded border border-zinc-700"
                  />
                  <button
                    onClick={() => handleRemoveFlag(index)}
                    className="text-zinc-400 hover:text-zinc-200"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <ButtonGlobal
            params={{ title: t('cancel'), color: 'bg-zinc-800' }}
            onClick={handleClose}
          />
          <ButtonGlobal
            params={{ title: t('create'), color: 'bg-title' }}
            onClick={handleSubmit}
            disabled={files.length === 0 || loading}
          />
        </div>
      </div>
    </div>
  )
}
