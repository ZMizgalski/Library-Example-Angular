import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../servieces/auth/auth.service';
import {User} from '../servieces/User/user';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {TokenServiceService} from '../servieces/auth/token-service.service';
import * as jwt_decode from 'jwt-decode';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;

  user: User;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private tokenStorage: TokenServiceService, private matSnackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.minLength(3)],
      password: [null, Validators.minLength(8)],
      remember: [false, Validators.required]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.authService.logged.next(true);
      const token2 = this.tokenStorage.getToken();
      const decodedToken = jwt_decode(token2);
      this.roles = decodedToken.roles;
      this.router.navigate(['account']);
    }
  }

  onSubmit(value: any) {
    const username = this.registerForm.controls.username.value;
    const password = this.registerForm.controls.password.value;
    const remember = this.registerForm.controls.remember.value;

    const newForm = {username, password};
    this.authService.login(newForm).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token, remember);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        const token2 = this.tokenStorage.getToken();
        const decodedToken = jwt_decode(token2);
        this.roles = decodedToken.roles;
        this.authService.logged.next(this.isLoggedIn);
        this.matSnackBar.open('Zostałeś zalogowany', 'Zamknij', {
          verticalPosition: 'top'
        });
        this.reloadPage();
      },
      err => {
        this.authService.logged.next(null);
        this.errorMessage = err.error.message;
        this.matSnackBar.open('Zły email bądz hasło', 'Zamknij', {
          verticalPosition: 'top'
        });
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  saveData($event: MatCheckboxChange) {
    if ($event.checked) {
      this.registerForm.patchValue({remember: true});
    } else {
      this.registerForm.patchValue({remember: false});
    }

  }
}
