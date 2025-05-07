import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Action {
  id: string
  userId: string
  action: string
  entity: string
  entityId: string
  ip: string
  metadata: string
  created_at: string
}

interface UserActionsProps {
  actions: Action[]
}

export function UserActions({ actions = [] }: UserActionsProps) {
  const t = useTranslations('TextLang')

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    })
  }

  const formatMetadata = (metadata: string) => {
    try {
      const parsed = JSON.parse(metadata)
      return `${parsed.method} ${parsed.url} (${parsed.statusCode})`
    } catch {
      return metadata
    }
  }

  if (!actions || actions.length === 0) {
    return (
      <div className="w-full p-4 text-center text-zinc-400">
        {t('noActions')}
      </div>
    )
  }

  return (
    <div className="custom-scroll max-h-[25rem] overflow-x-auto text-textPrimary">
      <table className="table-auto w-full border-collapse text-sm">
        <thead className="uppercase border-b border-zinc-500">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium">
              {t('action')}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium">
              {t('entity')}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium">
              {t('ip')}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium">
              {t('metadata')}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium">
              {t('date')}
            </th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, index) => (
            <tr
              key={action.id}
              className={`${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'}`}
            >
              <td className="px-4 py-2 text-left text-xs font-medium">
                {action.action}
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium">
                {action.entity}
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium">
                {action.ip}
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium">
                {formatMetadata(action.metadata)}
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium">
                {formatDate(action.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
