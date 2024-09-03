import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppNotification, AppNotificationForm } from '../models/notification.models';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class NotificationService { 

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

  public save = ( body: AppNotificationForm): Observable<BasicResponse >=> {
    return this.http.post<BasicResponse>(this.baseUrl + 'api/Notification/save', body);
  }

  findById(id: string):Observable<AppNotificationForm> {
    return this.http.get<AppNotificationForm>(`${this.baseUrl}api/Notification/${id}`);
  } 
  initialize():Observable<AppNotificationForm> {
    return this.http.get<AppNotificationForm>(`${this.baseUrl}api/Notification/init`);
  } 
  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<AppNotification>> => {
    return this.http.get<PagedList<AppNotification>>(
      `${this.baseUrl}api/Notification/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
