import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalServService } from './global-serv.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServService {
  private userRolesSource = new BehaviorSubject<any>([]);
  public userRoles$ = this.userRolesSource.asObservable();
  constructor(
    private http: HttpClient,
    private globalService: GlobalServService
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

  public getReq(endpoint: string): Observable<any> {
    return this.http.get(this.globalService.apiHost + endpoint);
  }

  public customerPostReq(endpoint: string, model: any): Observable<any> {
    return this.http.post(endpoint, model);
  }

  public postReqJwt(endpoint: string, model: any): Observable<Object> {
    return this.http.post(this.globalService.apiHost + endpoint, model);
  }
}
