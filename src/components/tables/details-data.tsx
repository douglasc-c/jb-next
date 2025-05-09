import { useTranslations } from 'next-intl'
import { PaginatedDetailsData, DetailsData } from '@/types/audit'
import ButtonGlobal from '../buttons/global'
import * as XLSX from 'xlsx'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import { Loading } from '../loading/loading'
import axios from 'axios'

interface DetailsDataTableProps {
  auditId: string
}

export function DetailsDataTable({ auditId }: DetailsDataTableProps) {
  const t = useTranslations('TextLang')
  const [data, setData] = useState<PaginatedDetailsData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      try {
        console.log('Fetching details with params:', {
          auditId,
          page: currentPage,
          limit: currentPageSize,
        })

        const response = await api.get(`/audits/${auditId}/details`, {
          params: {
            page: currentPage,
            limit: currentPageSize,
          },
        })

        console.log('Response:', response.data)

        const formattedData: PaginatedDetailsData = {
          data: response.data.detailsData,
          totalPages: response.data.pagination.totalPages,
          currentPage: response.data.pagination.page,
          totalItems: response.data.pagination.total,
          auditId,
          pageSize: response.data.pagination.limit,
        }

        setData(formattedData)
      } catch (error) {
        console.error('Error fetching details:', error)
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || 'Erro ao carregar detalhes')
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoading(false)
      }
    }

    if (auditId) {
      fetchDetails()
    }
  }, [auditId, currentPage, currentPageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize)
    setCurrentPage(1)
  }

  const formatValue = (value: string) => {
    // Remove os pontos de separador de milhar
    const cleanValue = value.replace(/\./g, '')
    // Substitui a vírgula por ponto para conversão
    const numericValue = cleanValue.replace(',', '.')
    const number = Number(numericValue)
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleExportExcel = async () => {
    if (!data) return

    try {
      // Buscar todos os dados para exportação
      const response = await api.get(
        `/audits/${data.auditId}/details?allItems=true`,
      )

      const allData = response.data.detailsData

      if (!allData || !Array.isArray(allData)) return

      // Preparar os dados para o Excel
      const excelData = allData.map((row: DetailsData) => ({
        [t('establishmentCode')]: row.cod_estabelecimento,
        [t('acquirer')]: row.credenciadora,
        [t('saleDate')]: row.data_venda,
        [t('status')]: row.status_venda,
        [t('nsu')]: row.nsu,
        [t('flag')]: row.bandeira,
        [t('paymentMethod')]: row.modalidade_pagamento,
        [t('product')]: row.produto,
        [t('saleValue')]: formatValue(row.valor_venda),
        [t('taxValue')]: formatValue(row.valor_taxa),
        [t('netValue')]: formatValue(row.valor_liquido),
        [t('referencedTax')]: row.taxa_referenciada + '%',
        [t('cardNumber')]: row.numero_cartao,
        [t('receiptDate')]: row.data_recebimento,
        [t('auditedTax')]: row.taxa_auditada + '%',
        [t('auditedTaxValue')]: formatValue(row.valor_taxa_auditada),
        [t('differenceToReceive')]: formatValue(row.diferenca_receber),
      }))

      // Criar workbook e worksheet
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(excelData)

      // Ajustar largura das colunas
      const colWidths = Object.keys(excelData[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...excelData.map(
            (row: Record<string, string>) => String(row[key]).length,
          ),
        ),
      }))
      ws['!cols'] = colWidths

      // Adicionar worksheet ao workbook
      XLSX.utils.book_append_sheet(wb, ws, t('detailsData'))

      // Salvar o arquivo
      XLSX.writeFile(
        wb,
        `details-${new Date().toISOString().split('T')[0]}.xlsx`,
      )
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
    }
  }

  const renderPagination = () => {
    if (!data || data.totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(data.totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-title text-primary'
              : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
          }`}
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-zinc-400">{t('itemsPerPage')}:</span>
          <select
            value={currentPageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="bg-zinc-800 text-zinc-200 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            {/* <option value={data.totalItems}>{t('all')}</option> */}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
            }`}
          >
            {t('previous')}
          </button>
          {pages}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === data.totalPages
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
            }`}
          >
            {t('next')}
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loading loading={loading} width={100} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!data || !data.data) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-zinc-400">{t('noData')}</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-200">
          {t('detailsData')}
        </h2>
        <div className="flex">
          <ButtonGlobal
            params={{ title: t('export'), color: 'bg-title' }}
            onClick={handleExportExcel}
          />
        </div>
      </div>
      <section className="h-auto w-full antialiased text-textPrimary rounded-md">
        <div className="custom-scroll max-h-[31rem] overflow-x-auto">
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="uppercase border-b border-zinc-500">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('establishmentCode')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('acquirer')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('saleDate')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('status')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('nsu')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('flag')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('paymentMethod')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('product')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('saleValue')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('taxValue')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('netValue')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('referencedTax')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('cardNumber')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('receiptDate')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('auditedTax')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('auditedTaxValue')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('differenceToReceive')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-zinc-800'}`}
                >
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.cod_estabelecimento}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.credenciadora}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.data_venda}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.status_venda}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.nsu}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.bandeira}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.modalidade_pagamento}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.produto}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatValue(row.valor_venda)}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatValue(row.valor_taxa)}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatValue(row.valor_liquido)}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.taxa_referenciada}%
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.numero_cartao}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.data_recebimento}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.taxa_auditada}%
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatValue(row.valor_taxa_auditada)}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatValue(row.diferenca_receber)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </section>
    </div>
  )
}
