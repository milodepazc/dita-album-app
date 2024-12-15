import React from 'react';
import FilterControls from './FilterControls';
import { Offcanvas } from 'react-bootstrap';
import SearchFilter from './SearchFilter';

interface FilterSectionProps {
  availableGenres: string[];
  availableArtists: string[];
  searchQuery: string;
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
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  availableGenres,
  availableArtists,
  searchQuery,
  selectedGenre,
  selectedArtist,
  selectedMinYear,
  selectedMaxYear,
  minYear,
  maxYear,
  onGenreChange,
  onArtistChange,
  onYearRangeChange,
  setSearchQuery,
  showFilters,
  setShowFilters,
}) => {
  const renderDesktopFilters = () => (
    <div
      className="d-none d-md-block"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      data-testid="desktop-filter-section"
    >
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        data-testid="desktop-search-filter"
      />
      <FilterControls
        availableGenres={availableGenres}
        availableArtists={availableArtists}
        selectedGenre={selectedGenre}
        selectedArtist={selectedArtist}
        selectedMinYear={selectedMinYear}
        selectedMaxYear={selectedMaxYear}
        minYear={minYear}
        maxYear={maxYear}
        onGenreChange={onGenreChange}
        onArtistChange={onArtistChange}
        onYearRangeChange={onYearRangeChange}
        data-testid="desktop-filter-controls"
      />
    </div>
  );

  const renderMobileFilters = () => (
    <div className="d-md-none text-center" data-testid="mobile-filter-section">
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title data-testid="mobile-filter-title">
            Filters
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            data-testid="mobile-search-filter"
          />
          <FilterControls
            availableGenres={availableGenres}
            availableArtists={availableArtists}
            selectedGenre={selectedGenre}
            selectedArtist={selectedArtist}
            selectedMinYear={selectedMinYear}
            selectedMaxYear={selectedMaxYear}
            minYear={minYear}
            maxYear={maxYear}
            onGenreChange={onGenreChange}
            onArtistChange={onArtistChange}
            onYearRangeChange={onYearRangeChange}
            data-testid="mobile-filter-controls"
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );

  return (
    <>
      {renderDesktopFilters()}
      {renderMobileFilters()}
    </>
  );
};

export default FilterSection;
