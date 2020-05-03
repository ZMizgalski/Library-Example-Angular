import {Component, OnInit} from '@angular/core';
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
export class AccountComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public loggedUser: any;
  private isLoggedIn = false;
  private dynValues;
  public contentLoaded = false;

  constructor(private breakpointObserver: BreakpointObserver, private tokenStorageService: TokenServiceService, private auth: AuthService) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    const token2 = this.tokenStorageService.getToken();
    const decodedToken = jwt_decode(token2);
    this.auth.getUserDynamicInfo(decodedToken.email).subscribe(x => {
      this.dynValues = x;
      const username = decodedToken.sub;
      this.contentLoaded = true;
      this.loggedUser = new User(decodedToken.email, username, this.dynValues.read, this.dynValues.bookedNow);
    }, error => {
      this.contentLoaded = false;
    });
    }


      ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        const token2 = this.tokenStorageService.getToken();
        const decodedToken = jwt_decode(token2);
        this.auth.getUserDynamicInfo(decodedToken.email).subscribe(x => {
          this.dynValues = x;
          const username = decodedToken.sub;
          this.contentLoaded = true;
          this.loggedUser = new User(decodedToken.email, username, this.dynValues.read, this.dynValues.bookedNow);
        });
    }



}
