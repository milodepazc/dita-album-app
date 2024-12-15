import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => (
  <div className="mb-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search albums..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  </div>
);

export default SearchBar;
