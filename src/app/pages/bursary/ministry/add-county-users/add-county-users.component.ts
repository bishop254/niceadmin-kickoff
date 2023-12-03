import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-add-county-users',
  templateUrl: './add-county-users.component.html',
  styleUrls: ['./add-county-users.component.scss'],
})
export class AddCountyUsersComponent {
  migoriConstData: any[] = [
    {
      constituency: 'Rongo',
      wards: [
        'North Kamagambo',
        'Central Kamagambo',
        'East Kamagambo',
        'South Kamagambo',
      ],
    },
    {
      constituency: 'Awendo',
      wards: ['North East Sakwa', 'South Sakwa', 'West Sakwa', 'Central Sakwa'],
    },
    {
      constituency: 'Suna East',
      wards: ['God Jope', 'Suna Central', 'Kakrao', 'Kwa'],
    },
    {
      constituency: 'Suna West',
      wards: ['Wiga', 'Wasweta II', 'Ragan-Oruba', 'Wasimbete'],
    },
    {
      constituency: 'Uriri',
      wards: [
        'West Kanyamkago',
        'North Kanyamkago',
        'Central Kanyamkago',
        'South Kanyamkago',
        'East Kanyamkago',
      ],
    },
    {
      constituency: 'Kuria East',
      wards: [
        'Gokeharaka/Getamwega',
        'Ntimaru West',
        'Ntimaru East',
        'Nyabasi East',
        'Nyabasi West',
      ],
    },
    {
      constituency: 'Nyatike',
      wards: [
        'Kachieng’',
        'Kanyasa',
        'North Kadem',
        'Macalder/Kanyarwanda',
        'Kaler',
        'Got Kachola',
        'Muhuru',
      ],
    },
    {
      constituency: 'Kuria West',
      wards: [
        'Bukira East',
        'Bukira Central/Ikerege',
        'Isibania',
        'Makerero',
        'Masaba',
        'Tagare',
        'Nyamosense/Komosoko',
      ],
    },
  ];

  title?: string;
  closeBtnName?: string;
  isEdit?: boolean = false;
  list: any[] = [];

  bursaryForm!: FormGroup;
  selectedWards: any;

  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bursaryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      idNo: new FormControl('', [Validators.required]),
    });
  }

  filterWards() {
    let selectedConsit = this.bursaryForm.controls['constituency'].value;

    this.selectedWards = [...this.migoriConstData].filter(
      (item: any) => item['constituency'] == selectedConsit
    )[0]['wards'];

    console.log(this.selectedWards);
  }

  submit() {
    if (this.isEdit) {
      console.log(this.bursaryForm.value);
    } else {
      console.log('this.bursaryForm.value');

      let model = {
        email: this.bursaryForm.controls['email'].value,
        name: this.bursaryForm.controls['name'].value,
        idNo: this.bursaryForm.controls['idNo'].value,
        mobile: this.bursaryForm.controls['mobile'].value,
        password: 'qwerty',
      };

      let saveAssessor = this.httpService
        .postAuthReq('auth/users/county', model)
        .subscribe({
          next: (resp) => {
            console.log(resp);

            if (resp) {
              this.toastr.success(
                resp['message'],
                'County user created successfully'
              );
            } else {
              this.toastr.error(resp['message'], 'User not created');
            }
            this.bsModalRef.hide();
            // this.router.navigate(['/assessors/staged-assessors']);
          },
          error: (error) => {
            this.toastr.error(error, 'User not created');
            // Handle the error here
            // this.loading = false;
            // this.toastr.error(
            //   error['statusText'] || error['message'] || error.error['message'],
            //   'Assessor Not Staged'
            // );
            // this.getIndividualData(0);
          },
        });
    }
  }
}
