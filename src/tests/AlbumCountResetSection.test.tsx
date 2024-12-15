import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlbumCountResetSection from '../components/common/AlbumCountResetSection';

describe('AlbumCountResetSection', () => {
  const defaultProps = {
    totalAlbums: 100,
    filteredAlbumsCount: 50,
    isFilterActive: false,
    handleResetFilters: jest.fn(),
    handleKeyDown: jest.fn(),
  };

  test('renders the total album count when no filters are active', () => {
    render(<AlbumCountResetSection {...defaultProps} />);

    // Expect total albums to be shown when no filters are active
    expect(screen.getByText('100 albums')).toBeInTheDocument();
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument();
  });

  test('renders the filtered album count and "Reset Filters" when filters are active', () => {
    render(<AlbumCountResetSection {...defaultProps} isFilterActive={true} />);

    // Expect filtered albums to be shown
    expect(screen.getByText('50 albums')).toBeInTheDocument();

    // Expect the Reset Filters label (button) to be rendered
    const resetFiltersButton = screen.getByText('Reset Filters');
    expect(resetFiltersButton).toBeInTheDocument();
    expect(resetFiltersButton).toHaveStyle('cursor: pointer');
  });

  test('calls handleResetFilters when "Reset Filters" is clicked', () => {
    render(<AlbumCountResetSection {...defaultProps} isFilterActive={true} />);

    // Simulate click on the Reset Filters button
    const resetFiltersButton = screen.getByText('Reset Filters');
    fireEvent.click(resetFiltersButton);

    // Verify that handleResetFilters was called
    expect(defaultProps.handleResetFilters).toHaveBeenCalled();
  });

  test('calls handleKeyDown when "Reset Filters" is focused and a key is pressed', () => {
    render(<AlbumCountResetSection {...defaultProps} isFilterActive={true} />);

    // Simulate keydown event on the Reset Filters button
    const resetFiltersButton = screen.getByText('Reset Filters');
    fireEvent.keyDown(resetFiltersButton, { key: 'Enter', code: 'Enter' });

    // Verify that handleKeyDown was called
    expect(defaultProps.handleKeyDown).toHaveBeenCalled();
  });
});
