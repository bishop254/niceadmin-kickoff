import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  userData: any;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.userData = {
      email: localStorage.getItem('email'),
      profile: localStorage.getItem('profile'),
      ward: localStorage.getItem('ward'),
    };
  }
  toggleSidebar() {
    const kl = 'toggle-sidebar';
    if (this.document.body.classList.contains(kl)) {
      this.document.body.classList.remove(kl);
    } else {
      this.document.body.classList.add(kl);
    }
  }
}
