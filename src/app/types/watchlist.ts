export interface Watchlist {
  id: number;
  title: string;
  description: string;
  votes: string[];
  movies_list: Array<movie_item>|[];
}

interface movie_item {
  id: number;
  title: string;
  poster_path: string;
}
