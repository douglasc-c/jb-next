interface InputFieldProps {
  label: string
  value: string
  isEditing: boolean
  onChange: (value: string) => void
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-300 mb-1">{label}</label>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-md bg-zinc-700 text-white border border-zinc-500"
      />
    ) : (
      <p className="px-4 py-2 rounded-md bg-zinc-900 text-gray-300">
        {value || '-'}
      </p>
    )}
  </div>
)
