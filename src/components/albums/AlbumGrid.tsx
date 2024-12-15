import React from 'react';
import { Album } from '../../types/Album';
import AlbumCard from './AlbumCard';

interface AlbumGridProps {
  albums: Album[];
  lastAlbumRef?: (node: HTMLDivElement) => void;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, lastAlbumRef }) => {
  return (
    <div className="row">
      {albums.length === 0 ? (
        <p className="text-center">No albums found</p>
      ) : (
        albums.map((album, index) => {
          if (albums.length === index + 1) {
            return (
              <div className="col-md-4 mb-4" key={album.id} ref={lastAlbumRef}>
                <AlbumCard album={album} />
              </div>
            );
          } else {
            return (
              <div className="col-md-4 mb-4" key={album.id}>
                <AlbumCard album={album} />
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default AlbumGrid;
