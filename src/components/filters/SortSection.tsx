import React from 'react';
import { Offcanvas } from 'react-bootstrap';

interface SortSectionProps {
  sortOrder: 'asc' | 'desc' | 'asListed';
  setSortOrder: (sortOrder: 'asc' | 'desc' | 'asListed') => void;
  showSort: boolean;
  setShowSort: (show: boolean) => void;
}

const SortSection: React.FC<SortSectionProps> = ({
  sortOrder,
  setSortOrder,
  showSort,
  setShowSort,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as 'asc' | 'desc' | 'asListed';
    setSortOrder(newSortOrder);
    setShowSort(false);
  };

  const renderDesktopSort = () => (
    <div className="d-none d-md-block text-end">
      <select
        className="form-select form-select-sm"
        value={sortOrder}
        onChange={handleSortChange}
        style={{ width: '150px' }}
      >
        <option value="asListed">As Listed</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );

  const renderMobileSort = () => (
    <Offcanvas
      show={showSort}
      onHide={() => setShowSort(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sort by</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <select
          className="form-select"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asListed">As Listed</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </Offcanvas.Body>
    </Offcanvas>
  );

  return (
    <>
      {renderDesktopSort()}
      {renderMobileSort()}
    </>
  );
};

export default SortSection;
