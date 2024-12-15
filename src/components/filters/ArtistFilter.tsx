import React from 'react';

interface ArtistFilterProps {
  availableArtists: string[];
  selectedArtist: string;
  setSelectedArtist: (artist: string) => void;
}

const ArtistFilter: React.FC<ArtistFilterProps> = ({
  availableArtists,
  selectedArtist,
  setSelectedArtist,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="artist" className="form-label">
        Filter by Artist
      </label>
      <select
        id="artist"
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
        className="form-select"
      >
        <option value="">All Artists</option>
        {availableArtists.map((artist, index) => (
          <option key={index} value={artist}>
            {artist}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArtistFilter;
