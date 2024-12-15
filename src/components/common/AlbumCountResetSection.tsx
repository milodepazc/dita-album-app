import React from 'react';

interface AlbumCountResetSectionProps {
  totalAlbums: number;
  filteredAlbumsCount: number;
  isFilterActive: boolean;
  handleResetFilters: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
}

const AlbumCountResetSection: React.FC<AlbumCountResetSectionProps> = ({
  totalAlbums,
  filteredAlbumsCount,
  isFilterActive,
  handleResetFilters,
  handleKeyDown,
}) => {
  return (
    <div className="d-flex align-items-center">
      <span className="text-muted d-none d-md-block">
        {isFilterActive
          ? `${filteredAlbumsCount} albums`
          : `${totalAlbums} albums`}
      </span>

      {isFilterActive && (
        <span
          className="reset-filters-label"
          onClick={handleResetFilters}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          style={{
            cursor: 'pointer',
            marginLeft: '10px',
            fontWeight: 'bold',
            textDecoration: 'underline',
            color: 'black',
          }}
        >
          Reset Filters
        </span>
      )}
    </div>
  );
};

export default AlbumCountResetSection;
