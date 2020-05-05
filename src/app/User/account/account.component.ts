import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {User} from '../servieces/User/user';
import {TokenServiceService} from '../servieces/auth/token-service.service';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from '../servieces/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, DoCheck {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public loggedUser: any;
  private isLoggedIn = false;
  private dynValues;
  public contentLoaded = false;
  ld = false;

  constructor(private breakpointObserver: BreakpointObserver, private tokenStorageService: TokenServiceService, private auth: AuthService) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.contentLoaded) {
      const token2 = this.tokenStorageService.getToken();
      const decodedToken = jwt_decode(token2);
      this.auth.getUserDynamicInfo(decodedToken.email).subscribe(x => {
        this.dynValues = x;
        const username = decodedToken.sub;
        this.contentLoaded = true;
        this.ld = true;
        this.loggedUser = new User(decodedToken.email, username, this.dynValues.read, this.dynValues.bookedNow);
      }, error => {
        this.contentLoaded = false;
        this.ld = false;
      });
    }
  }

  ngDoCheck(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.contentLoaded && this.ld) {
      const token2 = this.tokenStorageService.getToken();
      const decodedToken = jwt_decode(token2);
      this.auth.getUserDynamicInfo(decodedToken.email).subscribe(x => {
        this.dynValues = x;
        const username = decodedToken.sub;
        this.contentLoaded = true;
        this.ld = false;
        this.loggedUser = new User(decodedToken.email, username, this.dynValues.read, this.dynValues.bookedNow);
      }, error => {
        this.contentLoaded = false;
        this.ld = true;
      });
    }
  }


}
