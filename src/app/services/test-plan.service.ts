import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { testPlanPayload, testPlanResponse, testPlansList } from '../models/testPlan';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class TestPlanService {

  constructor(private http:HttpClient) {}

  getTestPlans():Observable<testPlanResponse[]>{
    return this.http.get<testPlanResponse[]>(Constant.API_URL+"testPlan");
  }

  createTestPlan(data:testPlanPayload):Observable<testPlanPayload>{
    return this.http.post<testPlanPayload>(Constant.API_URL+"testPlan",data)
  }

  updateTestPlan(TestPlanID:number,data:testPlanPayload):Observable<testPlanPayload>{
    return this.http.put<testPlanPayload>(`${Constant.API_URL}testPlan/${TestPlanID}`,data)
  }

  deleteTestPlan(TestPlanID:number){
    return this.http.delete<boolean>(`${Constant.API_URL}testPlan/${TestPlanID}`);
  }

    getTestPlanDropdown():Observable<testPlansList[]>{
    return this.http.get<testPlansList[]>(`${Constant.API_URL}testPlan/testPlansList`);
  }

}
