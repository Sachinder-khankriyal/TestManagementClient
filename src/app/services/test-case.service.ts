import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestCaseGetByID, TestCasePayload, TestCaseResponse, TestCasesList } from '../models/testCase';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http:HttpClient) { }

  getTestCases():Observable<TestCaseResponse[]>{
    return this.http.get<TestCaseResponse[]>(Constant.API_URL+"testCase");
  }

  createTestCase(data:TestCasePayload):Observable<TestCaseResponse>{
    return this.http.post<TestCaseResponse>(Constant.API_URL+"testCase",data);
  }

  updateTestCase(testCaseID:number, data:TestCasePayload):Observable<TestCaseResponse>{
    return this.http.put<TestCaseResponse>(`${Constant.API_URL}testCase/${testCaseID}`,data);
  }

  deleteTestCase(testCaseID:number):Observable<TestCaseResponse>{
    return this.http.delete<TestCaseResponse>(`${Constant.API_URL}testCase/${testCaseID}`);
  }

  getTestCaseById(testCaseID:number):Observable<TestCaseGetByID>{
    return this.http.get<TestCaseGetByID>(`${Constant.API_URL}testCase/${testCaseID}`);
  }

  getTestCasesByTestPlan(testCaseID:number):Observable<TestCasesList[]>{
    return this.http.get<TestCasesList[]>(`${Constant.API_URL}testCase/TestCasesListByTestPlan/${testCaseID}`);
  }
}
