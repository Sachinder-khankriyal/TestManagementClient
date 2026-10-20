import { CommonModule } from '@angular/common';
import { AfterViewInit, Component,ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-requirement',
  imports: [CommonModule],
  templateUrl: './requirement.component.html',
  styleUrl: './requirement.component.css'
})  
export class RequirementComponent implements AfterViewInit {
  @ViewChild('myModal') modalElement!: ElementRef;
    private modalInstance: any;

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

}
