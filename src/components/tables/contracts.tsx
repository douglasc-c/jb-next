import { useLayoutAdminContext } from '@/context/admin-context'
import { useAuthContext } from '@/context/auth-context'
import api from '@/lib/api'
import axios from 'axios'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'

interface Signature {
  signedAt: string | null
  user: {
    email: string
    firstName: string
    lastName: string
    userName: string
  }
}

interface Contract {
  adminSigningUrl: string
  clientSigningUrl: string
  id: string
  signatures: Signature[]
}

interface Enterprise {
  contracts: Contract[]
  name: string
  id: number
}

interface ContractsListProps {
  companies: Enterprise[]
}

export default function ContractsList({ companies }: ContractsListProps) {
  const { texts } = useLayoutAdminContext()
  const { authData } = useAuthContext()
  const [isSigning, setIsSigning] = useState(false)
  const [error, setError] = useState('')

  const handleSignContract = async (companyId: number) => {
    setIsSigning(true)
    try {
      const response = await api.post(
        `/admin/contract/send-signature/${companyId}`,
      )
      if (response.status === 200) {
        const linkAdmin = response.data.adminSigningUrl
        if (linkAdmin) {
          window.open(linkAdmin, '_blank', 'noopener,noreferrer')
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <div className="p-4">
      {companies.map((company) => (
        <div key={company.id} className="p-4 bg-zinc-200 rounded-lg">
          <h2 className="md:text-lgbase font-medium">{company.name}</h2>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="custom-scroll">
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="uppercase border-b border-zinc-500 bg-zinc-300">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium">
                    {texts.user}
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium">
                    {texts.contract}
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium">
                    {texts.signedIn}
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium">
                    {texts.shares}
                  </th>
                </tr>
              </thead>
              <tbody>
                {company.contracts.flatMap((contract) =>
                  contract.signatures.map((signature, index, array) => (
                    <tr
                      key={`${contract.id}-${signature.user.email}`}
                      className={
                        index !== array.length - 1
                          ? 'border-b border-zinc-400'
                          : ''
                      }
                    >
                      <td className="border p-2 text-xs">
                        {signature.user.firstName}
                      </td>
                      <td className="border p-2 text-center text-xs">
                        {contract.id}
                      </td>
                      <td className="border p-2 text-center text-xs">
                        {signature.signedAt ? signature.signedAt : 'Pendente'}
                      </td>
                      <td className="border p-2 text-center">
                        {!signature.signedAt &&
                          (authData?.user.email === signature.user.email ? (
                            <button
                              onClick={() => handleSignContract(company.id)}
                              disabled={isSigning}
                              className="px-4 py-2 bg-primary text-xs text-white rounded transition"
                            >
                              {isSigning ? (
                                <PulseLoader color="#fff" size={6} />
                              ) : (
                                texts.signalContract
                              )}
                            </button>
                          ) : authData?.user.role === 'admin' ? (
                            <button
                              onClick={() => handleSignContract(company.id)}
                              disabled={isSigning}
                              className="px-4 py-2 bg-secondary text-xs text-white rounded transition"
                            >
                              {isSigning ? (
                                <PulseLoader color="#fff" size={6} />
                              ) : (
                                texts.generateSignature
                              )}
                            </button>
                          ) : null)}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
