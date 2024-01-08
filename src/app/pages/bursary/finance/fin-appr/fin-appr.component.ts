import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, map, catchError, TimeoutError } from 'rxjs';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-fin-appr',
  templateUrl: './fin-appr.component.html',
  styleUrls: ['./fin-appr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinApprComponent {
  title?: string;
  closeBtnName?: string;
  studList: any[] = [];
  countyAppr: boolean = false;
  list: any[] = [];

  approvalDoc: any = null;

  countyStatData$: Observable<any> = of({});
  studRef: string = '';
  studCountyStatus: any;

  editing: any = {};
  rows: any[] = [];

  documents: File[] | any = [];

  ColumnMode: any = ColumnMode;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService,
    private detectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    for (const [index, stud] of this.studList.entries()) {
      this.getIndividualCountyStatus(stud['_id'], index);
    }
    this.detectorRef.detectChanges();
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

  addDoc() {
    let fileDesc: HTMLInputElement | any = document.getElementById('filename')!;
    console.log(fileDesc.target);

    this.approvalDoc['desc'] = fileDesc.value;

    this.documents.push(this.approvalDoc);
    let formElm: HTMLFormElement | any = document.getElementById('docForm')!;
    console.log(this.documents, this.approvalDoc);
    formElm.reset();
    this.approvalDoc = null;
  }

  removeDoc(index: number) {
    this.documents.splice(index, 1);
  }

  removeStud(stud: any) {
    let idx = this.studList.indexOf(stud);

    this.studList.splice(idx, 1);
    this.studList = [...this.studList];
    this.detectorRef.detectChanges();
  }

  async getIndividualCountyStatus(id: string, idx: number) {
    await this.httpService
      .getReq(`bursary/student/county-status/${id}`)
      .subscribe((resp) => {
        this.studList[idx]['countyAmt'] = resp['data']['awardedAmount'];
        this.studList[idx]['initAmt'] = resp['data']['awardedAmount'];

        this.getIndividualMinStatus(id, idx)
        return this.studList;
      }),
      catchError((error: any) => {
        if (error instanceof TimeoutError) {
          this.toastr.error(error['message'], 'API Timeout');
        } else {
          this.toastr.error(
            error['statusText'] || error['message'],
            'Data Not Fetched'
          );
        }
        return of([]);
      });
  }
  async getIndividualMinStatus(id: string, idx: number) {
    await this.httpService
      .getReq(`bursary/student/ministry-status/${id}`)
      .subscribe((resp) => {
        let diff = this.studList[idx]['countyAmt'] - resp['data']['awardedAmount']
        this.studList[idx]['countyAmt'] = diff > 0 ? diff : resp['data']['awardedAmount'];
        return this.studList;
      }),
      catchError((error: any) => {
        if (error instanceof TimeoutError) {
          this.toastr.error(error['message'], 'API Timeout');
        } else {
          this.toastr.error(
            error['statusText'] || error['message'],
            'Data Not Fetched'
          );
        }
        return of([]);
      });
  }

  updateValue(event: any, cell: string, rowIndex: any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.studList[rowIndex]['countyAmt'] = event.target.value;
    this.studList = [...this.studList];
    console.log('UPDATED!', this.studList);
  }

  submit() {
    let formData = new FormData();
    
    // let model = this.studList?.map((stud) => stud['_id']);
    let model = this.studList;
    formData.append('payload', JSON.stringify(model));
    for (const doc of this.documents) {
      console.log(doc['rawFile']);
      console.log(doc);
      
      formData.append('files', new Blob([doc]), doc['name']);
    }

    this.httpService
      .postReq('bursary/bulk-ministry-approval', formData)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);

          this.toastr.success(resp['message']);
          this.bsModalRef.hide();
        },
        error: (error) => {
          this.toastr.error(error);
        },
      });

    console.log(this.studList);
    console.log(this.documents);
  }
}
