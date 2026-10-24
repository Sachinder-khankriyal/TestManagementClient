export interface testPlanPayload{
    testPlanCode:string,
    testPlanTitle:string,
    environment:string,
    testSteps:string,
    scope:string,
    preconditions:string,
    expectedResult:string
}

export interface testPlanResponse extends testPlanPayload{
    testPlanID:number
}

export interface testPlansList{
    testPlanID:number,
    testPlanTitle:string
}



