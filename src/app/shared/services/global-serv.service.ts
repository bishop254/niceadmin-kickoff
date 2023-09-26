import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalServService {

  apiHost: string;
  authHost: string;
  constructor() {
    this.apiHost = environment.base_url;
    this.authHost = environment.auth_url;
  }

  public static emailRegex: string =
    "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  public static nameRegex: string = "^[a-zA-Z-]{3,45}$";

  public static ipv4Regex: string =
    "^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$";

  public static strongPasswordRegex: string =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

  public static kenyanMobile: string = "^(2547\\d{8}|25411\\d{7}|07\\d{8}|011\\d{7})$";

  public getToken(): any {
    return localStorage.getItem("access_token");
  }

  public getUserProfile(): string | null {
    return localStorage.getItem("userType")
      ? localStorage.getItem("userType")
      : "";
  }
}
