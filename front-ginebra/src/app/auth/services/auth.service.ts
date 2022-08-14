import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { IUpdateUserResponse } from '../../shared/interfaces/interfaces';
import { PetService } from '../../main/services/pet.service';

import {
  IAuthResponse,
  IUser,
  IGetUsersResponse,
  IDeleteUserResponse,
} from '../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router // private petService: PetService
  ) {
    this.userChange.subscribe((user) => {
      this._user = user;
      // this.petService.getLinkedPetsByUser(user._id);
    });

    this.validateJwt().subscribe((resp) => {});
  }
  private baseUrl: string = `${environment.baseUrl}/auth`;
  private _user: IUser | null = null;
  private _users: IUser[] = [];
  private routes = {
    createUser: '/createUser',
    getUsers: '/getUsers',
    login: '/login',
    renewToken: '/renewToken/',
    updateUser: '/updateUser/', //:userId
    changePass: '/changepass/', //:userId
    deleteUser: '/deleteUser/', //:userId'
  };
  userChange: Subject<IUser> = new Subject<IUser>();

  get user() {
    if (this._user) {
      return { ...this._user };
    }
    return null;
  }

  get users() {
    return [...this._users];
  }

  create(username: string, email: string, password: string) {
    const url = `${this.baseUrl}${this.routes.createUser}`;
    const body = { username, email, password };

    return this.httpClient.post<IAuthResponse>(url, body).pipe(
      tap((resp: IAuthResponse) => {
        if (resp.ok) {
          this.userChange.next({ ...resp.user });
          localStorage.setItem('token', resp.token);
        }
      }),
      map((resp: IAuthResponse) => resp),
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
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          this.userChange.next({ ...resp.user });
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
    const url = `${this.baseUrl}${this.routes.renewToken}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient.get<IAuthResponse>(url, { headers }).pipe(
      map((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          this.userChange.next({ ...resp.user });
        }
        return resp.ok;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  logout() {
    localStorage.clear();

    this.router.navigateByUrl('/');
  }

  getUsers() {
    const url = `${this.baseUrl}${this.routes.getUsers}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient.get<IGetUsersResponse>(url, { headers }).pipe(
      tap((resp: IGetUsersResponse) => {
        if (resp.ok) {
          this._users = [...resp.users];
        }
      }),
      map((resp: IGetUsersResponse) => resp),
      catchError((err: HttpErrorResponse) => {
        return of(err.error);
      })
    );
  }

  deleteUser(id: string) {
    const url = `${this.baseUrl}${this.routes.deleteUser}${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient.delete<IDeleteUserResponse>(url, { headers }).pipe(
      tap((resp) => {
        if (resp.ok) {
          const whatever = [3, 4, 5];

          this._users = this._users?.filter((user) => user._id !== id);
        }
      }),
      map((resp: any) => {
        return resp;
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err.error);
      })
    );
  }

  updateUser(
    username: string,
    email: string,
    fullName: string,
    imgUrl: string,
    id: string
  ) {
    const url = `${this.baseUrl}${this.routes.updateUser}${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    const body = { username, email, fullName, imgUrl };

    return this.httpClient
      .put<IUpdateUserResponse>(url, body, { headers })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            this.userChange.next({ ...resp.updatedUser });
          }
        }),
        map((resp: IUpdateUserResponse) => resp),
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  changePassword(prevPassword: string, password: string, id: string) {
    const url = `${this.baseUrl}${this.routes.changePass}${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    const body = { prevPassword, password };

    return this.httpClient
      .patch<IUpdateUserResponse>(url, body, { headers })
      .pipe(
        map((resp: IUpdateUserResponse) => resp),
        catchError((err) => {
          return of(err.error);
        })
      );
  }
}
