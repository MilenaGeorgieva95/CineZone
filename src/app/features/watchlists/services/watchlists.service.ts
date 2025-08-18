import { Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import {
  ApiWatchlistResponse,
  CreateWatchlist,
  resWatchlist,
} from 'src/app/types/watchlist';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistsService {
  baseUrl = '/classes/watchlists';
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
    return this.apiService.getRequest(this.baseUrl);
  }

  getByOwner(): Observable<ApiWatchlistResponse> {
    const userId = this.userService.user?.objectId;
    const searchParam = `where={"ownerId":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}`;
    return this.apiService.getRequest(`${this.baseUrl}?${searchParam}`);
  }
}
