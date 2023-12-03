import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalServService } from './global-serv.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class HttpServService {
  private userRolesSource = new BehaviorSubject<any>([]);
  public userRoles$ = this.userRolesSource.asObservable();
  constructor(
    private http: HttpClient,
    private globalService: GlobalServService // public jwtHelper: JwtHelperService
  ) {}

  public updateRoles(roles: any) {
    this.userRolesSource.next(roles);
  }

  public loginReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.authHost + endpoint, model, {
      withCredentials: true,
    });
  }

  public postReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.apiHost + endpoint, model);
  }

  public postAuthReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(this.globalService.authHost + endpoint, model);
  }

  public getReq(endpoint: string): Observable<any> {
    return this.http.get(this.globalService.apiHost + endpoint);
  }

  public getAuthReq(endpoint: string): Observable<any> {
    return this.http.get(this.globalService.authHost + endpoint);
  }

  public getFileReq(endpoint: string): Observable<any> {
    return this.http.get(this.globalService.apiHost + endpoint, {
      responseType: 'blob',
    });
  }

  public customerPostReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(endpoint, model);
  }

  public postReqJwt(endpoint: string, model: any): Observable<Object> {
    return this.http.post(this.globalService.apiHost + endpoint, model);
  }

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
}
