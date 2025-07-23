import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistsService {
  constructor(private http: HttpClient, private userService: UserService) {}
  baseUrl = environment.BASE_URL + '/watchlists';

  createWatchlist(title: string, description: string) {
    const token = this.userService.user?.token;
    console.log(token);

    const userId = this.userService.user?.id;
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