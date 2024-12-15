import { useState } from 'react';
import { useFetchedAlbums } from './useFetchedAlbums';
import { useFilteredAlbums } from './useFilteredAlbums';

export const useAlbums = () => {
  const { albums, loading, minYear, maxYear } = useFetchedAlbums();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedMinYear, setSelectedMinYear] = useState<number | null>(null);
  const [selectedMaxYear, setSelectedMaxYear] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'asListed'>(
    'asListed',
  );

  const { filteredAlbums, availableGenres, availableArtists } =
    useFilteredAlbums({
      albums,
      searchQuery,
      selectedGenre,
      selectedArtist,
      selectedMinYear,
      selectedMaxYear,
      sortOrder,
    });

  return {
    albums,
    availableGenres,
    availableArtists,
    searchQuery,
    selectedGenre,
    selectedArtist,
    selectedMinYear,
    selectedMaxYear,
    minYear,
    maxYear,
    sortOrder,
    loading,
    filterAlbums: filteredAlbums,
    setSearchQuery,
    setSelectedGenre,
    setSelectedArtist,
    setSelectedMinYear,
    setSelectedMaxYear,
    setSortOrder,
  };
};
