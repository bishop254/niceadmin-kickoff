import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
import { ApproveStudentComponent } from '../approve-student/approve-student.component';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  bursariesList$: Observable<any> = of([]);
  filesList$: Observable<any> = of([]);

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = ['View', 'Edit'];
  totalRecords: number = 0;

  subs: Subscription[] = [];
  studRef: string = '';

  studDetails: any;
  studFiles: any;

  constructor(
    private httpService: HttpServService,
    private globalService: GlobalServService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.studRef = params.get('id')!.toString();
      console.log(this.studRef);
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
    this.getIndividualFiles();
  }

  getIndividualData(page: number = 0, size: number = 50): void {
    this.loading = true;

    const model = {
      filter: 'all',
      page: page,
      size: size,
    };

    this.bursariesList$ = this.httpService
      .getReq(`bursary/student/${this.studRef}`)
      .pipe(
        map((resp: any) => {
          this.studDetails = resp['data'];

          return this.studDetails;
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

  getIndividualFiles(): void {
    this.loading = true;

    this.filesList$ = this.httpService
      .getReq(`bursary/student/files/${this.studRef}`)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          console.log(resp);
          this.studFiles = resp['data'][0];

          return this.studFiles;
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

  approve() {
    const initialState: ModalOptions = {
      initialState: {
        title: `Approve Student : ${this.studRef}`,
        apprStat: true,
        studRef: this.studRef,
      },
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(
      ApproveStudentComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.onHide?.subscribe((resp) => {
      console.log(resp);
      this.getIndividualData();
    });
  }

  reject() {
    const initialState: ModalOptions = {
      initialState: {
        title: `Reject Student : ${this.studRef}`,
        apprStat: false,
        studRef: this.studRef,
      },
      class: 'modal-md',
    };
    this.bsModalRef = this.modalService.show(
      ApproveStudentComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHide?.subscribe((resp) => {
      console.log(resp);
      this.getIndividualData();
    });
  }

  viewDoc(type: string) {
    console.log(this.studFiles[type]);

    this.httpService
      .getFileReq(`bursary/student/file/${this.studFiles[type]}`)
      .subscribe((resp: any) => {
        let blob = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }
}
