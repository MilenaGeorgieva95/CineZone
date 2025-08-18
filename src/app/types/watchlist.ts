export interface Watchlist {
  id: number;
  title: string;
  description: string;
  votes: string[];
  movies_list: Array<MovieItem> | [];
}

export interface CreateWatchlist {
  title: string;
  description: string;
  ownerId: OwnerId;
}

interface MovieItem {
  id: number;
  title: string;
  rating: number;
  poster_path: string;
}

interface OwnerId {
  __type: 'Pointer';
  className: '_User';
  objectId: string;
}
