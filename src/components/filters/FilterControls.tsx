import React from 'react';
import YearRangeFilter from './YearRangeFilter';

interface FilterControlsProps {
  availableGenres: string[];
  availableArtists: string[];
  selectedGenre: string;
  selectedArtist: string;
  selectedMinYear: number | null;
  selectedMaxYear: number | null;
  minYear: number;
  maxYear: number;
  onGenreChange: (genre: string) => void;
  onArtistChange: (artist: string) => void;
  onYearRangeChange: (range: {
    minYear: number | null;
    maxYear: number | null;
  }) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  availableGenres,
  availableArtists,
  selectedGenre,
  selectedArtist,
  selectedMinYear,
  selectedMaxYear,
  minYear,
  maxYear,
  onGenreChange,
  onArtistChange,
  onYearRangeChange,
}) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="artist-filter" className="form-label">
          Artist
        </label>
        <select
          id="artist-filter"
          className="form-select"
          value={selectedArtist}
          onChange={(e) => onArtistChange(e.target.value)}
        >
          <option value="">All Artists</option>
          {availableArtists.map((artist, index) => (
            <option key={index} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="genre-filter" className="form-label">
          Genre
        </label>
        <select
          id="genre-filter"
          className="form-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {availableGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="year-range" className="form-label">
          Year Range
        </label>
        <YearRangeFilter
          selectedMinYear={selectedMinYear}
          selectedMaxYear={selectedMaxYear}
          minYear={minYear}
          maxYear={maxYear}
          onYearRangeChange={onYearRangeChange}
        />
      </div>
    </div>
  );
};

export default FilterControls;
