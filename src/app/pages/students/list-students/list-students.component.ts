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
import { AddEditBursaryComponent } from '../../bursary/add-edit-bursary/add-edit-bursary.component';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    { name: 'Full Name', prop: 'name' },
    // { name: 'Bursary Description', prop: 'bursary_description' },
    { name: 'Gender', prop: 'gender' },
    { name: 'DOB', prop: 'dob' },
    { name: 'Age', prop: 'age' },
    { name: 'Form/Year', prop: 'formYear' },
    { name: 'Mobile No', prop: 'phone' },
    { name: 'Course', prop: 'course' },
    { name: 'Village', prop: 'village' },
    // { name: 'Notification Date', prop: 'notification_date' },
    // { name: 'Status', prop: 'status' },
    { name: 'Actions', prop: '_id' },
  ];

  allColumns = [...this.columns];
  studentsList$: Observable<any> = of([]);

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

    this.studentsList$ = this.httpService.getReq('bursary/students/ward').pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp);

        if (resp.length >= 1) {
          let response = resp;

          this.rows = response.map((item: any, index: any) => {
            item['dob'] = this.globalService.formatDate(item['dob']);

            // item['completion_date'] = this.globalService.formatDate(
            //   item['completion_date']
            // );
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
      console.log(eventData['row']);

      let viewedStudent = eventData['row']['_id'];
      this.router.navigate([`bursary/student/${viewedStudent}`]);
    } else if (eventData.action == 'Edit') {
      this.editAssessor(eventData.row);
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
