import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserForAuth } from 'src/app/types/user';
import { UserService } from 'src/app/features/user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.BASE_URL;
  user: UserForAuth | undefined;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as UserForAuth;
    } else {
      this.user = undefined;
    }
  }

  getRequest<T>(url: string): Observable<T> {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as UserForAuth;
    }
    const headers: { [key: string]: string } = {
      'X-Parse-Application-Id': environment.APP_ID,
      'X-Parse-REST-API-Key': environment.API_KEY,
      'X-Parse-Revocable-Session': '1',
    };
    if (this.user?.sessionToken) {
  headers['X-Parse-Session-Token'] = this.user.sessionToken;
}
    return this.http.get<T>(this.baseUrl + url, { headers});
  }

  postRequest<T>(url: string, data: object) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as UserForAuth;
    }
    const options: any = {
      headers: {
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.API_KEY,
        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json',
      },
    };
    const token = this.user?.sessionToken;
    if (token) {
      console.log(token);

      options.headers['X-Parse-Session-Token'] = token;
    }

    const body = JSON.stringify(data);
    return this.http.post<T>(this.baseUrl + url, body, options);
  }

    putRequest(url: string, data: object) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as UserForAuth;
    }
    const options: any = {
      headers: {
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.API_KEY,
        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json',
      },
    };
    const token = this.user?.sessionToken;
    if (token) {
      console.log(token);

      options.headers['X-Parse-Session-Token'] = token;
    }

    const body = JSON.stringify(data);
    return this.http.put(this.baseUrl + url, body, options);
  }

  delRequest(url: string) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as UserForAuth;
    }
    const options: any = {
      headers: {
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.API_KEY,
        'X-Parse-Revocable-Session': 1,
        'Content-Type': 'application/json',
      },
    };
    const token = this.user?.sessionToken;
    if (token) {
      console.log(token);

      options.headers['X-Parse-Session-Token'] = token;
    }
    return this.http.delete(this.baseUrl + url, options);
  }
}
