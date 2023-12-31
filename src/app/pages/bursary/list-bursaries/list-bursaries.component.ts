import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import {
  Observable,
  Subscription,
  map,
  catchError,
  TimeoutError,
  of,
} from 'rxjs';
import { GlobalServService } from 'src/app/shared/services/global-serv.service';
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { AddEditBursaryComponent } from '../add-edit-bursary/add-edit-bursary.component';

@Component({
  selector: 'app-list-bursaries',
  templateUrl: './list-bursaries.component.html',
  styleUrls: ['./list-bursaries.component.scss'],
})
export class ListBursariesComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    { name: 'Bursary Name', prop: 'bursary_name' },
    // { name: 'Bursary Description', prop: 'bursary_description' },
    { name: 'Bursary Amount', prop: 'bursary_amount' },
    { name: 'Criteria', prop: 'criteria' },
    { name: 'Appl Date', prop: 'application_start_date' },
    // { name: 'Application End Date', prop: 'application_end_date' },
    { name: 'Review Date', prop: 'review_start_date' },
    // { name: 'Review End Date', prop: 'review_end_date' },
    // { name: 'Notification Date', prop: 'notification_date' },
    { name: 'Disburs Date', prop: 'disbursement_date' },
    { name: 'Status', prop: 'status' },
  ];

  allColumns = [...this.columns];
  bursariesList$: Observable<any> = of([]);

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = ['View', 'Edit'];
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

    this.bursariesList$ = this.httpService.getReq('bursary/bursaries').pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp);

        // this.rows = [
        //   {
        //     bursary_name: 'Scholarship 1',
        //     bursary_description: 'This is the description for Scholarship 1.',
        //     bursary_amount: 1000,
        //     criteria: 'GPA of 3.5 or higher',
        //     application_start_date: '2023-01-15',
        //     application_end_date: '2023-02-15',
        //     review_start_date: '2023-02-20',
        //     review_end_date: '2023-03-05',
        //     notification_date: '2023-03-10',
        //     disbursement_date: '2023-04-01',
        //     status: 'Open',
        //   },
        //   {
        //     bursary_name: 'Grant 1',
        //     bursary_description: 'This is the description for Grant 1.',
        //     bursary_amount: 500,
        //     criteria: 'Financial need-based',
        //     application_start_date: '2023-02-01',
        //     application_end_date: '2023-03-01',
        //     review_start_date: '2023-03-10',
        //     review_end_date: '2023-03-20',
        //     notification_date: '2023-03-25',
        //     disbursement_date: '2023-04-15',
        //     status: 'Closed',
        //   },
        //   {
        //     bursary_name: 'Fellowship 1',
        //     bursary_description: 'This is the description for Fellowship 1.',
        //     bursary_amount: 1500,
        //     criteria: 'Research excellence',
        //     application_start_date: '2023-03-15',
        //     application_end_date: '2023-04-15',
        //     review_start_date: '2023-04-20',
        //     review_end_date: '2023-05-05',
        //     notification_date: '2023-05-10',
        //     disbursement_date: '2023-06-01',
        //     status: 'Open',
        //   },
        //   {
        //     bursary_name: 'Scholarship 2',
        //     bursary_description: 'This is the description for Scholarship 2.',
        //     bursary_amount: 1200,
        //     criteria: 'Community involvement',
        //     application_start_date: '2023-01-10',
        //     application_end_date: '2023-02-10',
        //     review_start_date: '2023-02-15',
        //     review_end_date: '2023-02-28',
        //     notification_date: '2023-03-05',
        //     disbursement_date: '2023-03-30',
        //     status: 'Closed',
        //   },
        //   {
        //     bursary_name: 'Grant 2',
        //     bursary_description: 'This is the description for Grant 2.',
        //     bursary_amount: 750,
        //     criteria: 'STEM majors only',
        //     application_start_date: '2023-02-05',
        //     application_end_date: '2023-03-05',
        //     review_start_date: '2023-03-15',
        //     review_end_date: '2023-03-30',
        //     notification_date: '2023-04-05',
        //     disbursement_date: '2023-04-25',
        //     status: 'Open',
        //   },
        // ];
        // return this.rows

        if (resp.length >= 1) {
          let response = resp;

          this.rows = response.map((item: any, index: any) => {
            item['application_start_date'] = this.globalService.formatDate(
              item['application_start_date']
            );
            item['review_start_date'] = this.globalService.formatDate(
              item['review_start_date']
            );
            item['disbursement_date'] = this.globalService.formatDate(
              item['disbursement_date']
            );
            const res = {
              ...item,
              frontendId: index + 1,
            };

            return res;
          });

          this.rows = this.rows.filter((row: any) => row !== undefined);

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
      // this.viewedAssessor = eventData["row"]["id"];
      // this.router.navigate([`/assessors/view-assessor/${this.viewedAssessor}`]);
    } else if (eventData.action == 'Edit') {
      this.editAssessor(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  addBursary() {
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

    this.bsModalRef.onHide?.emit((val: any) => {
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

  editAssessor(assessorData: any) {
    // this.modalRef = this.modalService.open(AddEditAssessorComponent, {
    //   centered: true,
    //   animation: true,
    // });
    // this.modalRef.componentInstance.formData = assessorData;
    // this.modalRef.componentInstance.title = "Edit User";
    // let modalSub = this.modalRef.componentInstance.passEntry.subscribe(
    //   (receivedEntry: any) => {
    //     let model = {
    //       firstName: receivedEntry["firstName"],
    //       lastName: receivedEntry["lastName"],
    //       middleName:
    //         receivedEntry["middleName"] == null
    //           ? ""
    //           : receivedEntry["middleName"],
    //       emailAddress: receivedEntry["emailAddress"],
    //       nationalId: receivedEntry["nationalId"],
    //       mobileNumber: receivedEntry["mobileNumber"],
    //       id: parseInt(assessorData["id"]),
    //     };
    //     this.loading = true;
    //     this.modalRef.close();
    //     let updateAdmin = this.httpService
    //       .postReq("/api/v1/admin/employee/edit", model)
    //       .subscribe({
    //         next: (resp) => {
    //           this.rows = [];
    //           if (resp["status"] === 200) {
    //             this.toastr.success(resp["message"], "Assessor Updated");
    //           } else {
    //             this.toastr.error(resp["message"], "Assessor Not Updated");
    //           }
    //           this.getIndividualData(0);
    //         },
    //         error: (error) => {
    //           // Handle the error here
    //           this.loading = false;
    //           this.toastr.error(
    //             error["statusText"] ||
    //               error["message"] ||
    //               error.error["message"],
    //             "Assessor Not Updated"
    //           );
    //         },
    //       });
    //     this.subs.push(updateAdmin);
    //   }
    // );
    // this.subs.push(modalSub);
  }
}
