import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBursariesComponent } from './list-bursaries/list-bursaries.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'src/app/shared/components/general/general.module';
import { AddEditBursaryComponent } from './add-edit-bursary/add-edit-bursary.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ListStudentsComponent } from '../students/list-students/list-students.component';
import { ViewStudentComponent } from '../students/view-student/view-student.component';
import { ListAllStudentsComponent } from '../students/list-all-students/list-all-students.component';
import { ListWardUsersComponent } from './wardMngt/list-ward-users/list-ward-users.component';
import { AddWardUsersComponent } from './wardMngt/add-ward-users/add-ward-users.component';
import { ListBulkApprovedComponent } from './list-bulk-approved/list-bulk-approved.component';
import { ViewStudCountyLevelComponent } from './view-stud-county-level/view-stud-county-level.component';
import { ApprRejStudCountyLevelComponent } from './appr-rej-stud-county-level/appr-rej-stud-county-level.component';
import { ListAllStudCmComponent } from '../students/list-all-stud-cm/list-all-stud-cm.component';
import { ListApprCountyStudComponent } from './ministry/list-appr-county-stud/list-appr-county-stud.component';
import { ListCountyUsersComponent } from './ministry/list-county-users/list-county-users.component';
import { AddCountyUsersComponent } from './ministry/add-county-users/add-county-users.component';
import { ViewStudMinLevelComponent } from './ministry/view-stud-min-level/view-stud-min-level.component';

const bursariesRoutes: Routes = [
  { path: 'list-bulk-approvals', component: ListBulkApprovedComponent },
  { path: 'students', component: ListStudentsComponent },
  { path: 'all-students', component: ListAllStudentsComponent },
  { path: 'all-county-appr-students', component: ListApprCountyStudComponent },
  { path: 'all-students-cm', component: ListAllStudCmComponent },
  { path: 'student/:id', component: ViewStudentComponent },
  { path: 'student/ward-status/:id', component: ViewStudCountyLevelComponent },
  { path: 'student/county-status/:id', component: ViewStudMinLevelComponent },
  { path: 'ward-users', component: ListWardUsersComponent },
  { path: 'county-users', component: ListCountyUsersComponent },
  // { path: 'add-bursary', component: AddBursaryComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    ListBursariesComponent,
    AddEditBursaryComponent,
    ListStudentsComponent,
    ViewStudentComponent,
    ListAllStudentsComponent,
    ListWardUsersComponent,
    AddWardUsersComponent,
    ListBulkApprovedComponent,
    ViewStudCountyLevelComponent,
    ApprRejStudCountyLevelComponent,
    ListAllStudCmComponent,
    ListApprCountyStudComponent,
    ListCountyUsersComponent,
    AddCountyUsersComponent,
    ViewStudMinLevelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(bursariesRoutes),
    GeneralModule,
    ReactiveFormsModule,
  ],
  providers: [BsModalService],
})
export class BursaryModule {}
