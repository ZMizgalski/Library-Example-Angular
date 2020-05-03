import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../servieces/auth/auth.service';
import {User} from '../servieces/User/user';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {TokenServiceService} from '../servieces/auth/token-service.service';
import * as jwt_decode from 'jwt-decode';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, DoCheck {
  orders = [];
  public user: User;
  private deleted = false;
  noOrders = false;
  orderIsBusy = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public loggedUser: any;
  private isLoggedIn = false;
  public ordersLoaded = false;
  // tslint:disable-next-line:max-line-length
  constructor(private matSnackBar: MatSnackBar, private auth: AuthService, private breakpointObserver: BreakpointObserver, private tokenStorageService: TokenServiceService) {
  }

  ngOnInit() {
  this.isLoggedIn = !!this.tokenStorageService.getToken();
  if (this.isLoggedIn) {
      const token2 = this.tokenStorageService.getToken();
      const decodedToken = jwt_decode(token2);
      const username = decodedToken.sub;
      this.loggedUser = new User(decodedToken.email, username, decodedToken.read, decodedToken.bookedNow);
      this.auth.getAllOrdersByEmail(this.loggedUser.email).subscribe(data => {
        this.orders = data;
        this.ordersLoaded = true;
      });
    }
  }

  deleteOrder(id: any) {
    this.orderIsBusy = true;
    this.ordersLoaded = false;
    this.auth.deleteOrder(id).subscribe(s => {
      this.deleted = true;
      this.matSnackBar.open('Zamówienie zostało usunięte', 'Zamknij', {
        verticalPosition: 'top'
      });
      this.orderIsBusy = false;
    });
  }

  ngDoCheck(): void {
    if (this.isLoggedIn) {
      if (this.orders.length !== 0) {
        this.noOrders = false;
        if (this.deleted) {

          const token2 = this.tokenStorageService.getToken();
          const decodedToken = jwt_decode(token2);
          this.loggedUser = new User(decodedToken.email, decodedToken.sub, decodedToken.read, decodedToken.bookedNow);
          this.auth.getAllOrdersByEmail(this.loggedUser.email).subscribe(data => {
            this.orders = data;
            this.deleted = false;
            this.ordersLoaded = true;
          });
        }
      } else {
        this.noOrders = true;
        return;
      }
    }
  }

}
