import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SortSection from '../components/filters/SortSection';

// Mock the Offcanvas component
jest.mock('react-bootstrap/Offcanvas', () => {
  const MockOffcanvas = ({
    show,
    onHide,
    children,
  }: {
    show: boolean;
    onHide: () => void;
    children: React.ReactNode;
  }) => (
    <div
      data-testid="mocked-offcanvas"
      style={{ display: show ? 'block' : 'none' }}
    >
      <button onClick={onHide}>Close</button>
      {children}
    </div>
  );

  const MockOffcanvasHeader = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-offcanvas-header">{children}</div>
  );
  const MockOffcanvasTitle = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-offcanvas-title">{children}</div>
  );
  const MockOffcanvasBody = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-offcanvas-body">{children}</div>
  );

  MockOffcanvas.displayName = 'MockOffcanvas';
  MockOffcanvasHeader.displayName = 'MockOffcanvasHeader';
  MockOffcanvasTitle.displayName = 'MockOffcanvasTitle';
  MockOffcanvasBody.displayName = 'MockOffcanvasBody';

  MockOffcanvas.Header = MockOffcanvasHeader;
  MockOffcanvas.Title = MockOffcanvasTitle;
  MockOffcanvas.Body = MockOffcanvasBody;

  return MockOffcanvas;
});

describe('SortSection', () => {
  const defaultProps = {
    sortOrder: 'asListed' as 'asc' | 'desc' | 'asListed',
    setSortOrder: jest.fn(),
    showSort: false,
    setShowSort: jest.fn(),
  };

  test('renders SortSection correctly in desktop view', () => {
    render(<SortSection {...defaultProps} />);

    const selects = screen.getAllByDisplayValue('As Listed');
    const desktopSelect = selects[0];

    expect(desktopSelect).toBeInTheDocument();
    expect(desktopSelect).toHaveDisplayValue('As Listed');
  });

  test('renders SortSection correctly in mobile view with Offcanvas', () => {
    const mobileProps = { ...defaultProps, showSort: true };

    render(<SortSection {...mobileProps} />);

    expect(screen.getByTestId('mocked-offcanvas')).toBeInTheDocument();

    const selects = screen.getAllByDisplayValue('As Listed');
    const mobileSelect = selects[1];

    expect(mobileSelect).toBeInTheDocument();
    expect(mobileSelect).toHaveDisplayValue('As Listed');
  });

  test('calls setSortOrder when a sort option is selected in desktop view', () => {
    render(<SortSection {...defaultProps} />);

    const desktopSelect = screen.getAllByDisplayValue('As Listed')[0];

    fireEvent.change(desktopSelect, { target: { value: 'asc' } });

    expect(defaultProps.setSortOrder).toHaveBeenCalledWith('asc');
  });

  test('calls setSortOrder and closes Offcanvas when a sort option is selected in mobile view', () => {
    const mobileProps = { ...defaultProps, showSort: true };

    render(<SortSection {...mobileProps} />);

    const mobileSelect = screen.getAllByDisplayValue('As Listed')[1];

    fireEvent.change(mobileSelect, { target: { value: 'desc' } });

    expect(mobileProps.setSortOrder).toHaveBeenCalledWith('desc');
    expect(mobileProps.setShowSort).toHaveBeenCalledWith(false);
  });

  test('closes Offcanvas when the close button is clicked in mobile view', () => {
    const mobileProps = { ...defaultProps, showSort: true };

    render(<SortSection {...mobileProps} />);

    fireEvent.click(screen.getByText('Close'));

    expect(mobileProps.setShowSort).toHaveBeenCalledWith(false);
  });
});
