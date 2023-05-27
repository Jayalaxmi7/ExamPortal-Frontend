import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  loginData = {
    username: '',
    password: '',
  };

  formSubmit() {
    console.log('login successful');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    //Request server to generate-token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });
        console.log('Sucess');
        console.log(data);
        //Login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user) => {
          this.login.setUser(user);
          console.log(user);

          //Redirect-- ADMIN : admin-Dashboard
          //Redirect-- NORMAL USER : Normaluser-Dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //Admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //User dashboard
            //  window.location.href = 'user';
            this.router.navigate(['user/0']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
            //location.reload();
          }
        });
      },
      (error) => {
        console.log('Error');
        console.log(error);
        this.snack.open('Invalid Credentials', '', {
          duration: 2000,
        });
      }
    );
  }
}
