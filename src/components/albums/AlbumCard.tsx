import React from 'react';
import { Album } from '../../types/Album';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = React.memo(({ album }) => {
  const releaseYear = album.releaseDate
    ? new Date(album.releaseDate).getFullYear()
    : 'Unknown Year';

  return (
    <div className="card h-100 text-center">
      <img
        src={album.image || 'default-image.png'}
        alt={album.name || 'Album cover'}
        className="card-img-top"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{album.name || 'Unknown Album'}</h5>
        <p className="card-text">by {album.artist || 'Unknown Artist'}</p>
        <p className="card-text">{releaseYear}</p>
      </div>
      <div className="card-footer">
        <a
          href={album.link || '#'}
          className="btn btn-outline-primary w-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on iTunes
        </a>
      </div>
    </div>
  );
});

AlbumCard.displayName = 'AlbumCard';

export default AlbumCard;
