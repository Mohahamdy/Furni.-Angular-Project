import { AccountService } from './../../Services/account.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  token: any;
  showError: boolean = false;
  constructor(public accountService: AccountService, public router: Router) {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get getEmail() {
    return this.userForm.controls['email'];
  }

  get getPassword() {
    return this.userForm.controls['password'];
  }

  FormHandle() {
    if (this.userForm.status == 'VALID') {
      this.accountService
        .login(this.getEmail.value, this.getPassword.value)
        .subscribe({
          next: async (data) => {
            this.token = data.token;
            localStorage.setItem('token', this.token);
            await Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'You are logged in successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigateByUrl('/');
          },
          error: async (error) => {
            console.log(error);
            await Swal.fire({
              icon: 'error',
              title: 'Invalid',
              text: 'Wrong Email or Password !!!',
            });
          },
        });
    }
  }
}
