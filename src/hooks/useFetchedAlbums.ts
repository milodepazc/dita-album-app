import { useState, useEffect } from 'react';
import { fetchTopAlbums } from '../services/itunesService';
import { Album } from '../types/Album';

export const useFetchedAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const albumData = await fetchTopAlbums();

      if (!albumData || !Array.isArray(albumData)) {
        setAlbums([]);
        setMinYear(null);
        setMaxYear(null);
        setLoading(false);
        return;
      }

      setAlbums(albumData);

      const years = albumData.map((album) =>
        new Date(album.releaseDate).getFullYear(),
      );
      setMinYear(Math.min(...years));
      setMaxYear(Math.max(...years));

      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    albums,
    loading,
    minYear,
    maxYear,
  };
};
