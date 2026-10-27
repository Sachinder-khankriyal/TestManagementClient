export interface TestRunPayload {
  testPlanId: number;
  testCaseIds: number[];
  startDate: Date | string;
  endDate: Date | string;
  environment: string;
  executorName: string;
  additionalDetails?: string;
  attachments: File[];
}

export interface TestRunResponse {
  testRunId: number;
  testPlanTitle: string;
  testCases: TestRunTestCase[];
  startDate:Date;
  endDate:Date;
  environment:string;
  executorName:string;
  additionalDetails:string;
  attachments: TestRunAttachment[];
}

export interface TestRunWithTCId {
  testRunId: number;
  testPlanId: number;
  testCaseIds: number[];
  startDate:Date;
  endDate:Date;
  environment:string;
  executorName:string;
  additionalDetails:string;
  attachments: TestRunAttachment[];
}

export interface TestRunTestCase{
    testCaseId:number;
    testCaseTitle:string;
}

export interface TestRunAttachment{
    attachmentId:number,
    fileName:string,
    contentType:string,
    storagePath:string
}