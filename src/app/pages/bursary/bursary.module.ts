import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBursariesComponent } from './list-bursaries/list-bursaries.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'src/app/shared/components/general/general.module';

const bursariesRoutes: Routes = [
  { path: 'list-bursaries', component: ListBursariesComponent },
  // { path: 'add-bursary', component: AddBursaryComponent },
  // Add more routes here as needed
];

@NgModule({
  declarations: [ListBursariesComponent],
  imports: [CommonModule, RouterModule.forChild(bursariesRoutes), GeneralModule],
})
export class BursaryModule {}
