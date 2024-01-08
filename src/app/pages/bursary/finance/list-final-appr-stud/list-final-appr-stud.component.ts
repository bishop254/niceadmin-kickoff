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
import { FinApprComponent } from '../fin-appr/fin-appr.component';
import { FinalApprCicComponent } from '../final-appr-cic/final-appr-cic.component';

@Component({
  selector: 'app-list-final-appr-stud',
  templateUrl: './list-final-appr-stud.component.html',
  styleUrls: ['./list-final-appr-stud.component.scss'],
})
export class ListFinalApprStudComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    { name: 'Full Name', prop: 'studentName' },
    // { name: 'Bursary Description', prop: 'bursary_description' },
    { name: 'Ref No', prop: 'studRef' },
    { name: 'Amount', prop: 'awardedAmount' },
    { name: 'Approved', prop: 'isFinal' },
    { name: 'Actions', prop: '_id' },
  ];

  allColumns = [...this.columns];
  studentsList$: Observable<any> = of([]);
  studentsToApprove: any[] = [];

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

    this.studentsList$ = this.httpService
      .getReq('bursary/students/ministry-status')
      .pipe(
        map((resp: any) => {
          console.log(resp);
          console.log(resp);

          if (resp['statusCode'] === 200) {
            let response = resp['data'];

            this.rows = response.map((item: any, index: any) => {
              if (item['isFinal'] == undefined) {
                const res = {
                  ...item,
                  ['isFinal']: false,
                  frontendId: index + 1,
                };
                return res;
              } else {
                const res = {
                  ...item,
                  frontendId: index + 1,
                };
                return res;
              }

            });

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
      console.log(eventData['row']);

      let viewedStudent = eventData['row']['studRef'];
      this.router.navigate([`bursary/student/county-status/${viewedStudent}`]);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  selectedRowsEvent(data: any[]) {
    this.studentsToApprove = data;
    this.studentsToApprove = [...this.studentsToApprove].filter(
      (stud) => stud['isFinal'] === false
    );
  }

  fincApproval() {
    if (this.studentsToApprove.length > 0) {
      const initialState: ModalOptions = {
        initialState: {
          title: 'Approve Students',
          studList: this.studentsToApprove
        },
        class: 'modal-md',
      };
      this.bsModalRef = this.modalService.show(
        FinalApprCicComponent,
        initialState
      );
      this.bsModalRef.content.closeBtnName = 'Close';
      this.bsModalRef.content.isEdit = false;
      this.bsModalRef.content.studList = this.studentsToApprove;

      this.bsModalRef.onHidden?.emit((val: any) => {
        console.log(val);
        this.getIndividualData();
      });
    } else {
      this.toastr.info(
        'Select multiple students that will proceed to the next step'
      );
    }
  }
}
