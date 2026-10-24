import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TestCasePayload, TestCaseResponse } from '../../models/testCase';
import { TestCaseService } from '../../services/test-case.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestPlanService } from '../../services/test-plan.service';
import { testPlansList } from '../../models/testPlan';
import { RequirementService } from '../../services/requirement.service';
import { RequirementList } from '../../models/requirement';
declare var bootstrap:any;
@Component({
  selector: 'app-test-case',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './test-case.component.html',
  styleUrl: './test-case.component.css'
})
export class TestCaseComponent implements OnInit,AfterViewInit {
  tcService = inject(TestCaseService);
  tpService = inject(TestPlanService);
  reqService = inject(RequirementService);
  isEditMode:boolean=false;
  selectedID:number=0;

  testCaseForm:FormGroup=new FormGroup({
    testCaseCode:new FormControl("",[Validators.required,Validators.maxLength(100)]),
    testCaseTitle:new FormControl("",[Validators.required,Validators.maxLength(250)]),
    testPlanIds:new FormControl([],[Validators.required]),
    requirementIds:new FormControl([],[Validators.required])
  });
  
  @ViewChild('myModal') modelElement!:ElementRef;
   private modalInstance:any;

  testCases:TestCaseResponse[]=[];
  testPlansList:testPlansList[]=[];
  requirementsList:RequirementList[]=[];

  ngAfterViewInit(): void {
    this.modalInstance= new bootstrap.Modal(this.modelElement.nativeElement);
  }

  ngOnInit(): void {
    this.getTestCases();
    this.getTestPlansList();
    this.getRequirementList();
  }

   closeModal(){
    this.modalInstance.hide();
  }

  openModal(){
    this.modalInstance.show();
  }

  onAddClick(){
    this.isEditMode=false;
    this.testCaseForm.reset();
    this.openModal();
  }

  getTestCases(){
    this.tcService.getTestCases().subscribe({
      next:(response)=>{
        this.testCases=response;
        console.log("Get Test Plan Successfully")
      },
      error:(err)=>{
        console.log("Getting Error",err)
      }
    })
  }

  onDelete(testCaseID:number){
    this.tcService.deleteTestCase(testCaseID).subscribe({
      next:(response)=>{
        this.getTestCases();
        console.log("Deleted Successfully");
      },
      error:(err)=>{
        console.log("Error in deleting",err);
      }
    })
  }

  onEdit(testCaseID:number){
    this.testCaseForm.reset();
    this.isEditMode=true;
    this.selectedID=testCaseID;
    this.getTestCaseById(testCaseID);
    this.openModal();
  }

  getTestCaseById(testCaseID:number){
    this.tcService.getTestCaseById(testCaseID).subscribe({
      next:(response)=>{
        this.testCaseForm.patchValue({
        testCaseCode: response.testCaseCode,
        testCaseTitle: response.testCaseTitle,
        requirementIds: response.requirementIds,
        testPlanIds: response.testPlanIds
      });

        console.log("Get Test Case Successfully");
      },
      error:(err)=>{
        console.log("Error in getting Test Case",err)
      }
    })
  }

  getTestPlansList(){
    this.tpService.getTestPlanDropdown().subscribe({
      next:(response)=>{
        this.testPlansList=response;
        console.log("Get Test Plan List");
      },
      error:(err)=>{
        console.log("Not getting Test Plan List");
      }
    })
  }

  getRequirementList(){
    this.reqService.getRequirementDropdown().subscribe({
      next:(response)=>{
        this.requirementsList=response;
        console.log("Getting requirement");
      },
      error:(err)=>{
        console.log("Error in getting requirement");
      }
    });
  }

  handleSaveOrUpdate(){
    if(this.isEditMode==false){
      this.Save();
    }else{
      this.Update(this.selectedID);
    }
  }

  Save(){
    this.tcService.createTestCase(this.testCaseForm.value).subscribe({
      next:(response)=>{
        this.getTestCases();
        this.testCaseForm.reset();
        this.closeModal();
        console.log("Get Test Case");
      },
      error:(err)=>{
        console.log("Getting error",err)
      }
    })
  }

  Update(testCaseID:number){
    this.tcService.updateTestCase(testCaseID,this.testCaseForm.value).subscribe({
      next:(response)=>{
        this.getTestCases();
        this.closeModal();
        console.log("Getting response");
      },
      error:(err)=>{
        console.log("Error in updating");
      }
    })
  }



  

  


}
