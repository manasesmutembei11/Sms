import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { DocumentTemplate } from '../models/document-template.model';
import { PagedList } from '../models/paged-list';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }






  findById(id: string):Observable<DocumentTemplate> {
    return this.http.get<DocumentTemplate>(`${this.baseUrl}api/DocumentTemplate/${id}`);
  }


  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<DocumentTemplate>> => {
    return this.http.get<PagedList<DocumentTemplate>>(
      `${this.baseUrl}api/DocumentTemplate/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
