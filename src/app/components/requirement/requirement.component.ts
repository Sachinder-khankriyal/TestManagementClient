import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequirementPayLoad, RequirementResponse, RequirementUpdatePayLoad } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
declare var bootstrap: any;
@Component({
  selector: 'app-requirement',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './requirement.component.html',
  styleUrl: './requirement.component.css'
})
export class RequirementComponent implements AfterViewInit, OnInit {
  @ViewChild('myModal') modalElement!: ElementRef;
  private modalInstance: any;
  private reqService = inject(RequirementService);
  requirementForm: FormGroup = new FormGroup({
    requirementName: new FormControl("", [Validators.required, Validators.maxLength(200)]),
    requirementCode: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    requirementDetails: new FormControl("", [Validators.maxLength(4000)])
  });
  requirements: RequirementResponse[] = [];
  isEditMode: boolean = false;
  selectedID:number=0;

  newReq: RequirementPayLoad = {
    requirementName: "",
    requirementCode: "",
    requirementDetails: ""
  }

   updtReq: RequirementUpdatePayLoad = {
    requirementID:0,
    requirementName: "",
    requirementCode: "",
    requirementDetails: ""
  }

  ngOnInit(): void {
    this.getRequirements();
  }

  ngAfterViewInit() {
    // Initialize the Bootstrap Modal instance
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

  onAddClick(){
    this.requirementForm.reset();
    this.isEditMode=false;
    this.openModal();
  }

  onSave(): void {
    if (this.requirementForm.valid) {
      this.reqService.createRequirement(this.newReq).subscribe({
        next: (response) => {
          console.log('Saved successfully:', response);
          this.requirementForm.reset();
          this.closeModal();
          this.getRequirements();
        },
        error: (err) => {
          console.log('Error saving user:', err);
        }
      });
    }
  }

  getRequirements() {
    this.reqService.getRequirements().subscribe({
      next: (response) => {
        this.requirements = response
      },
      error: (err) => {
        console.log('Error saving user:', err);
      }
    });
  }

  onEdit(requirement: RequirementResponse) {
    this.requirementForm.reset();
    this.selectedID=requirement.requirementID;
    this.newReq.requirementCode = requirement.requirementCode;
    this.newReq.requirementName = requirement.requirementName;
    this.newReq.requirementDetails = requirement.requirementDetails;
    this.isEditMode=true;
    this.openModal();
  }

  handleSaveOrUpdate() {
  if (this.isEditMode === false) {
    this.onSave();
  } else {
    this.onUpdate();
  }
}

  onUpdate(){
    this.updtReq.requirementID = this.selectedID;
    this.updtReq.requirementCode = this.newReq.requirementCode;
    this.updtReq.requirementName = this.newReq.requirementName;
    this.updtReq.requirementDetails = this.newReq.requirementDetails;
    
        this.reqService.updateRequirement(this.selectedID,this.updtReq).subscribe({
        next: (response) => {
          console.log('Updated successfully:', response);
          this.requirementForm.reset();
          this.closeModal();
          this.getRequirements();
        },
        error: (err) => {
          console.log('Error updating user:', err);
        }
      });
  }
  onDelete(requirementID:number){
       this.reqService.deleteRequirement(requirementID).subscribe({
        next: (response) => {
          console.log('Delete successfully:', response);
          this.getRequirements();
        },
        error: (err) => {
          console.log('Error deleting user:', err);
        }
      });
  }

}
