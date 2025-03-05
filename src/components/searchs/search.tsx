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
    <div className="flex items-center antialiased">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="bg-primary border antialiased border-border  px-6 py-2 text-[0.90rem] rounded-lg w-full focus:outline-none"
      />
    </div>
  )
}

export default Search
