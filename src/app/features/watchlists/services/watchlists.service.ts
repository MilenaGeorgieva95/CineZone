import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';
import { CreateWatchlist } from 'src/app/types/watchlist';

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
      throw new Error('Invalid User')
    }
    const watchlistData: CreateWatchlist = {
      title,
      description,
      ownerId: {
        __type: 'Pointer',
        className: '_User',
        objectId: userId,
      },
    };

    return this.apiService.postRequest(this.baseUrl, watchlistData);
  }
}
