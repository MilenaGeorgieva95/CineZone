import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api-service';
import { UserForAuth } from 'src/app/types/user';

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
  private readonly USER_KEY = '[user]';

  get isAuth(): boolean {
    return !!this.user;
  }

  get userId(): string {
    return this.user?.objectId || '';
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
  localStorage.removeItem(this.USER_KEY);
  return this.apiService.postRequest(this.endpoints.login, { username, password });
}

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }

  register(username: string, email: string, password: string) {
    localStorage.removeItem(this.USER_KEY);
    this.apiService
      .postRequest(this.endpoints.register, { username, password, email })
      .subscribe({
        next: (userData) => {
          localStorage.setItem(
            this.USER_KEY,
            JSON.stringify({ ...userData, username, email })
          );

          try {
            const lsUser = localStorage.getItem(this.USER_KEY) || '';
            this.user = JSON.parse(lsUser);
          } catch (error) {
            this.user = undefined;
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
  }
}
