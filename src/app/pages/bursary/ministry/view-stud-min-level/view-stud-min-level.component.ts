import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
import { ApprRejStudCountyLevelComponent } from '../../appr-rej-stud-county-level/appr-rej-stud-county-level.component';

@Component({
  selector: 'app-view-stud-min-level',
  templateUrl: './view-stud-min-level.component.html',
  styleUrls: ['./view-stud-min-level.component.scss'],
})
export class ViewStudMinLevelComponent {
  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  studentData$: Observable<any> = of([]);
  wardStatData$: Observable<any> = of({});
  countyStatData$: Observable<any> = of({});

  bsModalRef?: BsModalRef;

  title: string = 'Assessor';
  actions = ['View', 'Edit'];
  totalRecords: number = 0;

  subs: Subscription[] = [];
  studRef: string = '';

  studDetails: any;
  studWardStatus: any;
  studCountyStatus: any;

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
    this.getIndividualStatus();
    this.getIndividualCountyStatus();
  }

  getIndividualData(page: number = 0, size: number = 50): void {
    this.loading = true;

    const model = {
      filter: 'all',
      page: page,
      size: size,
    };

    this.studentData$ = this.httpService
      .getReq(`bursary/student/${this.studRef}`)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          console.log(resp);
          this.studDetails = resp['data'];
          console.log(this.studDetails);

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

  getIndividualStatus(): void {
    this.loading = true;

    this.wardStatData$ = this.httpService
      .getReq(`bursary/student/ward-status/${this.studRef}`)
      .pipe(
        map((resp: any) => {
          this.studWardStatus = resp['data'];

          return this.studWardStatus;
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

  getIndividualCountyStatus(): void {
    this.loading = true;

    this.countyStatData$ = this.httpService
      .getReq(`bursary/student/county-status/${this.studRef}`)
      .pipe(
        map((resp: any) => {
          this.studCountyStatus = resp['data'];

          return this.studCountyStatus;
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
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  viewStudent() {
    this.router.navigate([`/bursary/student/${this.studDetails['_id']}`]);
  }
}
