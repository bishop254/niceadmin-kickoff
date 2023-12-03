import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  of,
  Subscription,
  map,
  catchError,
  TimeoutError,
} from 'rxjs';
import { GlobalServService } from 'src/app/shared/services/global-serv.service';
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { AddEditBursaryComponent } from '../add-edit-bursary/add-edit-bursary.component';

@Component({
  selector: 'app-list-bulk-approved',
  templateUrl: './list-bulk-approved.component.html',
  styleUrls: ['./list-bulk-approved.component.scss'],
})
export class ListBulkApprovedComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    { name: 'Ref', prop: '_id' },
    { name: 'Level', prop: 'ward' },
    { name: 'Filename', prop: 'approvalForm' },

    { name: 'Actions', prop: '_id' },
  ];

  allColumns = [...this.columns];
  bulkApprList$: Observable<any> = of([]);

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = ['View'];
  totalRecords: number = 0;

  subs: Subscription[] = [];
  constructor(
    private httpService: HttpServService,
    private globalService: GlobalServService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData(page: number = 0, size: number = 50): void {
    this.loading = true;

    const model = {
      filter: 'all',
      page: page,
      size: size,
    };

    this.bulkApprList$ = this.httpService.getReq('bursary/bulk-approved').pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp);

        if (resp['statusCode'] === 200) {
          let response = resp['data'];

          this.rows = response.map((item: any, index: any) => {
            const res = {
              ...item,
              frontendId: index + 1,
            };

            return res;
          });

          this.rows = this.rows.filter((row: any) => row !== undefined);
          console.log(this.rows);

          this.totalRecords = this.rows.length;

          this.loading = false;
          return this.rows;
        } else {
          this.loading = false;
          return of([]);
        }
      }),
      catchError((error: any) => {
        this.loading = false;
        if (error instanceof TimeoutError) {
          this.toastr.error(error['message'], 'API Timeout');
        } else {
          this.toastr.error(
            error['statusText'] || error['message'],
            'Data Not Fetched'
          );
        }
        return of([]);
      })
    );
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == 'View') {
      this.viewDoc(eventData['row']);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  addStudent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Bursary',
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      AddEditBursaryComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.isEdit = false;

    this.bsModalRef.onHidden?.emit((val: any) => {
      console.log(val);
      this.getIndividualData();
    });
  }

  viewDoc(type: any) {
    this.httpService
      .getFileReq(`bursary/student/file/${type['approvalForm']}`)
      .subscribe((resp: any) => {
        let blob = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }
}
