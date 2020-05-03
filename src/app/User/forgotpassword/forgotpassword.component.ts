import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../servieces/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  emailFormControl: FormGroup;
  errorMessage = '';


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.emailFormControl = this.formBuilder.group({
      email: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.authService.ForgotPassword(form)
      .subscribe(
        _ => {
        this.matSnackBar.open('Email został wysłany', 'Zamknij', {
          verticalPosition: 'top'
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.matSnackBar.open('Zły email', 'Zamknij', {
          verticalPosition: 'top'
        });
      });
  }
}
