import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  baseUrl: string = environment.TMDB_ACCESS_TOKEN;
  constructor(private http: HttpClient) {}

  fetchMovies() {
    this.http
      .get('https://api.themoviedb.org/3/discover/movie', {
        headers: { Authorization: `Bearer ${this.baseUrl}` },
      })
      .subscribe((res) => console.log(res));
  }
}
