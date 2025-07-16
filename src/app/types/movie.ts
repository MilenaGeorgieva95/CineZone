export interface MovieResults {
  page: number;
  results: Movie[];
}

interface basicMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends basicMovie{
  genre_ids: number[];
}

export interface fullMovieDetails extends basicMovie{
  belongs_to_collection: belongs_to_collection;
  budget: number;
  genres: genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: production_company[];
  production_countries: production_country[];
  revenue: number;
  runtime: number;
  spoken_languages: spoken_language[];
  status: string;
  tagline: string;
}

interface belongs_to_collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface genre {
  id: number;
  name: string;
}

interface production_company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface production_country {
  iso_3166_1: string;
  name: string;
}
interface spoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}
