interface InputFieldProps {
  label: string
  value: string
  type?: string
  isEditing: boolean
  onChange: (value: string) => void
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type,
  isEditing,
  onChange,
}) => {
  // Formata o valor apenas para exibição, se for do tipo 'date'
  const formattedValue =
    type === 'date' && value
      ? new Date(value).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : value

  return (
    <div className="flex flex-col">
      <label className="text-gray-300 mb-1">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
        />
      ) : (
        <p className="px-4 py-2 rounded-md bg-zinc-800 text-gray-300">
          {formattedValue || '-'}
        </p>
      )}
    </div>
  )
}
