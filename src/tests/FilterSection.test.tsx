import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterSection from '../components/filters/FilterSection';

interface OffcanvasProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

// Mock the Offcanvas component and subcomponents.
jest.mock('react-bootstrap/Offcanvas', () => {
  const MockOffcanvas: React.FC<OffcanvasProps> = ({
    show,
    onHide,
    children,
  }) => (
    <div
      data-testid="mocked-offcanvas"
      style={{ display: show ? 'block' : 'none' }}
    >
      <button onClick={onHide}>Close</button>
      {children}
    </div>
  );

  const MockHeader: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <div data-testid="mocked-offcanvas-header">{children}</div>;

  const MockTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div data-testid="mocked-offcanvas-title">{children}</div>
  );

  const MockBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div data-testid="mocked-offcanvas-body">{children}</div>
  );

  return Object.assign(MockOffcanvas, {
    Header: MockHeader,
    Title: MockTitle,
    Body: MockBody,
  });
});

// Mock the FilterControls and SearchFilter components.
jest.mock('../components/filters/FilterControls', () => ({
  __esModule: true,
  default: (props: { 'data-testid': string }) => (
    <div data-testid={props['data-testid']}>Mocked FilterControls</div>
  ),
}));

jest.mock('../components/filters/SearchFilter', () => ({
  __esModule: true,
  default: (props: {
    'data-testid': string;
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid={props['data-testid']}
      value={props.searchQuery}
      onChange={props.onSearchChange}
      placeholder="Search albums..."
    />
  ),
}));

describe('FilterSection', () => {
  const defaultProps = {
    availableGenres: ['Genre 1', 'Genre 2'],
    availableArtists: ['Artist 1', 'Artist 2'],
    searchQuery: '',
    selectedGenre: '',
    selectedArtist: '',
    selectedMinYear: null,
    selectedMaxYear: null,
    minYear: 1990,
    maxYear: 2020,
    onGenreChange: jest.fn(),
    onArtistChange: jest.fn(),
    onYearRangeChange: jest.fn(),
    setSearchQuery: jest.fn(),
    showFilters: false,
    setShowFilters: jest.fn(),
  };

  test('renders FilterSection correctly in desktop view', () => {
    render(<FilterSection {...defaultProps} />);

    expect(screen.getByTestId('desktop-search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-filter-controls')).toBeInTheDocument();
  });

  test('renders FilterSection correctly in mobile view with Offcanvas', () => {
    const mobileProps = { ...defaultProps, showFilters: true };

    render(<FilterSection {...mobileProps} />);

    expect(screen.getByTestId('mocked-offcanvas')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-filter-controls')).toBeInTheDocument();
  });

  test('calls setSearchQuery when search input changes', () => {
    render(<FilterSection {...defaultProps} />);

    const searchInput = screen.getByTestId('desktop-search-filter');

    fireEvent.change(searchInput, {
      target: { value: 'test query' },
    });

    expect(defaultProps.setSearchQuery).toHaveBeenCalledWith('test query');
  });

  test('calls setShowFilters when Offcanvas is closed', () => {
    const mobileProps = { ...defaultProps, showFilters: true };

    render(<FilterSection {...mobileProps} />);

    fireEvent.click(screen.getByText('Close'));

    expect(defaultProps.setShowFilters).toHaveBeenCalledWith(false);
  });
});
