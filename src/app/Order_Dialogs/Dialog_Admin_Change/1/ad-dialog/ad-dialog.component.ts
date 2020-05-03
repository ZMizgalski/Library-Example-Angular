import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditProductService} from '../../../../User/servieces/Product/edit-product.service';
import {AuthService} from '../../../../User/servieces/auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TokenServiceService} from '../../../../User/servieces/auth/token-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ad-dialog',
  templateUrl: './ad-dialog.component.html',
  styleUrls: ['./ad-dialog.component.css']
})
export class AdDialogComponent implements OnInit {

  editProductService: EditProductService;
  auth: AuthService;
  tokenService: TokenServiceService;
  private url: string;
  isLoggedIn = false;
  isProductEdited = false;


  constructor(private matDialog: MatDialog,
              private adDialog: MatDialogRef<AdDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(forwardRef(() => EditProductService)) editProductService,
              @Inject(forwardRef(() => AuthService)) auth,
              @Inject(forwardRef( () => TokenServiceService)) tokenService,
              private http: HttpClient,
              private matSnackBar: MatSnackBar,
  ) {
    this.tokenService = tokenService as TokenServiceService;
    adDialog.disableClose = true;
    this.editProductService = editProductService as EditProductService;
    this.auth = auth as AuthService;
    // this.url = 'http://localhost:8080/';
    this.url = '/';
  }

  increase(product: any) {
    return product.count += 1;
  }

  decrease(product: any) {
    if (product.count > 0) {
      return product.count -= 1;
    }
  }

  apply(product: any) {
    this.isProductEdited = true;
    this.editService(product)
      .subscribe((error: HttpErrorResponse) => {
        if (!error) {
          this.matSnackBar.open('Spróbuj ponownie!', 'Zamknij', {
            verticalPosition: 'top'
          });
          this.isProductEdited = false;
        } else {
          this.matSnackBar.open('Produkt został zaktualizowany!', 'Zamknij', {
            verticalPosition: 'top',
          });
          const scrollElem = document.querySelector('#moveTop');
          scrollElem.scrollIntoView();
          this.editProductService.clear();
          this.auth.productListed = true;
          this.adDialog.close();
          this.isProductEdited = false;
        }
      });
  }


  close() {
    this.adDialog.beforeClosed();
    this.editProductService.clear();
    this.adDialog.close();
  }


  editService(product: any): Observable<any> {
    if (product !== null) {
      const numberInStock = product.count;
      const id = product.id;
      const items = {id, numberInStock};

      return this.http.put(this.url + 'api/staff/updateProduct', items)
        .pipe(
          catchError(this.handleError()),
        );

    }

  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
  }

  private handleError<T>(result?: T) {
    // tslint:disable-next-line:no-shadowed-variable
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
