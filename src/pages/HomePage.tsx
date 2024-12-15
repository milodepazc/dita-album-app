import React, { useState, Suspense, useEffect } from 'react';
import SortSection from '../components/filters/SortSection';
import AlbumCountResetSection from '../components/common/AlbumCountResetSection';
import { useAlbums } from '../hooks/useAlbums';
import { Row, Col, Button } from 'react-bootstrap';

const AlbumGrid = React.lazy(() => import('../components/albums/AlbumGrid'));
const FilterSection = React.lazy(
  () => import('../components/filters/FilterSection'),
);

const HomePage = () => {
  const {
    availableGenres,
    availableArtists,
    searchQuery,
    selectedGenre,
    selectedArtist,
    selectedMinYear,
    selectedMaxYear,
    minYear,
    maxYear,
    sortOrder,
    loading,
    filterAlbums,
    setSearchQuery,
    setSelectedGenre,
    setSelectedArtist,
    setSelectedMinYear,
    setSelectedMaxYear,
    setSortOrder,
  } = useAlbums();

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [albumsToShow, setAlbumsToShow] = useState(21);

  const filteredAlbums = filterAlbums.slice(0, albumsToShow);
  const totalAlbums = filterAlbums.length;
  const filteredAlbumsCount = filteredAlbums.length;

  const isFilterActive =
    (selectedGenre !== '' && selectedGenre !== null) ||
    (selectedArtist !== '' && selectedArtist !== null) ||
    searchQuery !== '' ||
    (selectedMinYear !== null && selectedMinYear !== minYear) ||
    (selectedMaxYear !== null && selectedMaxYear !== maxYear);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      albumsToShow < totalAlbums
    ) {
      setAlbumsToShow(albumsToShow + 21);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [albumsToShow, totalAlbums]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedArtist('');
    setSelectedMinYear(minYear ?? 1900);
    setSelectedMaxYear(maxYear ?? new Date().getFullYear());
    setSortOrder('asListed');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleResetFilters();
    }
  };

  return (
    <div className="container-fluid mt-5">
      <Row>
        <Col md={3}>
          <Suspense fallback={<div>Loading Filters...</div>}>
            <FilterSection
              availableGenres={availableGenres}
              availableArtists={availableArtists}
              searchQuery={searchQuery}
              selectedGenre={selectedGenre}
              selectedArtist={selectedArtist}
              selectedMinYear={selectedMinYear}
              selectedMaxYear={selectedMaxYear}
              minYear={minYear ?? 1900}
              maxYear={maxYear ?? new Date().getFullYear()}
              onGenreChange={setSelectedGenre}
              onArtistChange={setSelectedArtist}
              onYearRangeChange={({ minYear, maxYear }) => {
                setSelectedMinYear(minYear);
                setSelectedMaxYear(maxYear);
              }}
              setSearchQuery={setSearchQuery}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </Suspense>
        </Col>

        <Col md={9}>
          <Row className="mb-4 d-flex justify-content-between align-items-center">
            <Col md="auto">
              <AlbumCountResetSection
                totalAlbums={totalAlbums}
                filteredAlbumsCount={filteredAlbumsCount}
                isFilterActive={isFilterActive}
                handleResetFilters={handleResetFilters}
                handleKeyDown={handleKeyDown}
              />
            </Col>

            <Col md="auto" className="d-none d-md-block">
              <SortSection
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                showSort={showSort}
                setShowSort={setShowSort}
              />
            </Col>

            <div className="d-md-none text-center mb-3">
              <Row>
                <Col xs={6}>
                  <Button
                    variant="outline-primary"
                    className="w-100 font-weight-bold"
                    onClick={() => setShowFilters(true)}
                  >
                    Filters
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="outline-primary"
                    className="w-100 font-weight-bold"
                    onClick={() => setShowSort(true)}
                  >
                    Sort By
                  </Button>
                </Col>
              </Row>

              {isFilterActive && (
                <Row className="mt-2">
                  <Col>
                    <span
                      className="reset-filters-label"
                      onClick={handleResetFilters}
                      onKeyDown={handleKeyDown}
                      role="button"
                      tabIndex={0}
                      style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        color: 'black',
                      }}
                    >
                      Reset Filters
                    </span>
                  </Col>
                </Row>
              )}
            </div>
          </Row>

          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Suspense fallback={<div>Loading Albums...</div>}>
              <AlbumGrid albums={filteredAlbums} />
            </Suspense>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
