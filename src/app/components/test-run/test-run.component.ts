import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TestRunAttachment, TestRunResponse } from '../../models/testRun';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { testPlansList } from '../../models/testPlan';
import { TestPlanService } from '../../services/test-plan.service';
import { TestCaseService } from '../../services/test-case.service';
import { TestCasesList } from '../../models/testCase';
import { TestRunService } from '../../services/test-run.service';
declare var bootstrap: any;
@Component({
  selector: 'app-test-run',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './test-run.component.html',
  styleUrl: './test-run.component.css'
})
export class TestRunComponent implements OnInit,AfterViewInit {
  tpService = inject(TestPlanService);
  tcService = inject(TestCaseService);
  trService = inject(TestRunService);

  @ViewChild('myModal') modelElement!: ElementRef;
  private modalInstance: any;
  isEditMode: boolean = false;
  testRuns: TestRunResponse[] = [];
  testPlansList: testPlansList[] = [];
  testCasesList: TestCasesList[] = [];
  attachmentList:TestRunAttachment[]=[];
  selectedTestRunId: number = 0;
   @ViewChild('fileInput') fileInput!: ElementRef;


  testRunForm: FormGroup = new FormGroup({
    testPlanId: new FormControl("", [Validators.required]),
    testCaseIds: new FormControl([], [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    endDate: new FormControl("", [Validators.required]),
    environment: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    executorName: new FormControl("", [Validators.required, Validators.maxLength(200)]),
    additionalDetails: new FormControl("", [Validators.maxLength(4000)]),
    attachments: new FormControl<File[]>([])
  });

  selectedFiles: File[] = [];

  ngAfterViewInit(): void {
    this.modalInstance= new bootstrap.Modal(this.modelElement.nativeElement);
  }

  ngOnInit(): void {
    this.getTestPlansList();
    this.getTestRuns();
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

  onAddClick() {
    this.isEditMode=false;
    this.resetForm();
    this.testCasesList=[];
    this.openModal();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    this.selectedFiles = Array.from(input.files ?? []);

    this.testRunForm.patchValue({
      attachments: this.selectedFiles
    });
  }

  getTestRuns(){
     this.trService.getAll().subscribe({
        next: response => {
          console.log('Created successfully', response);
          this.testRuns =response;
        },
        error: error => {
          console.log(error);
        }
      })
  }

  getTestCaseTitles(testCases: any[]): string {
  return (testCases ?? [])
    .map(tc => tc.testCaseTitle)
    .join(', ');
}

resetForm(){
  this.testRunForm.reset();
   if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }
}

  onDelete(testRunId: number) {
    this.trService.delete(testRunId).subscribe({
      next: (response) => {
        this.getTestRuns();
      },
      error: (err) => {
        console.log("Error");
      }
    })
  }

  onEdit(testRunId: number) {
    this.isEditMode = true;
    this.selectedTestRunId=testRunId;
    this.resetForm();
    this.getTestRunById(testRunId);
    this.openModal();
  }

  getTestRunById(testRunId: number) {
    this.trService.getById(testRunId).subscribe({
      next: (response) => {
        this.getTestCasessList(response.testPlanId)
        this.testRunForm.patchValue({
          testPlanId: response.testPlanId,
          testCaseIds: response.testCaseIds,
          startDate: new Date(response.startDate).toISOString().split('T')[0],
          endDate: new Date(response.endDate).toISOString().split('T')[0],
          environment: response.environment,
          executorName: response.executorName,
          additionalDetails: response.additionalDetails
        });
        this.attachmentList = response.attachments;
      },
      error: (err) => {
        console.log("Error in getting Test Run");
      }
    })
  }

  getTestPlansList() {
    this.tpService.getTestPlanDropdown().subscribe({
      next: (response) => {
        this.testPlansList = response;
        console.log("Get Test Plan List");
      },
      error: (err) => {
        console.log("Not getting Test Plan List");
      }
    })
  }

  onTestPlanChange() {
    this.getTestCasessList(this.testRunForm.value.testPlanId);
  }

  getTestCasessList(testPlanID: number) {
    this.tcService.getTestCasesByTestPlan(testPlanID).subscribe({
      next: (response) => {
        this.testCasesList = response;
        console.log("Get Test Plan List");
      },
      error: (err) => {
        console.log("Not getting Test Plan List");
      }
    })
  }

  handleSaveOrUpdate() {
    if (this.testRunForm.valid) {
      const formData = new FormData();

      formData.append('testPlanId', this.testRunForm.value.testPlanId);

      this.testRunForm.value.testCaseIds.forEach((id: number) => {
        formData.append('testCaseIds', id.toString());
      });

      formData.append('startDate', this.testRunForm.value.startDate);
      formData.append('endDate', this.testRunForm.value.endDate);
      formData.append('environment', this.testRunForm.value.environment);
      formData.append('executorName', this.testRunForm.value.executorName);
      formData.append(
        'additionalDetails',
        this.testRunForm.value.additionalDetails ?? ''
      );

      this.selectedFiles.forEach(file => {
        formData.append('attachments', file, file.name);
      });

 

      if (this.isEditMode == false) {
        this.save(formData)
      } else {
        this.update(this.selectedTestRunId,formData)
      }
    }
  }

  save(formData:FormData) {
      this.trService.createTestRun(formData).subscribe({
        next: response => {
          console.log('Created successfully', response);
          this.getTestRuns();
          this.resetForm();
          this.closeModal();
        },
        error: error => {
          console.error(error);
        }
      });
  }

  update(TestRunId:number,formData:FormData) {
      this.trService.updateTestRun(TestRunId,formData).subscribe({
        next: response => {
          console.log('Updated successfully', response);
          this.getTestRuns();
          this.closeModal();
          this.resetForm();
        },
        error: error => {
          console.error(error);
        }
      })
  }

 downloadAttachment(id: number): void {
  this.trService.downloadAttachment(id).subscribe({
    next: (blob: Blob) => {
      const attachment = this.attachmentList.find(a => a.attachmentId === id);
      const fileName = attachment?.fileName ?? 'attachment';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url);
    },
    error: error => {
      console.log('Error downloading attachment:', error);
    }
  });
}

  

}
