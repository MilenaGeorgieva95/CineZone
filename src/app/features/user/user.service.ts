import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api-service';
import { UserForAuth } from 'src/app/types/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoints = {
    register: '/users',
    login: '/login',
    logout: '/logout',
    sessionByToken: (token: string) =>
      `/sessions?where={"sessionToken":"${token}"}`,
    sessionById: (id: string) => `/sessions/${id}`,
  };

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  get isAuth(): boolean {
    return !!this.user;
  }

  constructor(private apiService: ApiService) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }
  login(username: string, password: string) {
    // this.user = {
    //   id: '1234',
    //   username: 'Peter',
    //   email: 'peter@gmail.com',
    //   password: '1234',
    //   token: '123',
    // };

    console.log(username);
    console.log(password);
    localStorage.removeItem('user');
    this.apiService
      .postRequest(this.endpoints.login, { username, password })
      .subscribe((userData) => console.log(userData));
    // localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
  register(username: string, email: string, password: string) {
    console.log(username);
    console.log(password);
    localStorage.removeItem('user');
    this.apiService
      .postRequest(this.endpoints.register, { username, password, email })
      .subscribe((userData) => console.log(userData));
    // localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }
}
