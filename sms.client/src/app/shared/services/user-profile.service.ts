import { Inject, Injectable } from '@angular/core';
import { User } from '../models/users/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }
  findById(id: string) {
    return this.http.get<User>(`${this.baseUrl}api/UserProfile/${id}`);
  }
}
