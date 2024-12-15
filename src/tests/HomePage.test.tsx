import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';

// Mock Offcanvas
jest.mock('react-bootstrap/Offcanvas', () => ({
  __esModule: true,
  default: (props: React.HTMLProps<HTMLDivElement>) => (
    <div {...props}>Mocked Offcanvas</div>
  ),
}));

// Mock AlbumGrid
jest.mock('../components/albums/AlbumGrid', () => ({
  __esModule: true,
  default: () => <div>Mocked AlbumGrid</div>,
}));

// Mock FilterSection
jest.mock('../components/filters/FilterSection', () => ({
  __esModule: true,
  default: () => <div>Mocked FilterSection</div>,
}));

// Mock SortSection
jest.mock('../components/filters/SortSection', () => ({
  __esModule: true,
  default: () => <div>Mocked SortSection</div>,
}));

// Mock AlbumCountResetSection
jest.mock('../components/common/AlbumCountResetSection', () => ({
  __esModule: true,
  default: () => <div>Mocked AlbumCountResetSection</div>,
}));

describe('HomePage', () => {
  test('renders HomePage with FilterSection, SortSection, and AlbumGrid', async () => {
    // Render HomePage wrapped in Suspense with a fallback
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>,
    );

    // Wait for the FilterSection to be rendered
    await waitFor(() =>
      expect(screen.getByText('Mocked FilterSection')).toBeInTheDocument(),
    );

    // Wait for the SortSection to be rendered
    await waitFor(() =>
      expect(screen.getByText('Mocked SortSection')).toBeInTheDocument(),
    );

    // Wait for the AlbumGrid to be rendered
    await waitFor(() =>
      expect(screen.getByText('Mocked AlbumGrid')).toBeInTheDocument(),
    );
  });
});
