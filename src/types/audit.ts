export interface SummaryData {
  flag: string
  method: string
  [key: string]: string
}

export interface DetailsData {
  cod_estabelecimento: string
  credenciadora: string
  data_venda: string
  status_venda: string
  nsu: string
  bandeira: string
  modalidade_pagamento: string
  produto: string
  valor_venda: string
  valor_taxa: string
  valor_liquido: string
  taxa_referenciada: string
  numero_cartao: string
  data_recebimento: string
  taxa_auditada: string
  valor_taxa_auditada: string
  diferenca_receber: string
}

export interface PaginatedDetailsData {
  data: DetailsData[]
  totalPages: number
  currentPage: number
  totalItems: number
  auditId: string
  pageSize: number
}

export interface Audit {
  id: number
  exported: boolean
  createdAt: string
  updatedAt: string
  summaryData?: SummaryData[]
  detailsData?: DetailsData[]
}
