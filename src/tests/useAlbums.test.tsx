import { render, act, waitFor } from '@testing-library/react';
import { useAlbums } from '../hooks/useAlbums';
import { fetchTopAlbums } from '../services/itunesService';
import { Album } from '../types/Album';

// Mock data for albums
const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'Album 1',
    artist: 'Artist 1',
    genre: 'Genre 1',
    releaseDate: '2023-01-01',
    image: 'https://example.com/image1.jpg',
    link: 'https://example.com/album1',
  },
  {
    id: '2',
    name: 'Album 2',
    artist: 'Artist 2',
    genre: 'Genre 2',
    releaseDate: '2022-01-01',
    image: 'https://example.com/image2.jpg',
    link: 'https://example.com/album2',
  },
];

jest.mock('../services/itunesService', () => ({
  fetchTopAlbums: jest.fn(),
}));

const mockedFetchTopAlbums = fetchTopAlbums as jest.MockedFunction<
  typeof fetchTopAlbums
>;

const HookWrapper = ({ hook }: { hook: () => any }) => {
  const result = hook();
  return <div>{JSON.stringify(result)}</div>;
};

test('should fetch and display albums', async () => {
  // Mock the fetchTopAlbums call to return the mock data
  mockedFetchTopAlbums.mockResolvedValueOnce(mockAlbums);

  let renderResult: ReturnType<typeof render> | undefined;

  // Use act to simulate hook behavior and state changes
  await act(async () => {
    renderResult = render(<HookWrapper hook={useAlbums} />);
  });

  // Ensure renderResult is not undefined
  if (renderResult) {
    const { container } = renderResult;

    // Use waitFor to wait until the albums are rendered
    await waitFor(() => {
      expect(container.textContent).toContain('Album 1');
      expect(container.textContent).toContain('Artist 1');
      expect(container.textContent).toContain('Album 2');
      expect(container.textContent).toContain('Artist 2');
    });

    // Assert the fetch function was called
    expect(mockedFetchTopAlbums).toHaveBeenCalledTimes(1);
  } else {
    throw new Error('Render result is undefined');
  }
});
