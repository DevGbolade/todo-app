import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = 'Tobi';
  toggleSearch: boolean = false;
  profile = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formatName();
  }
  formatName() {
    return this.name.length > 10 ? this.name.substr(0, 10) + '..' : this.name;
  }
  onToggleSearch() {
    this.toggleSearch = !this.toggleSearch;
  }

  displayProfile() {
    this.profile = !this.profile;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
