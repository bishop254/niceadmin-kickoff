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

const bursariesRoutes: Routes = [
  { path: 'list-bursaries', component: ListBursariesComponent },
  { path: 'students', component: ListStudentsComponent },
  { path: 'student/:id', component: ViewStudentComponent },
  // { path: 'add-bursary', component: AddBursaryComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    ListBursariesComponent,
    AddEditBursaryComponent,
    ListStudentsComponent,
    ViewStudentComponent,
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
