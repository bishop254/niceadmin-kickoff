import { Component, OnInit } from '@angular/core';
import { HttpServService } from '../shared/services/http-serv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  studCount: number = 0;
  constructor(private httpServ: HttpServService) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.httpServ.getReq('bursary/dashboard').subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.studCount = resp;
      },
    });
  }
}
