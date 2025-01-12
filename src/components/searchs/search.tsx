import React, { useState } from 'react'

interface SearchProps {
  placeholder?: string
  searchQuery: string
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  searchQuery,
  onSearch,
}) => {
  const [query, setQuery] = useState(searchQuery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="bg-zinc-700 p-2 rounded-lg w-full"
      />
    </div>
  )
}

export default Search
