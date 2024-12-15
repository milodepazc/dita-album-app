import { Album } from '../types/Album';
import { ITunesAlbumEntry } from '../types/ITunesAlbumEntry';

const ITUNES_API_URL = process.env.REACT_APP_ITUNES_API_URL;

export const fetchTopAlbums = async (): Promise<Album[]> => {
  if (!ITUNES_API_URL) {
    throw new Error('iTunes API URL is not defined');
  }

  const url = `${ITUNES_API_URL}topalbums/limit=100/json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch top albums');
  }

  const data = await response.json();

  const albums: Album[] = data.feed.entry.map((entry: ITunesAlbumEntry) => ({
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    artist: entry['im:artist'].label,
    image: entry['im:image'][2].label,
    link: entry.link.attributes.href,
    releaseDate: entry['im:releaseDate'].label,
    genre: entry.category.attributes.label,
  }));

  return albums;
};
