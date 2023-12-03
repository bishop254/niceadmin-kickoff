import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-bulk-approval',
  templateUrl: './bulk-approval.component.html',
  styleUrls: ['./bulk-approval.component.scss'],
})
export class BulkApprovalComponent {
  title?: string;
  closeBtnName?: string;
  studList?: any[] = [];
  countyAppr: boolean = false;
  list: any[] = [];

  approvalDoc: any;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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
    let formData = new FormData();
    formData.append('approvalForm', this.approvalDoc);

    let model = this.studList?.map((stud) => stud['_id']);
    formData.append('payload', JSON.stringify(model));

    let url = this.countyAppr
      ? 'bursary/bulk-county-approval'
      : 'bursary/bulk-ward-approval';

    this.httpService.postReq(url, formData).subscribe({
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
