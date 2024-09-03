import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { LookupItem } from '../models/responses/lookup-item';
import { Role } from '../models/users/role';
import { RolePermissions } from '../models/users/role-permissions';
import { UserRole } from '../models/users/user';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}
  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<Role>> => {
    return this.http.get<PagedList<Role>>(
      `${this.baseUrl}api/role/roles?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
  public save = ( body: Role) => {
    return this.http.post<BasicResponse>(this.baseUrl + 'api/role/save', body);
  }
  findById(id: string) {
    return this.http.get<Role>(`${this.baseUrl}api/role/${id}`);
  }
  delete(id: string) {
    return this.http.delete<Role>(`${this.baseUrl}api/role/${id}`);
  }
  getPermissions(id: string) : Observable<RolePermissions> {
    return this.http.get<RolePermissions>(`${this.baseUrl}api/role/permissions/${id}`);
  }

  public savePermission = ( body: RolePermissions) => {
    return this.http.post<BasicResponse>(this.baseUrl + 'api/role/savepermissions', body);
  }

  public lookupList = (
    ): Observable<UserRole[]> => {
      return this.http.get<UserRole[]>(
        `${this.baseUrl}api/role/lookuplist`
      );
    };
}
