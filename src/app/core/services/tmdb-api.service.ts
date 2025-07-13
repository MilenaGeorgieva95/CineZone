import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  accessToken: string = environment.TMDB_ACCESS_TOKEN;
  baseUrl:string=environment.TMDB_BASE_URL;
  constructor(private http: HttpClient) {}

  fetchMovies() {
    this.http
      .get(this.baseUrl, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((res) => console.log(res));
  }
}
