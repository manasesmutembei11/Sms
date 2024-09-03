import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { ReportGroupItem } from '../models/reports/report-group-item';
import { ReportConfiguration } from "../models/reports/report-viewer-configuration";


@Injectable({
  providedIn: 'root'
})
export class ReportGroupItemService {


  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }



  public save = ( body: ReportGroupItem): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/reportgroupitem/save', body);
  }


  findById(id: string):Observable<ReportGroupItem> {
    return this.http.get<ReportGroupItem>(`${this.baseUrl}api/reportgroupitem/${id}`);
  }
  getReportConfiguration(id: string):Observable<ReportConfiguration> {
    return this.http.get<ReportConfiguration>(`${this.baseUrl}api/reportgroupitem/ReportConfiguration/${id}`);
  }


  public list = (
    groupId:string,
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<ReportGroupItem>> => {
    return this.http.get<PagedList<ReportGroupItem>>(
      `${this.baseUrl}api/reportgroupitem/pagedlist?groupId=${groupId}&pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
