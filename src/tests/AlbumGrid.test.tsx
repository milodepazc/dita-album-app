import React from 'react';
import { render, screen } from '@testing-library/react';
import AlbumGrid from '../components/albums/AlbumGrid';
import { Album } from '../types/Album';

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

interface AlbumCardProps {
  album: Album;
}

// Mock AlbumCard component 
jest.mock('../components/albums/AlbumCard', () => {
  const MockAlbumCard: React.FC<AlbumCardProps> = ({ album }) => (
    <div data-testid={`album-card-${album.id}`}>{album.name}</div>
  );
  MockAlbumCard.displayName = 'AlbumCard';
  return MockAlbumCard;
});

describe('AlbumGrid', () => {
  test('renders "No albums found" when no albums are passed', () => {
    render(<AlbumGrid albums={[]} />);
    expect(screen.getByText('No albums found')).toBeInTheDocument();
  });

  test('renders the correct number of albums', () => {
    render(<AlbumGrid albums={mockAlbums} />);

    // Check that the correct number of AlbumCards are rendered
    expect(screen.getAllByTestId(/album-card-/).length).toBe(mockAlbums.length);
  });

  test('passes correct album data to AlbumCard', () => {
    render(<AlbumGrid albums={mockAlbums} />);

    // Check if the mock data is passed to AlbumCard properly
    mockAlbums.forEach((album) => {
      expect(screen.getByTestId(`album-card-${album.id}`)).toHaveTextContent(
        album.name,
      );
    });
  });

  test('sets the ref on the last album for infinite scrolling', () => {
    const lastAlbumRef = jest.fn();
    render(<AlbumGrid albums={mockAlbums} lastAlbumRef={lastAlbumRef} />);

    // Ensure that ref is only applied to the last album
    const lastAlbum = screen.getByTestId(
      `album-card-${mockAlbums[mockAlbums.length - 1].id}`,
    );
    expect(lastAlbumRef).toHaveBeenCalledWith(lastAlbum.parentElement);
  });
});
