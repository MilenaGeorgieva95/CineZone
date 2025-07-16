import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fullMovieDetails, MovieResults } from 'src/app/types/movie';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TMDBApiService {
  private readonly baseUrl: string = environment.TMDB_BASE_URL;
  private readonly accessToken: string = environment.TMDB_ACCESS_TOKEN;
  private endpoints = {
    allMovies: `${this.baseUrl}/discover/movie`,
    popular: `${this.baseUrl}/movie/popular`,
    search: `${this.baseUrl}/search/movie`,
    movieDetails: (id: string) => `${this.baseUrl}/movie/${id}`,
  };

  constructor(private http: HttpClient) {}

  fetchMovies() {
    return this.http.get<MovieResults>(this.endpoints.allMovies, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }
  fetchMovieById(id:string) {
    return this.http.get<fullMovieDetails>(this.endpoints.movieDetails(id), {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }
}
