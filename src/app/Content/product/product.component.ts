import {ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../User/servieces/auth/auth.service';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../../User/servieces/Product/shopping-cart.service';
import {Cart} from '../../User/servieces/Product/cart';
import {FilterServieceService} from '../../User/servieces/auth/filter-serviece.service';
import {TokenServiceService} from '../../User/servieces/auth/token-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, DoCheck {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  products = [];
  public card = [];

  isLoggedIn = false;
  public productsLoaded = false;
  ld = false;
  @ViewChild('paginator') paginator: MatPaginator;

  // tslint:disable-next-line:max-line-length
  constructor(private changeDetectorRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private tokenStorageService: TokenServiceService, private matSnackBar: MatSnackBar, public auth: AuthService, private router: Router, public cartService: ShoppingCartService, public filterService: FilterServieceService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.auth.productsLoadedVal) {
      this.auth.productsLoadedVal = false;
    }
    if (this.ld) {
      this.ld = false;
    }
    if (!this.productsLoaded) {
      this.auth.getAllProducts().subscribe(data => {
        this.products = data;
        this.productsLoaded = true;
        this.auth.productsLoadedVal = true;
        this.ld = true;
        this.changeDetectorRef.detectChanges();
        // tslint:disable-next-line:max-line-length
        // this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
      });
    }
  }

  ngDoCheck(): void {
    if (!this.productsLoaded && this.cartService.orderCompleted && this.ld) {
      this.auth.getAllProducts().subscribe(data => {
        this.products = data;
        this.productsLoaded = true;
        this.ld = false;
        // tslint:disable-next-line:max-line-length
        // this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
      });
    }
  }


  addToCard(product: any) {
    if (product.numberInStock === 0) {
      return true;
    } else if (!this.isLoggedIn) {
      this.matSnackBar.open('Aby wypożyczać książki musisz być zalogowany!', 'Zamknij', {
        verticalPosition: 'top'
      });
      this.router.navigate(['login']);
    } else if (this.onlyOne(product)) {
      this.cartService.addProductToCard(product);
    } else if (product.numberInStock <= product.toOrder) {
      return false;
    } else {
      this.matSnackBar.open('Dodano produkt do koszyka', 'Zamknij', {
        verticalPosition: 'top'
      });
      this.cartService.addProductToCard(product);
    }
  }

  onlyOne(product: Cart) {
    return product.toOrder + product.count + product.numberInStock === 3 && !this.cartService.cart.includes(product);
  }
}
