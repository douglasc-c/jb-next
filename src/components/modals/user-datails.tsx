import React from 'react'

interface UserData {
  firstName: string
  lastName: string
  complianceStatus: string
  email: string
  phone: string
  role: string
  birthDate: string
  createdAt: string
  totalInvested: number
  totalValuation: number
  username: string
  walletBalance: number
  numberDocument: string
  id: string
  userType: string
}

interface UserDetailsModalProps {
  user: UserData
  isOpen: boolean
  onClose: () => void
}

export const UserDetails: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null
  console.log(user)

  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-medium">User Details</h3>
        <button onClick={onClose} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone:</strong> {user.phone}
        </div>
        <div>
          <strong>Birthdate:</strong>{' '}
          {new Date(user.birthDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Document Number:</strong> {user.numberDocument}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
        <div>
          <strong>User ID:</strong> {user.id}
        </div>
        <div>
          <strong>Role:</strong> {user.role}
        </div>
        <div>
          <strong>User Type:</strong> {user.userType}
        </div>
        <div>
          <strong>Compliance Status:</strong> {user.complianceStatus}
        </div>
        <div>
          <strong>Total Invested:</strong> {user.totalInvested}
        </div>
        <div>
          <strong>Wallet Balance:</strong> {user.walletBalance}
        </div>
        <div>
          <strong>Total Available:</strong> {user.totalValuation}
        </div>
        <div>
          <strong>Account Created At:</strong>{' '}
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
