import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../../user/user.service';
import { UserForAuth } from 'src/app/types/user';

@Injectable({
  providedIn: 'root',
})
export class WatchlistsService {
  baseUrl = environment.BASE_URL + '/watchlists';
  user: UserForAuth | undefined;

  constructor(private http: HttpClient, private userService: UserService) {
    this.user = this.userService.user;
  }

  createWatchlist(title: string, description: string) {
    const userId = this.user?.id;
    const token = this.user?.token;
    const options: any = {
      headers: {
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.API_KEY,
        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json',
        'X-Parse-Session-Token': token,
      },
    };
    const body = JSON.stringify({ title, description, ownerId: userId });
    return this.http.post(this.baseUrl, body, options);
  }
}
