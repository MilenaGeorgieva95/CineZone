import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
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

  isAuthSubject$$ = new BehaviorSubject<boolean>(false);
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
      this.isAuthSubject$$.next(true);
    } catch (error) {
      this.user = undefined;
    }
  }
  login(username: string, password: string) {
    // localStorage.removeItem(this.USER_KEY);
    return this.apiService
      .postRequest<UserForAuth>(this.endpoints.login, { username, password })
      .pipe(
        tap((userData) => {
          // localStorage.setItem(this.USER_KEY, JSON.stringify(userData ));
          this.isAuthSubject$$.next(true);
          this.user = userData;
        })
      );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
    this.isAuthSubject$$.next(false);
  }

  register(username: string, email: string, password: string) {
    localStorage.removeItem(this.USER_KEY);

    return this.apiService
      .postRequest(this.endpoints.register, { username, email, password })
      .pipe(
        tap((userData) => {
          localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
          this.isAuthSubject$$.next(true);
          try {
            const lsUser = localStorage.getItem(this.USER_KEY) || '';
            this.user = JSON.parse(lsUser);
          } catch {
            this.user = undefined;
          }
        })
      );
  }
}
