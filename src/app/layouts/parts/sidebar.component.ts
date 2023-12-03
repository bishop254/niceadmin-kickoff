import { Component, OnInit } from '@angular/core';
import { GlobalServService } from 'src/app/shared/services/global-serv.service';

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
  constructor(private globalServ: GlobalServService) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        title: 'Dashboard',
        link: '/dashboard',
        icon: 'bi bi-grid',
      },
      // {
      //   title: 'Profile',
      //   link: '/user-profile',
      //   icon: 'bi bi-person',
      // },

      {
        title: 'Ministry Management',
        link: '',
        icon: 'bi bi-file-earmark',
        prof: ['MINISTRY'],
        childs: [
          {
            title: 'List County Approved Applications',
            link: '/bursary/all-county-appr-students',
            icon: 'bi bi-circle',
          },
          {
            title: 'List County Bulk Approvals',
            link: '/bursary/list-bulk-approvals',
            icon: 'bi bi-circle',
          },
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
        prof: ['COUNTY'],
        childs: [
          {
            title: 'List Approved Applications',
            link: '/bursary/all-students',
            icon: 'bi bi-circle',
          },
          {
            title: 'List Bulk Approvals',
            link: '/bursary/list-bulk-approvals',
            icon: 'bi bi-circle',
          },
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
        prof: ['MINISTRY'],
        childs: [
          {
            title: 'County Users',
            link: '/bursary/county-users',
            icon: 'bi bi-circle',
          },
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
        prof: ['WARD'],
        childs: [
          {
            title: 'List Applications',
            link: '/bursary/students',
            icon: 'bi bi-circle',
          },
        ],
      },
      {
        title: 'Ward Management',
        link: '',
        icon: 'bi bi-file-earmark',
        prof: ['COUNTY'],
        childs: [
          {
            title: 'List Ward Applications',
            link: '/bursary/all-students-cm',
            icon: 'bi bi-circle',
          },
          {
            title: 'Ward Users',
            link: '/bursary/ward-users',
            icon: 'bi bi-circle',
          },
        ],
      },
      {
        title: 'Ward Management',
        link: '',
        icon: 'bi bi-file-earmark',
        prof: ['MINISTRY'],
        childs: [
          {
            title: 'List Ward Applications',
            link: '/bursary/all-students-cm',
            icon: 'bi bi-circle',
          },
        ],
      },
    ];

    let profile = this.globalServ.getUserProfile();

    this.menuItems = this.menuItems.map((item: any) => {
      if (item['prof'] !== undefined) {
        if (item['prof'].includes(profile)) {
          return item;
        }
      } else {
        return item;
      }
    });

    this.menuItems = this.menuItems.filter((item: any) => item !== undefined);

    console.log(this.menuItems);
  }
}
