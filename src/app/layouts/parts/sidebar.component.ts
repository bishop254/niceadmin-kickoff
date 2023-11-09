import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <app-sidebaritem [menuItems]="menuItems"></app-sidebaritem>
    </ul>
  </aside>`,
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];
  constructor() {}
  ngOnInit(): void {
    this.menuItems = [
      {
        title: 'Dashboard',
        link: '/dashboard',
        icon: 'bi bi-grid',
      },
      {
        title: 'Profile',
        link: '/user-profile',
        icon: 'bi bi-person',
      },
      // {
      //   title: "Blank Page",
      //   link: 'blank-page',
      //   icon: "bi bi-file-earmark",
      // },
      // {
      //   title: "Login",
      //   link: '/login',
      //   icon: "bi bi-box-arrow-in-right",
      // },
      {
        title: 'Bursaries',
        link: '',
        icon: 'bi bi-subtract',
        childs: [
          {
            title: 'List Bursaries',
            link: '/bursary/list-bursaries',
            icon: 'bi bi-circle',
          },
          // {
          //   title: "Blank Page",
          //   link: 'blank-page',
          //   icon: "bi bi-circle",
          // },
          // {
          //   title: "Login",
          //   link: '/login',
          //   icon: "bi bi-circle",
          // },
        ],
      },
      {
        title: 'County Management',
        link: '',
        icon: 'bi bi-file-earmark',
        childs: [
          {
            title: 'List Applications',
            link: '/bursary/students',
            icon: 'bi bi-circle',
          },
          // {
          //   title: "Blank Page",
          //   link: 'blank-page',
          //   icon: "bi bi-circle",
          // },
          // {
          //   title: "Login",
          //   link: '/login',
          //   icon: "bi bi-circle",
          // },
        ],
      },
      {
        title: 'Ward Management',
        link: '',
        icon: 'bi bi-file-earmark',
        childs: [
          {
            title: 'List Applications',
            link: '/bursary/students',
            icon: 'bi bi-circle',
          },
          {
            title: 'Ward Users',
            link: 'blank-page',
            icon: 'bi bi-circle',
          },
          // {
          //   title: "Login",
          //   link: '/login',
          //   icon: "bi bi-circle",
          // },
        ],
      },
    ];
  }
}
