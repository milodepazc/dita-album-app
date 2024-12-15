import React from 'react';

interface GenreFilterProps {
  availableGenres: string[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  availableGenres,
  selectedGenre,
  setSelectedGenre,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="genre" className="form-label">
        Filter by Genre
      </label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="form-select"
      >
        <option value="">All Genres</option>
        {availableGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
