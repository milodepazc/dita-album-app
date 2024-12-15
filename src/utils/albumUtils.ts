import { Album } from '../types/Album';

export const sortAlbums = (
  albumsToSort: Album[],
  sortOrder: 'asc' | 'desc' | 'asListed',
): Album[] => {
  if (sortOrder === 'asc') {
    return [...albumsToSort].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'desc') {
    return [...albumsToSort].sort((a, b) => b.name.localeCompare(a.name));
  } else {
    return albumsToSort;
  }
};

export const filterAlbums = (
  albums: Album[] | undefined,
  searchQuery: string,
  selectedGenre: string,
  selectedArtist: string,
  selectedMinYear: number | null,
  selectedMaxYear: number | null,
): Album[] => {
  if (!albums || albums.length === 0) {
    return [];
  }

  return albums.filter((album) => {
    const albumYear = new Date(album.releaseDate).getFullYear();
    const matchesSearch =
      album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre
      ? album.genre.includes(selectedGenre)
      : true;
    const matchesArtist = selectedArtist
      ? album.artist.includes(selectedArtist)
      : true;
    const matchesYear =
      (!selectedMinYear || albumYear >= selectedMinYear) &&
      (!selectedMaxYear || albumYear <= selectedMaxYear);

    return matchesSearch && matchesGenre && matchesArtist && matchesYear;
  });
};
