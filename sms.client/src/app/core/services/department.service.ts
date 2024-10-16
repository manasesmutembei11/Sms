import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { BasicResponse } from '../../shared/models/basic-response';
import { PagedList } from '../../shared/models/paged-list';
import { LookupItem } from '../../shared/models/lookup-item';


@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: "https://localhost:7117/"
    ) { }
    public save = (body: Department): Observable<BasicResponse> => {
        return this.http.post<BasicResponse>(this.baseUrl + 'api/Department/save', body);
    };
    findById(id: string): Observable<Department> {
        return this.http.get<Department>(`${this.baseUrl}api/Department/${id}`);
    }
    public list = (
        pageNumber: number,
        pageSize: number,
        search: string
    ): Observable<PagedList<Department>> => {
        return this.http.get<PagedList<Department>>(
            `${this.baseUrl}api/Department/pagedlist?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
        );
    };
    public lookupList = (): Observable<LookupItem[]> => {
        return this.http.get<LookupItem[]>(
            `${this.baseUrl}api/Department/lookuplist/`
        );
    };
    public delete = (id: string): Observable<BasicResponse> => {
        return this.http.delete<BasicResponse>(`${this.baseUrl}api/Department/Delete/${id}`);
    };
}
