export interface TestCasePayload{
    testCaseCode:string,
    testCaseTitle:string,
    testPlanIds:number[],
    requirementIds:number[]
}

export interface TestCaseResponse {
    testCaseID: number;
  testCaseCode: string;
  testCaseTitle: string;
  testPlans: TestCaseTestPlan[];
  requirements: TestCaseRequirement[];
}

export interface TestCaseTestPlan {
  testPlanId: number;
  testPlanTitle: string;
}

export interface TestCaseRequirement {
  requirementId: number;
  requirementName: string;
}

export interface TestCaseGetByID extends TestCasePayload{
  testCaseID: number;
}