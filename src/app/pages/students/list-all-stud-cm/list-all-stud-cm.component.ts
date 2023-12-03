import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Subscription,
  TimeoutError,
  catchError,
  map,
  of,
} from 'rxjs';
import { GlobalServService } from 'src/app/shared/services/global-serv.service';
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { AddEditBursaryComponent } from '../../bursary/add-edit-bursary/add-edit-bursary.component';

@Component({
  selector: 'app-list-all-stud-cm',
  templateUrl: './list-all-stud-cm.component.html',
  styleUrls: ['./list-all-stud-cm.component.scss'],
})
export class ListAllStudCmComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    { name: 'Full Name', prop: 'name' },
    // { name: 'Bursary Description', prop: 'bursary_description' },
    { name: 'Gender', prop: 'gender' },
    { name: 'DOB', prop: 'dob' },
    { name: 'Form/Year', prop: 'formYear' },
    { name: 'Mobile No', prop: 'phone' },
    { name: 'Course', prop: 'course' },
    { name: 'Ward', prop: 'ward' },
    { name: 'Village', prop: 'village' },
    // { name: 'Notification Date', prop: 'notification_date' },
    { name: 'Ward Stage', prop: 'wardStage' },
    { name: 'County Stage', prop: 'countyStage' },
    // { name: 'Actions', prop: '_id' },
  ];

  allColumns = [...this.columns];
  studentsList$: Observable<any> = of([]);

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = [];
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

    this.studentsList$ = this.httpService.getReq('bursary/students').pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp);

        if (resp['statusCode'] === 200) {
          let response = resp['data'];

          this.rows = response.map((item: any, index: any) => {
            item['dob'] = this.globalService.formatDate(item['dob']);

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
      console.log(eventData['row']);

      this.toastr.info('Cannot view student from Ward Management');
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

  addAssessor() {
    // this.modalRef = this.modalService.open(AddEditAssessorComponent, {
    //   centered: true,
    //   animation: true,
    // });
    // this.modalRef.componentInstance.title = "Add Assessor";
    // let modalSub = this.modalRef.componentInstance.passEntry.subscribe(
    //   (receivedEntry: any) => {
    //     let model = {
    //       firstName: receivedEntry["firstName"],
    //       middleName: receivedEntry["middleName"],
    //       lastName: receivedEntry["lastName"],
    //       emailAddress: receivedEntry["emailAddress"],
    //       nationalId: receivedEntry["nationalId"],
    //       mobileNumber: receivedEntry["mobileNumber"],
    //     };
    //     this.loading = true;
    //     this.modalRef.close();
    //     let saveAssessor = this.httpService
    //       // .postReq('/api/v1/admin/employee/create', model)
    //       .postReq("/api/v1/admin/auditor/create-auditor", model)
    //       .subscribe({
    //         next: (resp) => {
    //           this.rows = [];
    //           if (resp["status"] === 200) {
    //             this.toastr.success(resp["message"], "Assessor Staged");
    //           } else {
    //             this.toastr.error(resp["message"], "Assessor Not Staged");
    //           }
    //           this.router.navigate(["/assessors/staged-assessors"]);
    //         },
    //         error: (error) => {
    //           // Handle the error here
    //           this.loading = false;
    //           this.toastr.error(
    //             error["statusText"] ||
    //               error["message"] ||
    //               error.error["message"],
    //             "Assessor Not Staged"
    //           );
    //           this.getIndividualData(0);
    //         },
    //       });
    //     this.subs.push(saveAssessor);
    //   }
    // );
    // this.subs.push(modalSub);
  }
}
