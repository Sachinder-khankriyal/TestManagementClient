import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequirementList, RequirementPayLoad, RequirementResponse } from '../models/requirement';
import { Observable } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  constructor(private http: HttpClient) { }

  getRequirements(): Observable<RequirementResponse[]> {
    return this.http.get<RequirementResponse[]>(Constant.API_URL + "requirement");
  }

  createRequirement(data: RequirementPayLoad): Observable<RequirementResponse> {
    return this.http.post<RequirementResponse>(Constant.API_URL + "requirement", data);
  }

   updateRequirement(RequirementID:number,data: RequirementPayLoad): Observable<RequirementResponse> {
    return this.http.put<RequirementResponse>(`${Constant.API_URL}requirement/${RequirementID}`, data);
  }

   deleteRequirement(RequirementID:number): Observable<boolean> {
    return this.http.delete<boolean>(`${Constant.API_URL}requirement/${RequirementID}`);
  }

    getRequirementDropdown(): Observable<RequirementList[]> {
    return this.http.get<RequirementList[]>(`${Constant.API_URL}requirement/RequirementList`);
  }
}
