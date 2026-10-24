import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestPlanService } from '../../services/test-plan.service';
import { testPlanPayload, testPlanResponse } from '../../models/testPlan';
import { CommonModule } from '@angular/common';
declare var bootstrap:any;
@Component({
  selector: 'app-test-plan',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './test-plan.component.html',
  styleUrl: './test-plan.component.css'
})
export class TestPlanComponent implements OnInit, AfterViewInit {
  @ViewChild('myModal') modalElement!:ElementRef;
  private modalInstance:any;
  tpService = inject(TestPlanService);
  testPlanForm:FormGroup=new FormGroup({
    testPlanCode: new FormControl("",[Validators.required,Validators.maxLength(100)]),
    testPlanTitle: new FormControl("",[Validators.required,Validators.maxLength(250)]),
    environment:new FormControl("",[Validators.required,Validators.maxLength(100)]),
    testSteps: new FormControl("",[Validators.maxLength(8000)]),
    scope:new FormControl("",[Validators.maxLength(4000)]),
    preconditions:new FormControl("",[Validators.maxLength(4000)]),
    expectedResult:new FormControl("",[Validators.maxLength(4000)])
  });
  isEditMode:boolean=false;
  selectedID:number=0;

  newTP:testPlanPayload={
    testPlanCode:"",
    testPlanTitle:"",
    environment:"",
    testSteps:"",
    scope:"",
    preconditions:"",
    expectedResult:""
  }

  testPlans:testPlanResponse[]=[];

  ngOnInit(): void {
    this.getTestPlans();
  }

  ngAfterViewInit(): void {
    // Initialize the Bootstrap Modal instance
    this.modalInstance= new bootstrap.Modal(this.modalElement.nativeElement);
  }
  
  closeModal(){
    this.modalInstance.hide();
  }

  openModal(){
    this.modalInstance.show();
  }

  onAddClick(){
    this.testPlanForm.reset();
    this.isEditMode=false;
    this.openModal();
  }

  handleSaveOrUpdate(){
    if(this.isEditMode==false){
      this.onSave()
    }else{
      this.onUpdate()
    }
  }

  onSave(){
    if(this.testPlanForm.valid){
      this.tpService.createTestPlan(this.newTP).subscribe({
        next:(response)=>{
          console.log('Saved successfully:', response);
          this.testPlanForm.reset();
          this.closeModal();
          this.getTestPlans();
        },
        error:(err)=>{
          console.log('Error saving test plans:', err);
        }
      })
    }
  }

  onUpdate(){
    this.tpService.updateTestPlan(this.selectedID,this.newTP).subscribe({
      next:(response)=>{
          console.log('Update successfully:', response);
          this.testPlanForm.reset();
          this.closeModal();
          this.getTestPlans();
      },
      error:(err)=>{
         console.log('Error updating test plans:', err);
      }
    })
  }

  onDelete(testPlanID:number){
    this.tpService.deleteTestPlan(testPlanID).subscribe({
      next:(response)=>{
        this.getTestPlans();
        console.log('Delete successfully:', response);
      },
      error:(err)=>{
        console.log('Error deleting test plan:', err);
      }
    })
  }

  onEdit(testPlan:testPlanResponse){
    this.testPlanForm.reset();
    this.isEditMode=true;
    this.openModal();
    this.selectedID=testPlan.testPlanID;
    this.newTP.testPlanCode = testPlan.testPlanCode;
    this.newTP.testPlanTitle = testPlan.testPlanTitle;
    this.newTP.environment = testPlan.environment;
    this.newTP.testSteps = testPlan.testSteps;
    this.newTP.scope = testPlan.scope;
    this.newTP.preconditions = testPlan.preconditions;
    this.newTP.expectedResult = testPlan.expectedResult;
  }

  getTestPlans(){
    this.tpService.getTestPlans().subscribe({
      next:(response)=>{
        this.testPlans=response;
        console.log('Get Plans Successfully:', response);
      },
      error:(err)=>{
         console.log('Error in getting test plans:', err);
      }
    })
  }



}
