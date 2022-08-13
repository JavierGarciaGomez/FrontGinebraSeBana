import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  IAuthResponse,
  IUser,
  IUserResponse,
} from '../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${environment.baseUrl}/auth`;
  private _user: IUser | null | undefined;
  private routes = {
    createUser: '/createUser',
    getUsers: '/getUsers',
    login: '/login',
    renewToken: '/renewToken/',
    updateUser: '/updateUser/:userId',
    changePass: '/changepass/:userId',
    deleteUser: '/deleteUser/:userId',
  };

  get user() {
    return { ...this._user };
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string) {
    const url = `${this.baseUrl}${this.routes.createUser}`;
    const body = { username, email, password };

    return this.httpClient.post<IAuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          this._user = {
            ...resp.user,
          };
          console.log({ user: this._user });
          localStorage.setItem('token', resp.token);
        }
      }),

      map((resp) => resp),
      catchError((err) => {
        localStorage.clear();
        return of(err.error);
      })
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}${this.routes.login}`;
    const body = { email, password };

    return this.httpClient.post<IAuthResponse>(url, body).pipe(
      tap((resp) => {
        console.log({ resp });
        if (resp.ok) {
          this._user = {
            ...resp.user,
          };
          console.log({ user: this._user });
          localStorage.setItem('token', resp.token);
        }
      }),

      map((resp) => resp),
      catchError((err) => {
        localStorage.clear();
        return of(err.error);
      })
    );
  }

  validateJwt(): Observable<boolean> {
    console.log('validating');
    const url = `${this.baseUrl}${this.routes.renewToken}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.httpClient.get<IAuthResponse>(url, { headers }).pipe(
      map((resp) => {
        console.log({ resp });
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          this._user = resp.user;
        }
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
