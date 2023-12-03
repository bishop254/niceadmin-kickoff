import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { BursaryModule } from '../../bursary/bursary.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve-student',
  templateUrl: './approve-student.component.html',
  styleUrls: ['./approve-student.component.scss'],
})
export class ApproveStudentComponent {
  title?: string;
  closeBtnName?: string;
  studRef?: string = '';
  apprStat!: boolean;
  list: any[] = [];

  wardApprovalForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.wardApprovalForm = new FormGroup({
      amount: new FormControl(
        {
          value: this.apprStat ? '' : 0,
          disabled: this.apprStat ? false : true,
        },
        [Validators.required]
      ),
      status: new FormControl(
        {
          value: this.apprStat ? 'APPROVED' : 'REJECTED',
          disabled: true,
        },
        [Validators.required]
      ),
    });
  }

  submit() {
    console.log(this.wardApprovalForm.value);

    let model = {
      studentId: this.studRef,
      awardedAmount: this.wardApprovalForm.controls['amount'].value,
      approvalStatus: this.wardApprovalForm.controls['status'].value,
    };

    if (this.wardApprovalForm.value['status'] === 'REJECTED') {
      model['awardedAmount'] = 0;
    }

    this.httpService.postReq(`bursary/ward-approval`, model).subscribe({
      next: (resp: any) => {
        this.toastr.success('Action successful');
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }
}
