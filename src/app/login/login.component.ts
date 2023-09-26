import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, throwError, catchError, of } from 'rxjs';
import { HttpServService } from '../shared/services/http-serv.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  loginResp$: Observable<any> = of({});

  constructor(
    private http: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submit() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    const model = {
      email: email,
      password: password,
    };

    this.loginResp$ = this.http.loginReq('auth/login', model).pipe(
      map((resp: any) => {
        console.log(resp);

        if (resp['status'] === 200) {
          // localStorage.setItem('access_token', resp['data']['access_token']);
          // localStorage.setItem('refresh_token', resp['data']['refresh_token']);
          localStorage.setItem('email', email);
          // localStorage.setItem('profile', resp['data']['profile']);
          // localStorage.setItem('roles', JSON.stringify(resp['data']['roles']));

          // if (resp['data']['firstTimeLogin'] == true) {
          //   this.router.navigate(['/auth/change-password']);
          // } else {
            this.toastr.success('Login Success');
              this.router.navigate(['/dashboard']);
          // this.getRoles(resp['data']['profile'], resp['data']['roles']);
          // }

          return resp;
        } else {
          // this.toastr.error(resp['message'], 'Login Failure');
          throwError(() => resp['message']);
        }
        this.isLoading = false;
      }),
      catchError((err) => {
        console.error(err);

        this.isLoading = false;
        if (err['error'] !== undefined) {
          // this.toastr.error(err['error']['message'], 'Login Failure');
        } else {
          // this.toastr.error(
          //   err['statusText']
          //     ? err['statusText']
          //     : err['message'] || err['error']['message'],
          //   'Login Failure'
          // );
        }
        return of({});
      })
    );
  }
}
