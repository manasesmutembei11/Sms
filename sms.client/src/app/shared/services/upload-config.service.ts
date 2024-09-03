import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { PagedList } from '../models/paged-list';
import { OperationType } from '../models/uploads/operation-type';
import { UploadConfig } from '../models/uploads/upload-config';

@Injectable({
  providedIn: 'root'
})
export class UploadConfigService {



  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

  public save = ( body: UploadConfig): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/uploadconfig/save', body);
  }
  public delete = ( body: UploadConfig): Observable<BasicResponse >=> {

    return this.http.post<BasicResponse>(this.baseUrl + 'api/uploadconfig/delete', body);
  }




  findById(id: string):Observable<UploadConfig> {
    return this.http.get<UploadConfig>(`${this.baseUrl}api/uploadconfig/${id}`);
  }


  public  getOperationTypes = (): Observable<OperationType[]> => {
    return this.http.get<OperationType[]>(
      `${this.baseUrl}api/uploadconfig/UploadOperations`
    );
  };

  public  getOperationUploadTypes = (id:number | undefined): Observable<UploadConfig[]> => {

      return this.http.get<UploadConfig[]>(
        `${this.baseUrl}api/uploadconfig/OperationUploadTypes/${id}`
      );



  };



}
