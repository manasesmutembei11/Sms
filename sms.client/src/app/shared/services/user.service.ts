import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { RegisterUserDto } from '../models/users/register-user-dto';
import { User } from '../models/users/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,

    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public registerUser = (body: RegisterUserDto) => {
    return this.http.post<BasicResponse>(
      this.baseUrl + 'api/Auth/registration',
      body
    );
  };

  public save = (body: User): Observable<BasicResponse> => {
    return this.http.post<BasicResponse>(this.baseUrl + 'api/user/save', body);
  };

  public activate = (body: User) => {
    return this.http.post<BasicResponse>(
      this.baseUrl + 'api/user/activate',
      body
    );
  };
  public resendEmailConfirmation = (body: User) => {
    return this.http.post<BasicResponse>(
      this.baseUrl + 'api/user/ResendEmailConfirmation',
      body
    );
  };
  findById(id: string) {
    return this.http.get<User>(`${this.baseUrl}api/user/${id}`);
  }

  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<User>> => {
    return this.http.get<PagedList<User>>(
      `${this.baseUrl}api/user/users?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
