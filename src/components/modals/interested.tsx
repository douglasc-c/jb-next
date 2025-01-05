'use client'

import { useLayoutAdminContext } from '@/context/layout-admin-context'

interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  createdAt: string
}

interface ContractInterest {
  interestId: string
  createdAt: string
  status: string
  user: User
}

interface InterestedDetailsProps {
  interests: ContractInterest[]
  onClick: (interestId: string, status: string) => void
  onClose: () => void
  updating: string | null
}

export function InterestedDetails({
  interests,
  onClick,
  onClose,
  updating,
}: InterestedDetailsProps) {
  const { texts } = useLayoutAdminContext()

  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h2 className="uppercase font-medium text-zinc-300">
          {texts.interested}
        </h2>
        <button onClick={onClose}>
          <h2 className="uppercase">x</h2>
        </button>
      </div>
      <ul className="space-y-4">
        {interests.map((interest) => (
          <li key={interest.interestId} className="flex border-b pb-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 items-center w-2/3 text-sm text-zinc-300">
              <p>
                <span className="font-medium text-zinc-200">{texts.user}:</span>{' '}
                {interest.user.firstName} {interest.user.lastName}
              </p>
              <p>{interest.user.email}</p>
              <p>
                <span className="font-medium text-zinc-200">
                  {texts.interestDate}:
                </span>{' '}
                {new Date(interest.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-zinc-200">
                  {texts.status}:
                </span>{' '}
                {interest.status}
              </p>
            </div>
            <div className="flex flex-col space-y-2 w-1/3 items-center justify-end text-sm">
              <div className="flex items-center">
                <button
                  // onClick={() => handleDetails(interest.interestId)}
                  className="py-1 px-14 border border-primary text-primary rounded-full hover:bg-primary hover:text-zinc-600 transition-colors"
                >
                  {texts.details}
                </button>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => onClick(interest.interestId, 'APPROVED')}
                  className="px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  disabled={updating === interest.interestId}
                >
                  {updating === interest.interestId
                    ? 'Aprovando...'
                    : 'Aprovar'}
                </button>
                <button
                  onClick={() => onClick(interest.interestId, 'REJECTED')}
                  className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  disabled={updating === interest.interestId}
                >
                  {updating === interest.interestId
                    ? 'Rejeitando...'
                    : 'Rejeitar'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
