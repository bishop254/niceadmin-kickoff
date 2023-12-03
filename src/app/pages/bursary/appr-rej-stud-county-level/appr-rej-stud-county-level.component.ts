import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-appr-rej-stud-county-level',
  templateUrl: './appr-rej-stud-county-level.component.html',
  styleUrls: ['./appr-rej-stud-county-level.component.scss'],
})
export class ApprRejStudCountyLevelComponent {
  title?: string;
  closeBtnName?: string;
  studRef?: string = '';
  type?: string = 'county';
  apprStat!: boolean;
  apprData: number = 0;
  list: any[] = [];

  countyApprovalForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.countyApprovalForm = new FormGroup({
      amount: new FormControl(
        {
          value: this.apprData,
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
    console.log(this.countyApprovalForm.value);

    let model = {
      studentId: this.studRef,
      awardedAmount: this.countyApprovalForm.controls['amount'].value,
      approvalStatus: this.countyApprovalForm.controls['status'].value,
    };

    if (this.countyApprovalForm.value['status'] === 'REJECTED') {
      model['awardedAmount'] = 0;
    }

    this.httpService.postReq(`bursary/${this.type}-approval`, model).subscribe({
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
