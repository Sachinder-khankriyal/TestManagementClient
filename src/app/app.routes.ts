import { Routes } from '@angular/router';
import { RequirementComponent } from './components/requirement/requirement.component';
import { TestPlanComponent } from './components/test-plan/test-plan.component';
import { TestCaseComponent } from './components/test-case/test-case.component';

export const routes: Routes = [
    {
        path: "",
        component: RequirementComponent
    },
    {
        path: "requirement",
        component: RequirementComponent
    },
    {
        path: "testPlan",
        component: TestPlanComponent
    },
    {
        path: "testCase",
        component: TestCaseComponent
    }
];
