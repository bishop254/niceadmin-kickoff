import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-custom-tbl',
  templateUrl: './custom-tbl.component.html',
  styleUrls: ['./custom-tbl.component.scss'],
})
export class CustomTblComponent {
  @ViewChild('table') table!: DatatableComponent;
  ColumnMode = ColumnMode;

  @Input() loadingIndicator = true;
  reorderable = true;

  @Input() columns: any = [];
  @Input() modColumns: any = [];
  @Input() plainColumns: any = [];
  @Input() rows: any = [];

  @Input() hasExpandableRow: boolean = false;

  @Input() disableFilters: any;

  @Input() actions: any;
  @Input() totalItems: number = 0;

  @Output() outputEvent = new EventEmitter<string>();

  @Output() selectedRowsEvent = new EventEmitter<any>();

  @Output() updateFilteredRows = new EventEmitter<string>();

  // New Params
  data: any[] = [];
  originalRows: any[] = [];
  filterColumns: any[] = [];
  toggleFilters: any[] = [];
  dateFilters: any[] = [];
  total: any;
  perPage = 10;
  pageSizes: number[] = [5, 10, 20, 50, 100, 1000];
  pageSize = 20;
  page = 1;
  dataLoaded = false;
  showPageSizeDropdown = false;
  // New Params
  maxSize: number = 5;
  selectedRange: any = {};

  selected: any = [];
  SelectionType = SelectionType;

  constructor() {}

  ngOnInit() {
    this.filterColumns = [...this.columns].filter(
      (col: any) =>
        col['name'] !== 'Actions' &&
        col['name'] !== 'Status' &&
        col['name'] !== 'Blocked' &&
        col['prop'] !== 'createdAt' &&
        col['prop'] !== 'createdOn' &&
        col['prop'] !== 'updatedAt' &&
        col['prop'] !== 'systemRole' &&
        col['prop'] !== 'firstTimeLogin' &&
        col['prop'] !== 'approved' &&
        col['prop'] !== 'assigned' &&
        col['prop'] !== 'taskStatus' &&
        col['prop'] !== 'deviceStatus' &&
        col['prop'] !== 'reqStatus' &&
        col['prop'] !== 'resStatus' &&
        col['prop'] !== 'applStatus' &&
        col['prop'] !== 'stanStatus' &&
        col['prop'] !== 'taskDate' &&
        col['prop'] !== 'enterprise' &&
        col['prop'] !== 'enterpriseClass' &&
        col['prop'] !== 'wardStage' &&
        col['prop'] !== 'countyStage' &&
        col['prop'] !== 'ministryStage' &&
        col['prop'] !== 'channel'
    );

    this.toggleFilters = [...this.columns].filter(
      (col: any) =>
        col['name'] == 'Active' ||
        col['name'] == 'Status' ||
        col['name'] == 'Blocked' ||
        col['prop'] == 'systemRole' ||
        col['prop'] == 'firstTimeLogin' ||
        col['prop'] == 'approved' ||
        col['prop'] == 'assigned' ||
        col['prop'] == 'taskStatus' ||
        col['prop'] == 'deviceStatus' ||
        col['prop'] == 'reqStatus' ||
        col['prop'] == 'resStatus' ||
        col['prop'] == 'applStatus' ||
        col['prop'] == 'stanStatus' ||
        col['prop'] == 'enterprise' ||
        col['prop'] == 'enterpriseClass' ||
        col['prop'] == 'wardStage' ||
        col['prop'] == 'countyStage' ||
        col['prop'] == 'ministryStage' ||
        col['prop'] == 'channel'
    );
    this.configureSelectParams();

    this.dateFilters = [...this.columns].filter((col: any) => {
      if (
        col['prop'] == 'updatedOn' ||
        col['prop'] == 'createdOn' ||
        col['prop'] == 'createdAt' ||
        col['prop'] == 'updatedAt' ||
        col['prop'] == 'taskDate'
      ) {
        this.selectedRange[col['prop']] = [];

        return col;
      }
    });

    this.data = [...this.rows];

    console.log(this.data, 'oninit');

    this.changePageSize(true);
    this.configureColumnParams();
  }

