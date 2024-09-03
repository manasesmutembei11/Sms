import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { ReportGroup } from '../models/reports/report-group';


@Injectable({
  providedIn: 'root'
})
export class ReportGroupService {


  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }



  public save = ( body: ReportGroup): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/reportgroup/save', body);
  }


  findById(id: string):Observable<ReportGroup> {
    return this.http.get<ReportGroup>(`${this.baseUrl}api/reportgroup/${id}`);
  }
  reports():Observable<ReportGroup[]> {
    return this.http.get<ReportGroup[]>(`${this.baseUrl}api/reportgroup/reports`);
  }

  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<ReportGroup>> => {
    return this.http.get<PagedList<ReportGroup>>(
      `${this.baseUrl}api/reportgroup/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
