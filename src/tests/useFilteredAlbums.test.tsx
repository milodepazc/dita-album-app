import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFilteredAlbums } from '../hooks/useFilteredAlbums';
import { Album } from '../types/Album';
import { filterAlbums, sortAlbums } from '../utils/albumUtils';

// Mock the utility functions
jest.mock('../utils/albumUtils', () => ({
  filterAlbums: jest.fn(),
  sortAlbums: jest.fn(),
}));

// Mock data
const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'Album 1',
    artist: 'Artist 1',
    image: 'image1.jpg',
    link: 'http://link1.com',
    releaseDate: '2021-01-01',
    genre: 'Rock',
  },
  {
    id: '2',
    name: 'Album 2',
    artist: 'Artist 2',
    image: 'image2.jpg',
    link: 'http://link2.com',
    releaseDate: '2020-01-01',
    genre: 'Pop',
  },
];

// Create a test component to use the hook
const TestComponent = (props: any) => {
  const { filteredAlbums, availableGenres, availableArtists } =
    useFilteredAlbums(props);

  return (
    <div>
      <div data-testid="filtered-albums">
        {filteredAlbums.map((album) => (
          <span key={album.id}>{album.name}</span>
        ))}
      </div>
      <div data-testid="available-genres">{availableGenres.join(', ')}</div>
      <div data-testid="available-artists">{availableArtists.join(', ')}</div>
    </div>
  );
};

describe('useFilteredAlbums', () => {
  beforeEach(() => {
    // Mock the filter and sort utility functions
    (filterAlbums as jest.Mock).mockReturnValue(mockAlbums);
    (sortAlbums as jest.Mock).mockReturnValue(mockAlbums);
  });

  const defaultProps = {
    albums: mockAlbums,
    searchQuery: '',
    selectedGenre: '',
    selectedArtist: '',
    selectedMinYear: null,
    selectedMaxYear: null,
    sortOrder: 'asListed' as 'asc' | 'desc' | 'asListed',
  };

  test('returns filtered albums, genres, and artists', () => {
    render(<TestComponent {...defaultProps} />);
  
    // Validate filtered albums
    expect(screen.getByTestId('filtered-albums')).toHaveTextContent('Album 1');
    expect(screen.getByTestId('filtered-albums')).toHaveTextContent('Album 2');
  
    // Validate available genres (sorted alphabetically)
    expect(screen.getByTestId('available-genres')).toHaveTextContent(
      'Pop, Rock',  // Modify the order to match the sorted result
    );
  
    // Validate available artists (sorted alphabetically)
    expect(screen.getByTestId('available-artists')).toHaveTextContent(
      'Artist 1, Artist 2',
    );
  });

  test('calls filterAlbums and sortAlbums with the correct arguments', () => {
    render(<TestComponent {...defaultProps} />);

    // Validate that the utility functions were called
    expect(filterAlbums).toHaveBeenCalledWith(
      mockAlbums,
      '',
      '',
      '',
      null,
      null,
    );
    expect(sortAlbums).toHaveBeenCalledWith(mockAlbums, 'asListed');
  });
});
