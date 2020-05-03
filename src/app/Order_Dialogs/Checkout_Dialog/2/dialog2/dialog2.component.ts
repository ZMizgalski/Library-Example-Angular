import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ShoppingCartService} from '../../../../User/servieces/Product/shopping-cart.service';
import {Dialog1Component} from '../../1/dialog1/dialog1.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../../../User/servieces/auth/auth.service';
import {UserToOrder} from '../../../../User/servieces/User/user-to-order';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenServiceService} from '../../../../User/servieces/auth/token-service.service';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component implements OnInit {
  cartService: ShoppingCartService;
  auth: AuthService;
  tokenService: TokenServiceService;
  orderClicked = false;

  private userUrl: string;
  userToOrder: UserToOrder;
  private isLoggedIn = false;

  constructor(public dialog2: MatDialogRef<Dialog2Component>,
              @Inject(forwardRef(() => TokenServiceService)) tokenService,
              @Inject(forwardRef(() => ShoppingCartService)) cartService,
              @Inject(forwardRef(() => AuthService)) authService,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private http: HttpClient, ) {
    this.auth = authService as AuthService;
    this.tokenService = tokenService as TokenServiceService;
    dialog2.disableClose = true;
    this.cartService = cartService as ShoppingCartService;
    // this.userUrl = 'http://localhost:8080/';
    this.userUrl = '/';

    const token2 = this.tokenService.getToken();
    const decodedToken = jwt_decode(token2);
    const username = decodedToken.sub;
    this.userToOrder = new UserToOrder(decodedToken.email);
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
  }

  close() {
    this.dialog2.close();
  }


  GoBack() {
    this.dialog.open(Dialog1Component, {
      height: '600px',
      width: ' 600px',
    });
    this.dialog2.close();
  }

  CompleteOrder(orderItems: any[], email: string) {
    this.orderClicked = true;
    this.OrderService(orderItems, email)
      .subscribe((error: HttpErrorResponse) => {
        if (!error) {
          this.matSnackBar.open('Coś poszło nie tak', 'Zamknij', {
            verticalPosition: 'top'
          });
          this.orderClicked = false;
        } else {
          this.cartService.cart.length = 0;
          orderItems = [];
          this.matSnackBar.open('Zamówienie zostało utworzone', 'Zamknij', {
            verticalPosition: 'top'
          });
          this.cartService.orderCompleted = true;
          this.dialog2.close();
          this.router.navigate(['library']);
        }
      });
  }


  OrderService(orderItems: any[], userEmailFromOrder: string): Observable<any> {
    if (orderItems !== null && userEmailFromOrder !== null) {

      const orderedItems = orderItems.map(({id, toOrder, productName, author, }) => ({
        id,
        toOrder,
        productName,
        author
      }));
      const email = userEmailFromOrder;
      const newArrayOfOrderedItems = {email, orderedItems};
     // console.log(newArrayOfOrderedItems);
      return this.http.post(this.userUrl + 'api/staff/makeOrder', newArrayOfOrderedItems)
        .pipe(
          catchError(this.handleError())
        );
    }
  }

  private handleError<T>(result?: T) {
    // tslint:disable-next-line:no-shadowed-variable
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}


