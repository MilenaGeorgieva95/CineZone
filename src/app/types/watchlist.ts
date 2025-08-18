import { MovieItem } from "./movie";

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
  movieList:[] | Array<MovieItem>
}



interface OwnerId {
  __type: 'Pointer';
  className: '_User';
  objectId: string;
}

export interface resWatchlist extends CreateWatchlist {
  objectId: string,
  createdAt: string;
  updatedAt: string;
}

export interface ApiWatchlistResponse {
  results: resWatchlist[]
}

export interface ApiSingleWatchlistResponse {
  results: resWatchlist
}