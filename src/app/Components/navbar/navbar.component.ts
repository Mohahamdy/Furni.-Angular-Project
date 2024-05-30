import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token: any = localStorage.getItem('token');
  // userName: any;

  constructor(private router: Router, private athuService: AuthService) {}
  ngOnInit(): void {
    console.log(this.athuService.getUserName()?.split(' ')[0]);
    // this.userName = this.athuService.getUserName()?.split(' ')[0];
  }

  async logout() {
    this.athuService.logOut();
    await Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Logged Out. See you soon',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigateByUrl('/');
  }

  isLogedIn(): boolean {
    return this.athuService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.athuService.isAdmin();
  }

  getUserName(): string | undefined {
    return this.athuService.getUserName()?.split(' ')[0];
  }
}
