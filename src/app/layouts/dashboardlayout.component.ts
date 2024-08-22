import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `<app-header></app-header>
            <app-sidebar></app-sidebar>
            <main id="main" class="main">
              <router-outlet></router-outlet>
            </main>
            <footer id="footer" class="footer mt-auto py-3">
              <div class="copyright">
                &copy; Copyright <strong><span>Truste Technology <a href="https://trustetechnology.com"><i class="bi bi-globe"></i></a></span></strong>. All Rights Reserved
              </div>
            </footer>
            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`,
  styles: [
    `
      .main {
        background-image: url('/assets/img/3611852.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        height: 100%;
      }

      .footer {
        text-align: center;
      }

      .pageTitle {
        background: white !important;
        padding: 0.5rem !important;
        border-radius: 8px !important;

        ol{
            margin-bottom: 0 !important;
        }
      }
    `,
  ],
})
export class DashboardLayoutComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
