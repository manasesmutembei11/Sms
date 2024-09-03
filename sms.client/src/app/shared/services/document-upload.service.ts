import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from '../models/basic-response';
import { DocumentUploadType, DocumentUploadTypeItem } from '../models/uploads/document-upload-type';


@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  constructor(
    private http: HttpClient,
     @Inject('BASE_URL') private baseUrl: string) { }

   getDocuments(operationTypeId: number, refId: string): Observable<DocumentUploadType[]> {
     return this.http.get<DocumentUploadType[]>(`${this.baseUrl}api/documentupload/UploadTypes/${operationTypeId}/${refId}`);
   }

   public delete = ( body: DocumentUploadTypeItem): Observable<BasicResponse >=> {
    return this.http.post<BasicResponse>(this.baseUrl + 'api/documentupload/delete', body);
  }

  getUploadedDocuments(refId: string): Observable<DocumentUploadType[]> {
    return this.http.get<DocumentUploadType[]>(`${this.baseUrl}api/documentupload/Uploads/${refId}`);
  }


}