  configureSelectParams() {
    this.toggleFilters.forEach((item) => {
      if (
        item['prop'] == 'wardStage' ||
        item['prop'] == 'countyStage' ||
        item['prop'] == 'ministryStage'
      ) {
        item['options'] = [
          {
            val: 'PENDING',
            label: 'Pending',
          },
          {
            val: 'APPROVED',
            label: 'Approved',
          },
          {
            val: 'REJECTED',
            label: 'Rejected',
          },
        ];
      }

      if (item['prop'] == 'status') {
        item['options'] = [
          {
            val: 'true',
            label: 'Active',
          },
          {
            val: 'false',
            label: 'Inactive',
          },
        ];
      }

      if (
        item['prop'] !== 'systemRole' &&
        item['prop'] !== 'active' &&
        item['prop'] !== 'deviceStatus' &&
        item['prop'] !== 'taskStatus' &&
        item['prop'] !== 'reqStatus' &&
        item['prop'] !== 'resStatus' &&
        item['prop'] !== 'applStatus' &&
        item['prop'] !== 'stanStatus' &&
        item['prop'] !== 'enterprise' &&
        item['prop'] !== 'enterpriseClass' &&
        item['prop'] !== 'wardStage' &&
        item['prop'] !== 'countyStage' &&
        item['prop'] !== 'ministryStage' &&
        item['prop'] !== 'channel'
      ) {
        item['options'] = [
          {
            val: 'true',
            label: 'True',
          },
          {
            val: 'false',
            label: 'False',
          },
        ];
      }
    });
  }

  configureColumnParams() {
    let tempCol = [...this.columns];

    tempCol.forEach((col: any, idx: number) => {
      if (
        col.name !== 'Actions' &&
        col.name !== 'Status' &&
        col.name !== 'Blocked' &&
        col.name !== 'Active' &&
        col.name !== 'ID' &&
        col.name !== '#' &&
        col.prop !== 'systemRole' &&
        col.prop !== 'createdOn' &&
        col.prop !== 'gender' &&
        col.prop !== 'createdAt' &&
        col.prop !== 'updatedAt' &&
        col.prop !== 'firstTimeLogin' &&
        col.prop !== 'updatedOn' &&
        col.prop !== 'approved' &&
        col.prop !== 'assigned' &&
        col.prop !== 'deviceStatus' &&
        col.prop !== 'taskStatus' &&
        col.prop !== 'resStatus' &&
        col.prop !== 'reqStatus' &&
        col.prop !== 'applStatus' &&
        col.prop !== 'stanStatus' &&
        col.prop !== 'wardStage' &&
        col.prop !== 'countyStage' &&
        col.prop !== 'ministryStage' &&
        col.prop !== 'channel'
      ) {
        col['maxW'] =
          col.name == 'DOB'
            ? 500
            : col.name == 'Age' || col.name == 'Form/Year'
            ? 30
            : 700;
        col['minW'] = col.name == 'Email' ? 240 : 90;

        this.plainColumns.push(col);
        tempCol.splice(idx, 1, {});
      }

      this.modColumns = [...tempCol].filter((item) => item !== '{}');
    });
  }

  changePageSize(initial: boolean = false, event?: Event) {
    if (initial) {
      this.pageSize = parseInt('5');
    } else {
      this.pageSize = parseInt((event?.target as HTMLSelectElement).value);
    }
  }

  sendEvent(row: any, action: any) {
    console.log(row, action);

    let result = {
      row: row,
      action: action,
    };
    this.outputEvent.emit(JSON.stringify(result));
  }

