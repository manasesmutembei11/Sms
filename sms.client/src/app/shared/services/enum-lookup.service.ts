import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { EnumLookupItem } from '../models/responses/lookup-item';

@Injectable({
    providedIn: 'root'
})
export class EnumLookupService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: "https://localhost:7117/") { }

    public documentTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/DocumentTemplateList`);
    };

    public genderList = (): Observable<EnumLookupItem[]> => {
        const items: EnumLookupItem[] = [
            { id: 1, name: 'FEMALE' },
            { id: 2, name: 'MALE' }
        ]
        return of(items)
        //return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/genderList`);
    };


    public costCenterTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/costCenterTypeList`);
    };
    public appTaskScopeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AppTaskScopeList`);
    };

    public chargeTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/ChargeTypeList`);
    };


    public appContactTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AppContactTypeList`);
    };
    public appNotificationTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AppNotificationTypeList`);
    };



    public emailAddressTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/EmailAddressTypeList`);
    };
    public appGroupContactTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AppGroupContactTypeList`);
    };
    public areaTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AreaTypeList`);
    };
    public yearList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/YearList`);
    };

    public vehicleBodyTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/VehicleBodyTypeList`);
    };
    public assessmentRecommendationList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AssessmentRecommendationList`);
    };
    public assessmentSurveyItemValueList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/AssessmentSurveyItemValueList`);
    };
    public surveyItemTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/SurveyItemTypeList`);
    };
    public surveyItemInputTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/SurveyItemInputTypeList`);
    };
    public partGroupList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/PartGroupList`);
    };
    public transmissionTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/TransmissionTypeList`);
    };

    public scrapHandlingTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/ScrapHandlingTypeList`);
    };
    public paymentMethodList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/PaymentMethodList`);
    };
    public statusTypeList = (): Observable<EnumLookupItem[]> => {
        return this.http.get<EnumLookupItem[]>(`${this.baseUrl}api/EnumLookup/RepairItemStatusTypeList`);
    };











}
