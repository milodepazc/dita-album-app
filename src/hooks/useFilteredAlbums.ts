import { useMemo } from 'react';
import { Album } from '../types/Album';
import { filterAlbums, sortAlbums } from '../utils/albumUtils';

interface UseFilteredAlbumsParams {
  albums: Album[];
  searchQuery: string;
  selectedGenre: string;
  selectedArtist: string;
  selectedMinYear: number | null;
  selectedMaxYear: number | null;
  sortOrder: 'asc' | 'desc' | 'asListed';
}

export const useFilteredAlbums = ({
  albums,
  searchQuery,
  selectedGenre,
  selectedArtist,
  selectedMinYear,
  selectedMaxYear,
  sortOrder,
}: UseFilteredAlbumsParams) => {
  const filteredAlbums = useMemo(() => {
    const filtered = filterAlbums(
      albums,
      searchQuery,
      selectedGenre,
      selectedArtist,
      selectedMinYear,
      selectedMaxYear,
    );

    return sortAlbums(filtered, sortOrder);
  }, [
    albums,
    searchQuery,
    selectedGenre,
    selectedArtist,
    selectedMinYear,
    selectedMaxYear,
    sortOrder,
  ]);

  const availableGenres = useMemo(() => {
    return Array.from(new Set(filteredAlbums.map((album) => album.genre))).sort(
      (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }, [filteredAlbums]);

  const availableArtists = useMemo(() => {
    return Array.from(
      new Set(filteredAlbums.map((album) => album.artist)),
    ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }, [filteredAlbums]);

  return {
    filteredAlbums,
    availableGenres,
    availableArtists,
  };
};
