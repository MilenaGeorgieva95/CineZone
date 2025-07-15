import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TMDBApiService {
  private readonly baseUrl: string = environment.TMDB_BASE_URL;
  private readonly accessToken: string = environment.TMDB_ACCESS_TOKEN;
  private endpoints = {
    allMovies:`${this.baseUrl}/discover/movie`,
    popular: `${this.baseUrl}/movie/popular`,
    search: `${this.baseUrl}/search/movie`,
    movieDetails: (id: number) => `${this.baseUrl}/movie/${id}`,
  };

  constructor(private http: HttpClient) {}

  fetchMovies() {
    this.http
      .get(this.endpoints.allMovies, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => console.log(res));
  }
}
