import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';
import { ApiService } from 'src/app/shared/services/api-service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistsService {
  baseUrl ='/watchlists';
  user: UserForAuth | undefined;

  constructor(private userService: UserService, private apiService:ApiService) {
    this.user = this.userService.user;
  }

  createWatchlist(title: string, description: string) {
    const userId = this.user?.id;
   return this.apiService.postRequest(this.baseUrl,{ title, description, ownerId: userId });
  }
}
