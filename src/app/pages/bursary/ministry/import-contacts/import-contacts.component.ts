import { ChangeDetectorRef, Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, catchError, TimeoutError } from 'rxjs';
import { DataExportService } from 'src/app/shared/services/data-export.service';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-import-contacts',
  templateUrl: './import-contacts.component.html',
  styleUrls: ['./import-contacts.component.scss'],
})
export class ImportContactsComponent {
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

  importedStudents: any[] = [];
  failedStudents: any[] = [];

  submitFlag: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService,
    private detectorRef: ChangeDetectorRef,
    private dataExportService: DataExportService
  ) {}

  ngOnInit() {
    for (const [index, stud] of this.studList.entries()) {
      this.getIndividualCountyStatus(stud['_id'], index);
    }
    this.detectorRef.detectChanges();
  }

  onFileSelected(event: any): void {
    // const inputNode: any = event.target;

    // if (typeof FileReader !== 'undefined') {
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     let approvalDoc = e.target.result;
    //   };

    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }
    // this.approvalDoc = inputNode.files[0];
    // console.log(this.approvalDoc);
    const file = event.target.files[0];

    if (file) {
      this.dataExportService
        .readExcelFile(file)
        .then((data) => {
          console.log('Excel data:', data);
          // Process the data as needed
          this.importedStudents = this.convertToObject(data);
          console.log(this.convertToObject(data));
        })
        .catch((error) => {
          console.error('Error reading Excel file:', error);
        });
    }
  }

  convertToObject(data: any[]): any[] {
    // The first row will be the header (keys)
    const headers = data[0];

    // The rest of the rows will be the data (values)
    const rows = data.slice(1);

    // Map each row to an object, using the headers as the keys
    return rows.map((row: any[]) => {
      let rowObject: any = {};
      headers.forEach((header: string, index: number) => {
        rowObject[header] = row[index];
      });
      return rowObject;
    });
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

        this.getIndividualMinStatus(id, idx);
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
        let diff =
          this.studList[idx]['countyAmt'] - resp['data']['awardedAmount'];
        this.studList[idx]['countyAmt'] =
          diff > 0 ? diff : resp['data']['awardedAmount'];
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
    this.submitFlag = true;
    // let formData = new FormData();

    // // let model = this.studList?.map((stud) => stud['_id']);
    // let model = this.studList;
    // formData.append('payload', JSON.stringify(model));
    // for (const doc of this.documents) {
    //   console.log(doc['rawFile']);
    //   console.log(doc);

    //   formData.append('files', new Blob([doc]), doc['name']);
    // }

    let model = {
      data: this.importedStudents,
    };

    this.httpService.postReq('bursary/import-students', model).subscribe({
      next: (resp: any) => {
        console.log(resp);

        this.toastr.success(resp['message']);
        this.failedStudents = resp['data']['failedImports'];
        
        this.toastr.error(
          'Some imports failed',
          resp['data']['failedImports'].length || 0
        );

        this.submitFlag = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.submitFlag = false;
        this.toastr.error(error);
      },
    });

    console.log(this.studList);
    console.log(this.documents);
  }
}
