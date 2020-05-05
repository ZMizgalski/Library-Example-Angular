import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../servieces/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username : [null, Validators.minLength(3)],
      email : [null, Validators.email],
      password : [null, Validators.minLength(8)],
      roles: [['user'], Validators.required],
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.register(form)
      .subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
          this.matSnackBar.open('You have been registered', 'Zamknij', {
            verticalPosition: 'top'
          });
        },
        err => {
          this.errorMessage = err.error.message;
          this.matSnackBar.open('Coś poszło nie tak', 'Zamknij', {
            verticalPosition: 'top'
          });
          this.isSignUpFailed = true;
        }
      );
  }
}
