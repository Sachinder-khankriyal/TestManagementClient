import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestRunPayload, TestRunResponse, TestRunWithTCId } from '../models/testRun';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class TestRunService {

  constructor(private http:HttpClient) { }

  getAll():Observable<TestRunResponse[]>{
    return this.http.get<TestRunResponse[]>(Constant.API_URL+"testRun");
  }

  getById(testRunID:number):Observable<TestRunWithTCId>{
    return this.http.get<TestRunWithTCId>(`${Constant.API_URL}testRun/${testRunID}`)
  }

  createTestRun(data:FormData):Observable<TestRunWithTCId>{
    return this.http.post<TestRunWithTCId>(Constant.API_URL+"testRun",data);
  }

  updateTestRun(testRunID:number,data:FormData):Observable<TestRunWithTCId>{
    return this.http.put<TestRunWithTCId>(`${Constant.API_URL}testRun/${testRunID}`,data);
  }

  delete(testRunID:number):Observable<any>{
    return this.http.delete<any>(`${Constant.API_URL}testRun/${testRunID}`);
  }

  downloadAttachment(id: number): Observable<Blob> {
  return this.http.get(
    `${Constant.API_URL}testRun/attachments/${id}/download`,
    { responseType: 'blob' }
  );
}
}
