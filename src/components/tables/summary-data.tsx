'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { DetailsData, SummaryData } from '@/types/audit'
import ButtonGlobal from '../buttons/global'
import { jsPDF as JSPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import autoTable from 'jspdf-autotable'
import { DoughnutChart } from '../charts/doughnut-chart'
import { BarChart } from '../charts/bar-chart'
import { HorizontalBarChart } from '../charts/horizontal-bar-chart'
import html2canvas from 'html2canvas'
import { toast } from 'react-hot-toast'
import api from '@/lib/api'
import { usePathname } from 'next/navigation'

interface SummaryDataTableProps {
  data: SummaryData[]
  auditId?: string
}

export function SummaryDataTable({ data, auditId }: SummaryDataTableProps) {
  const t = useTranslations('TextLang')
  const pathname = usePathname()
  const isSummaryRoute = pathname.includes('/summary/')
  const doughnutChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const flagDropdownRef = useRef<HTMLDivElement>(null)
  const methodDropdownRef = useRef<HTMLDivElement>(null)

  // Estados para os filtros
  const [selectedFlags, setSelectedFlags] = useState<string[]>([])
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false)
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Garantir que data seja um array
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // Extrair anos únicos dos dados
  const years =
    safeData.length > 0
      ? Object.keys(safeData[0])
          .filter(
            (key) =>
              key !== 'brand' && key !== 'product' && key !== 'Total Geral',
          )
          .sort()
      : []

  // Extrair bandeiras e métodos únicos
  const uniqueFlags = useMemo(() => {
    const flags = new Set(safeData.map((row) => row.brand))
    return Array.from(flags).sort()
  }, [safeData])

  const uniqueMethods = useMemo(() => {
    const methods = new Set(safeData.map((row) => row.product))
    return Array.from(methods).sort()
  }, [safeData])

  // Filtrar dados
  const filteredData = useMemo(() => {
    return safeData.filter((row) => {
      const flagMatch =
        selectedFlags.length === 0 || selectedFlags.includes(row.brand)
      const methodMatch =
        selectedMethods.length === 0 || selectedMethods.includes(row.product)
      return flagMatch && methodMatch
    })
  }, [safeData, selectedFlags, selectedMethods])

  const formatValue = (value: string | undefined | null) => {
    if (!value) return '0,00'

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

  // Função para converter string formatada em número
  const parseValue = (value: string | undefined | null): number => {
    if (!value) return 0
    // Remove pontos e substitui vírgula por ponto para converter para número
    const cleanValue = value.toString().replace(/\./g, '').replace(',', '.')
    return parseFloat(cleanValue) || 0
  }

  // Função para calcular o total de uma linha
  const calculateRowTotal = (row: SummaryData): number => {
    return years.reduce((sum, year) => {
      return sum + parseValue(row[year])
    }, 0)
  }

  // Função para formatar número com vírgula
  const formatNumberBR = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleExportExcel = async () => {
    if (!data) return

    try {
      // Buscar todos os dados para exportação
      const response = await api.get(`/audits/${auditId}/details?allItems=true`)

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

  const handleExportPDF = async () => {
    const doc = new JSPDF()

    // Configurar o título
    doc.setFontSize(16)
    doc.text(t('summaryData'), 8, 15)

    // Capturar os gráficos como imagens
    const doughnutCanvas = await html2canvas(doughnutChartRef.current!)
    const barCanvas = await html2canvas(barChartRef.current!)

    // Adicionar os gráficos ao PDF
    const doughnutImgData = doughnutCanvas.toDataURL('image/png')
    const barImgData = barCanvas.toDataURL('image/png')

    // Adicionar o gráfico de pizza
    doc.addImage(doughnutImgData, 'PNG', 8, 25, 95, 48)

    // Adicionar o gráfico de barras
    doc.addImage(barImgData, 'PNG', 108, 25, 95, 48)

    // Preparar os dados para a tabela
    const tableData = [
      ...filteredData.map((row) => [
        row.brand,
        row.product,
        ...years.map((year) => formatValue(row[year])),
        formatNumberBR(calculateRowTotal(row)),
      ]),
      // Adiciona linha de total
      [
        t('total'),
        '-',
        ...years.map((year) =>
          formatNumberBR(
            filteredData.reduce((sum, row) => sum + parseValue(row[year]), 0),
          ),
        ),
        formatNumberBR(
          filteredData.reduce((sum, row) => sum + calculateRowTotal(row), 0),
        ),
      ],
    ]

    // Configurar as colunas
    const columns = [t('brand'), t('product'), ...years, t('totalGeneral')]

    // Adicionar a tabela ao PDF
    autoTable(doc, {
      head: [columns],
      body: tableData,
      startY: 80,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 41, 41],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      // Estilizar a última linha (totais)
      didParseCell: function (data) {
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.fontSize = 9
        }
      },
      margin: { top: 20, left: 10, right: 10 },
    })

    // Salvar o PDF
    doc.save(`summary-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const handleShareSummary = () => {
    if (!auditId) return

    const locale = window.location.pathname.split('/')[1]
    const summaryUrl = `${window.location.origin}/${locale}/summary/${auditId}`

    navigator.clipboard
      .writeText(summaryUrl)
      .then(() => {
        console.log('Link copiado:', summaryUrl)
        toast.success(t('summaryLinkCopied'))

        // Mostrar mensagem na tela
        setShowCopiedMessage(true)

        // Esconder a mensagem após 3 segundos
        setTimeout(() => {
          setShowCopiedMessage(false)
        }, 3000)
      })
      .catch((err) => {
        console.error('Erro ao copiar link:', err)
        toast.error('Erro ao copiar link')
      })
  }

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flagDropdownRef.current &&
        !flagDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlagDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Adicionar useEffect para o dropdown de métodos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        methodDropdownRef.current &&
        !methodDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMethodDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="p-8">
      {showCopiedMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
          {t('summaryLinkCopied')}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-zinc-200 w-full">
          {t('summaryData')} <span className="text-title">#{auditId}</span>
        </h1>

        <div className="flex gap-4 justify-end w-full">
          {/* Filtro de bandeiras com seleção múltipla */}
          <div className="relative" ref={flagDropdownRef}>
            <button
              onClick={() => setIsFlagDropdownOpen(!isFlagDropdownOpen)}
              className="bg-zinc-800 text-zinc-200 text-sm rounded-lg p-2 border border-zinc-700 flex items-center justify-between min-w-[150px]"
            >
              <span>
                {selectedFlags.length === 0
                  ? t('allFlags')
                  : selectedFlags.length === 1
                    ? selectedFlags[0]
                    : `${selectedFlags.length} ${t('flags')}`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isFlagDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isFlagDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedFlags.length === 0}
                      onChange={() => setSelectedFlags([])}
                      className="custom-checkbox"
                    />
                    <span className="checkbox-label">{t('allFlags')}</span>
                  </div>
                  {uniqueFlags.map((flag) => (
                    <div key={flag} className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedFlags.includes(flag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFlags([...selectedFlags, flag])
                          } else {
                            setSelectedFlags(
                              selectedFlags.filter((f) => f !== flag),
                            )
                          }
                        }}
                        className="custom-checkbox"
                      />
                      <span className="checkbox-label">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={methodDropdownRef}>
            <button
              onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
              className="bg-zinc-800 text-zinc-200 text-sm rounded-lg p-2 border border-zinc-700 flex items-center justify-between min-w-[150px]"
            >
              <span>
                {selectedMethods.length === 0
                  ? t('allMethods')
                  : selectedMethods.length === 1
                    ? selectedMethods[0]
                    : `${selectedMethods.length} ${t('methods')}`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isMethodDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isMethodDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedMethods.length === 0}
                      onChange={() => setSelectedMethods([])}
                      className="custom-checkbox"
                    />
                    <span className="checkbox-label">{t('allMethods')}</span>
                  </div>
                  {uniqueMethods.map((method) => (
                    <div key={method} className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedMethods.includes(method)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMethods([...selectedMethods, method])
                          } else {
                            setSelectedMethods(
                              selectedMethods.filter((m) => m !== method),
                            )
                          }
                        }}
                        className="custom-checkbox"
                      />
                      <span className="checkbox-label">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative dropdown-container">
              <ButtonGlobal
                params={{
                  title: t('share'),
                  color: 'bg-title',
                  // icon: (
                  //   <Image
                  //     src="/images/svg/share.svg"
                  //     alt="share"
                  //     width={20}
                  //     height={20}
                  //   />
                  // ),
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 border border-zinc-700 z-10">
                  <div className="">
                    <button
                      onClick={handleShareSummary}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                    >
                      {t('shareSummary')}
                    </button>
                    <button
                      onClick={handleExportPDF}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                    >
                      {t('exportPDF')}
                    </button>
                    {!isSummaryRoute && (
                      <button
                        onClick={handleExportExcel}
                        className="w-full text-left px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                      >
                        {t('exportExcel')}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-zinc-800 p-4 rounded-lg" ref={doughnutChartRef}>
          <h3 className="text-zinc-200 text-sm font-medium mb-2">
            Distribuição por Bandeira
          </h3>
          <DoughnutChart
            data={{
              labels: uniqueFlags,
              values: uniqueFlags.map((flag) =>
                filteredData
                  .filter((row) => row.brand === flag)
                  .reduce((sum, row) => sum + calculateRowTotal(row), 0),
              ),
            }}
          />
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg" ref={barChartRef}>
          <h3 className="text-zinc-200 text-sm font-medium mb-2">
            Valores por Ano
          </h3>
          <BarChart
            data={{
              labels: years,
              values: years.map((year) =>
                filteredData.reduce(
                  (sum, row) => sum + parseValue(row[year]),
                  0,
                ),
              ),
            }}
          />
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-zinc-200 text-sm font-medium mb-2">
            Valores por Produto
          </h3>
          <HorizontalBarChart
            data={{
              labels: uniqueMethods,
              values: uniqueMethods.map((method) =>
                filteredData
                  .filter((row) => row.product === method)
                  .reduce((sum, row) => sum + calculateRowTotal(row), 0),
              ),
            }}
          />
        </div>
      </div>

      <section className="h-auto w-full antialiased text-textPrimary bg-zinc-800 rounded-lg">
        <div className="custom-scroll max-h-[31rem]">
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="uppercase border-b border-zinc-500">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('brand')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('product')}
                </th>
                {years.map((year) => (
                  <th
                    key={year}
                    className="px-4 py-2 text-left text-xs font-medium"
                  >
                    {year}
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('totalGeneral')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={`${row.brand}-${row.product}-${index}`}
                  className={`${
                    index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'
                  }`}
                >
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.brand}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.product}
                  </td>
                  {years.map((year) => (
                    <td
                      key={`${row.brand}-${row.product}-${year}`}
                      className="px-4 py-2 text-left text-xs font-medium"
                    >
                      {formatValue(row[year])}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {formatNumberBR(calculateRowTotal(row))}
                  </td>
                </tr>
              ))}
              {/* Linha de total */}
              <tr className="font-bold">
                <td className="px-4 py-2 text-left text-sm font-bold">
                  {t('total')}
                </td>
                <td className="px-4 py-2 text-left text-xs font-medium">-</td>
                {years.map((year) => (
                  <td
                    key={year}
                    className="px-4 py-2 text-left text-xs font-bold"
                  >
                    {formatNumberBR(
                      filteredData.reduce(
                        (sum, row) => sum + parseValue(row[year]),
                        0,
                      ),
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 text-left text-sm font-bold">
                  {formatNumberBR(
                    filteredData.reduce(
                      (sum, row) => sum + calculateRowTotal(row),
                      0,
                    ),
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
