import { useTranslations } from 'next-intl'
import { SummaryData } from '@/types/audit'
import ButtonGlobal from '../buttons/global'
import { jsPDF as JSPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

interface SummaryDataTableProps {
  data: SummaryData[]
}

export function SummaryDataTable({ data }: SummaryDataTableProps) {
  const t = useTranslations('TextLang')

  // Garantir que data seja um array
  const safeData = Array.isArray(data) ? data : []

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

  const handleExportPDF = () => {
    const doc = new JSPDF()

    // Configurar o título
    doc.setFontSize(16)
    doc.text(t('summaryData'), 14, 15)

    // Preparar os dados para a tabela
    const tableData = safeData.map((row) => {
      const rowData = [
        row.flag,
        row.method,
        ...years.map((year) => formatValue(row[year])),
        formatValue(row['Total Geral']),
      ]
      return rowData
    })

    // Configurar as colunas
    const columns = [t('flag'), t('method'), ...years, t('totalGeneral')]

    // Adicionar a tabela ao PDF
    autoTable(doc, {
      head: [columns],
      body: tableData,
      startY: 20,
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
      margin: { top: 20, left: 10, right: 10 },
    })

    // Salvar o PDF
    doc.save(`summary-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="bg-primary p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-200">
          {t('summaryData')}
        </h2>
        <div className="flex">
          <ButtonGlobal
            params={{ title: t('export'), color: 'bg-title' }}
            onClick={handleExportPDF}
          />
        </div>
      </div>
      <section className="h-auto w-full antialiased text-textPrimary rounded-md">
        <div className="custom-scroll max-h-[40rem]">
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
              {safeData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    row.flag === 'Total'
                      ? 'bg-gray-100 font-bold'
                      : index % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-zinc-800'
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
                      className="px-4 py-2 text-left text-xs font-medium"
                    >
                      {formatValue(row[year])}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-left text-xs font-mediu">
                    {formatValue(row['Total Geral'])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
