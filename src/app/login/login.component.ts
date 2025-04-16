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

        if (resp['statusCode'] === 201) {
          localStorage.setItem('email', email);
          localStorage.setItem('token', resp['data']['token']);
          localStorage.setItem('profile', resp['data']['profile']);
          localStorage.setItem('ward', resp['data']['ward'] || '');

          this.toastr.success('Login Success');
          this.router.navigate(['dashboard']);

          return resp;
        } else {
          throwError(() => resp['message']);
        }
        this.isLoading = false;
      }),
      catchError((err) => {
        console.error(err);

        this.toastr.error(err['statusText'] ?? err['error']['message'], 'Login Failure');

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
