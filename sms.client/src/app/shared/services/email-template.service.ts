import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplate } from '../models/email-template.model';
import { PagedList } from '../models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }
  
  findById(id: string):Observable<EmailTemplate> {
    return this.http.get<EmailTemplate>(`${this.baseUrl}api/EmailTemplate/${id}`);
  }
  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<EmailTemplate>> => {
    return this.http.get<PagedList<EmailTemplate>>(
      `${this.baseUrl}api/EmailTemplate/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
