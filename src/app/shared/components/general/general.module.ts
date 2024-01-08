import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTblComponent } from './custom-tbl/custom-tbl.component';
import { CustomTblHeaderComponent } from './custom-tbl-header/custom-tbl-header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [CustomTblComponent, CustomTblHeaderComponent],
  imports: [CommonModule, NgxDatatableModule],
  exports: [CustomTblComponent, CustomTblHeaderComponent, NgxDatatableModule],
})
export class GeneralModule {}
