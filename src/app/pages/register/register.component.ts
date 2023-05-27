import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneNumberFormControl: FormControl;
  passwordFormControl: FormControl;
  usernameFormControl: FormControl;
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.phoneNumberFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{0,10}$/),
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]);
    this.usernameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-zA-Z0-9_-]+$/),
    ]);
  }

  restrictInputLength(event: any): void {
    const inputValue = event.target.value;
    if (inputValue.length > 10) {
      this.phoneNumberFormControl.setValue(inputValue.substring(0, 10));
    }
  }

  public user = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  };

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      alert('Username is required!');
      return;
    }
    if (this.user.firstname == '' || this.user.firstname == null) {
      this.snack.open('Firstname is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.lastname == '' || this.user.lastname == null) {
      this.snack.open('Lastname is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('Email is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.phone == '' || this.user.phone == null) {
      this.snack.open('Phone Number is required !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    //Adduser to Userservice
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //Success
        console.log(data);
        Swal.fire('Success', 'Welcome to our Community', 'success');
      },

      //Error
      (error) => {
        console.log(error);
        this.snack.open('Oops..Something went wrong !', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}
