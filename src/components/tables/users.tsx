'use client'

import { useLayoutAdminContext } from '@/context/layout-admin-context'

interface RowData {
  firstName: string
  lastName: string
  complianceStatus: string
  role: string
}

interface MyContractsProps {
  data: RowData[]
}

export function UsersTable({ data }: MyContractsProps) {
  const { texts } = useLayoutAdminContext()

  const getComplianceText = (status: string) => {
    switch (status) {
      case 'PENDING_ADDRESS':
        return texts.pendingAddress
      case 'PENDING_DOCUMENTS':
        return texts.pendingDocuments
      case 'UNDER_REVIEW':
        return texts.underReview
      case 'APPROVED':
        return texts.validated
      default:
        return texts.unknownStatus
    }
  }

  return (
    <section
      className={`flex flex-col p-4 h-auto justify-around w-full text-center`}
    >
      <div className="grid grid-cols-4 gap-2 w-full uppercase text-sm font-medium items-center">
        <h3 className="">{texts.type}</h3>
        <h3 className="">{texts.name}</h3>
        <h3 className="">{texts.compliance}</h3>
        <h3 className="">{texts.seeMore}</h3>
      </div>
      <span className="border border-zinc-500 my-2" />
      {data.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-2 w-full font-normal py-3 items-center border-b border-zinc-500"
        >
          <p className="">{row.role}</p>
          <p className="">
            {row.firstName} {row.lastName}
          </p>
          <div
            className={`border rounded-full border-primary py-0.5 ${
              row.complianceStatus === 'Validado'
                ? 'bg-primary text-zinc-700'
                : 'bg-transparent'
            }`}
          >
            <p>{getComplianceText(row.complianceStatus)}</p>
          </div>
          <button
            className={`border rounded-full border-primary text-primary py-1 bg-transparent`}
          >
            {texts.seeMore}
          </button>
        </div>
      ))}
    </section>
  )
}
