import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppGroupContact } from '../models/group-contact';
import { BasicResponse } from '../models/basic-response';
import { Observable } from 'rxjs';
import { PagedList } from '../models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class GroupContactService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }



  public save = ( body: AppGroupContact): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/AppGroupContact/save', body);
  }


  findById(id: string):Observable<AppGroupContact> {
    return this.http.get<AppGroupContact>(`${this.baseUrl}api/AppGroupContact/${id}`);
  }
  

  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<AppGroupContact>> => {
    return this.http.get<PagedList<AppGroupContact>>(
      `${this.baseUrl}api/AppGroupContact/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
