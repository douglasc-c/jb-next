'use client'

interface User {
  id: number
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
  birthDate: string
  userType: string
  numberDocument: string
  phone: string
  documentType: string | null
  documentFront: string | null
  documentBack: string | null
  proofOfAddress: string | null
  incomeTaxProof: string | null
  mustChangePassword: boolean
  tokenVersion: number
  role: string
  isApproved: boolean
  complianceStatus: string
  twoFA: string | null
  isActive: boolean
  walletBalance: number
  totalInvested: number
  totalValuation: number
  emailVerified: boolean
  emailConfirmationCode: string | null
  emailConfirmationExpires: string | null
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
  user: User
}

interface InterestedDetailsProps {
  interests: ContractInterest[]
  onClose: () => void
}

export function InterestedDetails({
  interests,
  onClose,
}: InterestedDetailsProps) {
  const handleApprove = (interestId: string) => {
    console.log(`Aprovar interessado com ID: ${interestId}`)
    // Adicione a lógica para aprovar o interessado, como uma chamada à API
  }

  const handleReject = (interestId: string) => {
    console.log(`Rejeitar interessado com ID: ${interestId}`)
    // Adicione a lógica para rejeitar o interessado, como uma chamada à API
  }
  console.log(interests)
  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h2 className="uppercase font-medium">Interessados</h2>
        <button onClick={onClose}>
          <h2 className="uppercase">x</h2>
        </button>
      </div>
      <ul className="space-y-4">
        {interests.map((interest) => (
          <li key={interest.interestId} className="flex border-b pb-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 items-center w-2/3">
              <p className="">
                <span>Usuário:</span> {interest.user.firstName}{' '}
                {interest.user.lastName}
              </p>
              <button
                onClick={() => handleApprove(interest.interestId)}
                className="py-1 border text-white rounded hover:bg-green-600 transition-colors"
              >
                Detalhes
              </button>

              <p>
                <span>Data de Interesse:</span>{' '}
                {new Date(interest.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span>Status:</span> {interest.status}
              </p>
            </div>
            <div className="flex space-x-2 mt-2 w-1/3 items-center justify-end">
              <button
                onClick={() => handleApprove(interest.interestId)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Aprovar
              </button>
              <button
                onClick={() => handleReject(interest.interestId)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Rejeitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