  updateFilter() {
    if (this.data.length < 1) {
      this.data = [...this.rows];
      this.originalRows = [...this.rows];
    }

    let tempRows = [...this.data];

    const filterInputs = document.querySelectorAll('.filterInputs');
    filterInputs.forEach((input: any) => {
      if (
        input.id == 'Created On' ||
        input.id == 'createdOn' ||
        input.id == 'CreatedAt' ||
        input.id == 'createdAt' ||
        input.id == 'updatedOn' ||
        input.id == 'updatedAt' ||
        input.id == 'taskDate'
      ) {
        if (this.selectedRange[input.id].length > 0) {
          let startDate = this.selectedRange[input.id][0].toISOString();
          let endDate = this.selectedRange[input.id][1].toISOString();

          const temp = tempRows.filter(function (d: any) {
            if (!!d[input.id]) {
              console.log(d);
              console.log(d[input.id]);

              let date: any = new Date(d[input.id]).toISOString();

              // date = date.replace(' ', 'T');
              return date >= startDate && date <= endDate;
            }
            return null;
          });
          tempRows = [...temp];
        }
      } else {
        if (input.value !== '') {
          const temp = tempRows.filter(function (d: any) {
            let key = input.id;

            console.log(d, key);

            if (d[key] == null) {
              return;
            } else {
              return (
                d[key]
                  .toString()
                  .toLowerCase()
                  .indexOf(input.value.toLowerCase()) !== -1 ||
                !input.value.toLowerCase()
              );
            }
          });

          console.log(tempRows, input);
          tempRows = [...temp];
        }
      }
    });

    const filterSelects = document.querySelectorAll('.filterSelect');
    filterSelects.forEach((select: any) => {
      let val = select.value;
      if (val !== '') {
        if (val == true || val == false || val == 'true' || val == 'false') {
          console.log(val);

          if (val == 'false') {
            val = false;
          } else if (val == 'true') {
            val = true;
          }
          console.log(tempRows);

          const temp = tempRows.filter(function (d: any) {
            // let key = select.options[0].value;
            let key = select.id;
            return d[key] == val;
          });
          console.log(temp);

          tempRows = [...temp];
          // } else if (val == 'ASSIGNED' || val == 'UNASSIGNED') {
          //   const temp = tempRows.filter(function (d: any) {
          //     let key = select.options[0].value;

          //     return d[key] == val;
          //   });

          //   tempRows = [...temp];
        } else {
          console.log(tempRows, select);

          const temp = tempRows.filter(function (d: any) {
            // let key = select.options[0].value;
            let key = select.id;

            return d[key] == val;
          });
          console.log(temp);

          tempRows = [...temp];
        }
      }
      this.loadingIndicator = false;
    });

    this.rows = [...tempRows];

    this.updateFilteredRows.emit(this.rows);
  }

  clearFilters() {
    console.log(this.originalRows);
    console.log(this.data);

    this.rows =
      this.originalRows !== undefined && [...this.originalRows].length > 0
        ? [...this.originalRows]
        : this.data !== undefined && [...this.data].length > 0
        ? [...this.data]
        : [...this.rows];

    const filterInputs = document.querySelectorAll('.filterInputs');
    filterInputs.forEach((input: any) => {
      input.value = '';
    });

    const filterSelect = document.querySelectorAll('.filterSelect');
    filterSelect.forEach((select: any) => {
      select.selectedIndex = 0;
    });

    let dateKeys = Object.keys(this.selectedRange);
    dateKeys.forEach((key) => {
      this.selectedRange[key] = [];
    });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
    this.updateFilteredRows.emit(this.rows);
  }

  onSelect(selected: any) {
    console.log('Select Event', selected);
    console.log('Select', this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected['selected']);
    this.selectedRowsEvent.emit(this.selected);
  }

  onActivate(event: any) {
    //console.log('Activate Event', event);
  }

  displayCheck(row: { name: string }) {
    return row.name !== 'Ethel Price';
  }
}
