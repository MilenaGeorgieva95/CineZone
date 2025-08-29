import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import {
  ApiWatchlistResponse,
  CreateWatchlist,
  resWatchlist,
} from 'src/app/types/watchlist';
import { Observable, switchMap, throwError } from 'rxjs';
import { MovieItem } from 'src/app/types/movie';

@Injectable({
  providedIn: 'root',
})
export class WatchlistsService {
  baseUrl = '/watchlists';
  user: UserForAuth | undefined;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.user = this.userService.user;
  }

  createWatchlist(title: string, description: string) {
    const userId = this.user?.objectId;
    if (!userId) {
      return throwError(() => new Error('Invalid User'));
    }
    const watchlistData: CreateWatchlist = {
      title,
      description,
      movieList: [],
      ownerId: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId,
      },
    };

    return this.apiService.postRequest(this.baseUrl, watchlistData);
  }

  getAll(): Observable<ApiWatchlistResponse> {
    const orderParam = `order=-createdAt`
    return this.apiService.getRequest(`${this.baseUrl}?${orderParam}`);
  }

  getByOwner(): Observable<ApiWatchlistResponse> {
    const userId = this.userService.user?.objectId;
    const orderParam = `order=-createdAt`
    const searchParam = `where={"ownerId":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}`;
    return this.apiService.getRequest(`${this.baseUrl}?${searchParam}&${orderParam}`);
  }

  getById(watchlistId: string): Observable<resWatchlist> {
    return this.apiService.getRequest(`${this.baseUrl}/${watchlistId}`);
  }

  addMovieToWatchlist(
    watchlistId: string,
    newMovie: MovieItem
  ): Observable<any> {
    return this.getById(watchlistId).pipe(
      switchMap((watchlistData) => {
        const movieList: MovieItem[] = watchlistData.movieList || [];
        movieList.push(newMovie);

        return this.apiService.putRequest(`${this.baseUrl}/${watchlistId}`, {
          movieList,
        });
      })
    );
  }

    updateMovieList(
    watchlistId: string,
    movieList: MovieItem[]
  ): Observable<any> {
        return this.apiService.putRequest(`${this.baseUrl}/${watchlistId}`, {
          movieList,
        });
  }

  delWatchlist(watchlistId: string) {
    return this.apiService.delRequest(`${this.baseUrl}/${watchlistId}`);
  }

  editWatchlist(watchlistId: string, title: string, description: string): Observable<any>  {
    return this.apiService.putRequest(`${this.baseUrl}/${watchlistId}`, {
      title,
      description,
    });
  }
}
