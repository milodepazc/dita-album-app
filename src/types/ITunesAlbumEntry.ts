export interface ITunesAlbumEntry {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:name': {
    label: string;
  };
  'im:artist': {
    label: string;
  };
  'im:image': {
    label: string;
  }[];
  link: {
    attributes: {
      href: string;
    };
  };
  'im:releaseDate': {
    label: string;
  };
  category: {
    attributes: {
      label: string;
    };
  };
}
