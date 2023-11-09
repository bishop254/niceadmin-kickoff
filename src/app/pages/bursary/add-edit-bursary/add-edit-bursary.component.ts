import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-add-edit-bursary',
  templateUrl: './add-edit-bursary.component.html',
  styleUrls: ['./add-edit-bursary.component.scss'],
})
export class AddEditBursaryComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  isEdit?: boolean = false;
  list: any[] = [];

  bursaryForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService
  ) {}

  ngOnInit(): void {
    this.bursaryForm = new FormGroup({
      bursary_name: new FormControl('', [Validators.required]),
      bursary_description: new FormControl('', [Validators.required]),
      bursary_amount: new FormControl('', [Validators.required]),
      criteria: new FormControl('', [Validators.required]),
      application_start_date: new FormControl('', [Validators.required]),
      application_end_date: new FormControl('', [Validators.required]),
      review_start_date: new FormControl('', [Validators.required]),
      review_end_date: new FormControl('', [Validators.required]),
      notification_date: new FormControl('', [Validators.required]),
      disbursement_date: new FormControl('', [Validators.required]),
      status: new FormControl(true), // assuming 'status' is a boolean field
    });
  }

  submit() {
    if (this.isEdit) {
      console.log(this.bursaryForm.value);
    } else {
      console.log('this.bursaryForm.value');

      let model = {
        bursary_name: this.bursaryForm.controls['bursary_name'].value,
        bursary_description:
          this.bursaryForm.controls['bursary_description'].value,
        bursary_amount:
          this.bursaryForm.controls['bursary_amount'].value.toString(),
        criteria: this.bursaryForm.controls['criteria'].value,
        application_start_date: new Date(
          this.bursaryForm.controls['application_start_date'].value
        ).toISOString(),
        application_end_date: new Date(
          this.bursaryForm.controls['application_end_date'].value
        ).toISOString(),
        review_start_date: new Date(
          this.bursaryForm.controls['review_start_date'].value
        ).toISOString(),
        review_end_date: new Date(
          this.bursaryForm.controls['review_end_date'].value
        ).toISOString(),
        notification_date: new Date(
          this.bursaryForm.controls['notification_date'].value
        ).toISOString(),
        disbursement_date: new Date(
          this.bursaryForm.controls['disbursement_date'].value
        ).toISOString(),
        status: this.bursaryForm.controls['status'].value,
      };

      let saveAssessor = this.httpService
        .postReq('bursary/create', model)
        .subscribe({
          next: (resp) => {
            console.log(resp);

            if (resp) {
              this.bsModalRef.hide();
              this.bsModalRef.onHide?.emit(resp);
              // this.toastr.success(resp['message'], 'Assessor Staged');
            } else {
              // this.toastr.error(resp['message'], 'Assessor Not Staged');
            }
            // this.router.navigate(['/assessors/staged-assessors']);
          },
          error: (error) => {
            // Handle the error here
            // this.loading = false;
            // this.toastr.error(
            //   error['statusText'] || error['message'] || error.error['message'],
            //   'Assessor Not Staged'
            // );
            // this.getIndividualData(0);
          },
        });
    }
  }
}
