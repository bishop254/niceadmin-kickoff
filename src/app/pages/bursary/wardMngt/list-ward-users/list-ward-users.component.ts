import { Component } from '@angular/core';
import { AddEditBursaryComponent } from '../../add-edit-bursary/add-edit-bursary.component';
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
import { AddWardUsersComponent } from '../add-ward-users/add-ward-users.component';

@Component({
  selector: 'app-list-ward-users',
  templateUrl: './list-ward-users.component.html',
  styleUrls: ['./list-ward-users.component.scss'],
})
export class ListWardUsersComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    //{ name: 'Ref', prop: 'frontendId' },
    { name: 'Name', prop: 'name' },
    { name: 'Email', prop: 'email' },
    { name: 'ID No', prop: 'idNo' },
    { name: 'Mobile No', prop: 'mobile' },
    { name: 'Ward', prop: 'ward' },
    //{ name: 'Actions', prop: '_id' },
  ];

  allColumns = [...this.columns];
  studentsList$: Observable<any> = of([]);

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = ['View'];
  totalRecords: number = 0;

  modalRef: any;

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

    this.studentsList$ = this.httpService.getAuthReq('auth/users/all').pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp);

        if (resp['statusCode'] === 200) {
          let response = resp['data'];

          this.rows = response.map((item: any, index: any) => {
            if (item['profile'] === 'WARD') {
              // item['completion_date'] = this.globalService.formatDate(
              //   item['completion_date']
              // );
              const res = {
                ...item,
                frontendId: index + 1,
              };

              return res;
            }
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

      let viewedStudent = eventData['row']['_id'];
      this.router.navigate([`admin/bursary/student/${viewedStudent}`]);
    } else if (eventData.action == 'Edit') {
      this.editAssessor(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  addUser() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add Ward User',
        isEdit: false,
      },
      // class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      AddWardUsersComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.onHide?.subscribe((val: any) => {
      console.log(val);
      this.getIndividualData();
    });
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
