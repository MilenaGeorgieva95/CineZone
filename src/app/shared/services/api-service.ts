import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserForAuth } from 'src/app/types/user';
import { UserService } from 'src/app/features/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.BASE_URL + '/watchlists';
  user: UserForAuth | undefined;

  constructor(private http: HttpClient, private userService: UserService) {
    this.user = this.userService.user;
  }

  postRequest(url: string, data: object) {
    const options: any = {
      headers: {
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.API_KEY,
        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json',
      },
    };
    const token = this.user?.token;
    if (token) {
      options.headers['X-Parse-Session-Token'] = token;
    }

    const body = JSON.stringify(data);
    return this.http.post(this.baseUrl, body, options);
  }
}
