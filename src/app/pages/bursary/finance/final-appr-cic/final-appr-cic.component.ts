import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-final-appr-cic',
  templateUrl: './final-appr-cic.component.html',
  styleUrls: ['./final-appr-cic.component.scss']
})
export class FinalApprCicComponent {
  title?: string;
  closeBtnName?: string;
  studList?: any[] = [];
  countyAppr: boolean = false;
  list: any[] = [];
  totalAmt: number = 0

  approvalDoc: any;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.studList);
    this.studList?.map(item => {
      this.totalAmt += item['awardedAmount']
    })
  }

  onFileSelected(event: Event): void {
    const inputNode: any = event.target;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        let approvalDoc = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    this.approvalDoc = inputNode.files[0];
  }

  submit() {
    let model = {
      students: this.studList
    }
    this.httpService.postReq('bursary/bulk-final-approval', model).subscribe({
      next: (resp: any) => {
        this.toastr.success(resp['message']);
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }
}
