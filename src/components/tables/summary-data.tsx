'use client'

import { useTranslations } from 'next-intl'
import { SummaryData } from '@/types/audit'
import ButtonGlobal from '../buttons/global'
import { jsPDF as JSPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useState, useMemo, useRef } from 'react'
import { DoughnutChart } from '../charts/doughnut-chart'
import { BarChart } from '../charts/bar-chart'
import { HorizontalBarChart } from '../charts/horizontal-bar-chart'
import html2canvas from 'html2canvas'
// import { usePathname } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface SummaryDataTableProps {
  data: SummaryData[]
  auditId?: string
}

export function SummaryDataTable({ data, auditId }: SummaryDataTableProps) {
  const t = useTranslations('TextLang')
  // const pathname = usePathname()
  const doughnutChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)

  // Estados para os filtros
  const [selectedFlag, setSelectedFlag] = useState<string>('')
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')

  // Garantir que data seja um array
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // Extrair anos únicos dos dados
  const years =
    safeData.length > 0
      ? Object.keys(safeData[0])
          .filter(
            (key) =>
              key !== 'flag' && key !== 'method' && key !== 'Total Geral',
          )
          .sort()
      : []

  // Extrair bandeiras e métodos únicos
  const uniqueFlags = useMemo(() => {
    const flags = new Set(safeData.map((row) => row.flag))
    return Array.from(flags).sort()
  }, [safeData])

  const uniqueMethods = useMemo(() => {
    const methods = new Set(safeData.map((row) => row.method))
    return Array.from(methods).sort()
  }, [safeData])

  // Filtrar dados
  const filteredData = useMemo(() => {
    return safeData.filter((row) => {
      const flagMatch = !selectedFlag || row.flag === selectedFlag
      const methodMatch = !selectedMethod || row.method === selectedMethod
      return flagMatch && methodMatch
    })
  }, [safeData, selectedFlag, selectedMethod])

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
        row.flag,
        row.method,
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
    const columns = [t('flag'), t('method'), ...years, t('totalGeneral')]

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
    navigator.clipboard.writeText(summaryUrl)
    toast.success(t('summaryLinkCopied'))
  }

  return (
    <div className="bg-primary p-4 rounded-b-lg rounded-r-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-zinc-200">
          {t('summaryData')}
        </h2>
        <div className="flex gap-4 w-2/3 justify-end ">
          {/* Filtros */}
          <select
            value={selectedFlag}
            onChange={(e) => setSelectedFlag(e.target.value)}
            className="bg-zinc-800 text-zinc-200 text-sm rounded-lg p-2 border border-zinc-700"
          >
            <option value="">{t('allFlags')}</option>
            {uniqueFlags.map((flag) => (
              <option key={flag} value={flag}>
                {flag}
              </option>
            ))}
          </select>

          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="bg-zinc-800 text-zinc-200 text-sm rounded-lg p-2 border border-zinc-700"
          >
            <option value="">{t('allMethods')}</option>
            {uniqueMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-zinc-800 text-zinc-200 text-sm rounded-lg p-2 border border-zinc-700"
          >
            <option value="">{t('allYears')}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {auditId && (
            <ButtonGlobal
              params={{
                title: t('shareSummary'),
                color: 'bg-title',
                width: 'max-w-[6rem]',
              }}
              onClick={handleShareSummary}
            />
          )}

          <ButtonGlobal
            params={{
              title: t('export'),
              color: 'bg-title',
              width: 'max-w-[6rem]',
            }}
            onClick={handleExportPDF}
          />
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
                  .filter((row) => row.flag === flag)
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
                  .filter((row) => row.method === method)
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
                  {t('flag')}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  {t('method')}
                </th>
                {years.map((year) => (
                  <th
                    key={year}
                    className={`px-4 py-2 text-left text-xs font-medium ${
                      selectedYear && selectedYear !== year ? 'opacity-50' : ''
                    }`}
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
                  key={index}
                  className={`${
                    row.flag === 'Total'
                      ? 'bg-gray-100 font-bold'
                      : index % 2 === 1
                        ? 'bg-gray-50'
                        : 'bg-zinc-900'
                  }`}
                >
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.flag}
                  </td>
                  <td className="px-4 py-2 text-left text-xs font-medium">
                    {row.method}
                  </td>
                  {years.map((year) => (
                    <td
                      key={year}
                      className={`px-4 py-2 text-left text-xs font-medium ${
                        selectedYear && selectedYear !== year
                          ? 'opacity-50'
                          : ''
                      }`}
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
              <tr className="bg-gray-100 font-bold">
                <td className="px-4 py-2 text-left text-sm font-bold">
                  {t('total')}
                </td>
                <td className="px-4 py-2 text-left text-xs font-medium">-</td>
                {years.map((year) => (
                  <td
                    key={year}
                    className={`px-4 py-2 text-left text-xs font-bold ${
                      selectedYear && selectedYear !== year ? 'opacity-50' : ''
                    }`}
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
