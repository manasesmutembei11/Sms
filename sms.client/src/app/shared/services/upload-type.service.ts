import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { LookupItem } from '../models/responses/lookup-item';
import { UploadMimeType, UploadType } from '../models/uploads/upload-type';

@Injectable({
  providedIn: 'root'
})
export class UploadTypeService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

  public save = ( body: UploadType): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/uploadType/save', body);
  }

  mimeTypes():Observable<UploadMimeType[]> {
    return this.http.get<UploadMimeType[]>(`${this.baseUrl}api/uploadType/mimetypes`);
  }
  findById(id: string):Observable<UploadType> {
    return this.http.get<UploadType>(`${this.baseUrl}api/uploadType/${id}`);
  }

  public lookupList = (
  ): Observable<LookupItem[]> => {
    return this.http.get<LookupItem[]>(
      `${this.baseUrl}api/uploadType/lookuplist`
    );
  };
  public list = (
    pageNumber: number,
    pageSize: number,
    search: string
  ): Observable<PagedList<UploadType>> => {
    return this.http.get<PagedList<UploadType>>(
      `${this.baseUrl}api/uploadType/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );
  };
}
