import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../User/servieces/auth/auth.service';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../../User/servieces/Product/shopping-cart.service';
import {animate, state, style, transition, trigger, } from '@angular/animations';
import {PageFilterServieceService} from '../../User/servieces/pageFilter/page-filter-serviece.service';
import {TokenServiceService} from '../../User/servieces/auth/token-service.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [
    trigger('openClose', [

      state('open', style({
        opacity: 1,
        height: '100vh',
        display: 'sticky'
      })),
      state('closed', style({
        height: '0',
        opacity: '0.2',
        display: 'none',
        backgroundColor: 'transparent'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
    ]), ]
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 // public role: Role;
 // private isAdminNow: boolean;

  public card = [];
  isOpen = false;
  value: string;
  user: any;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;


  // tslint:disable-next-line:max-line-length
  constructor(private tokenStorageService: TokenServiceService, private breakpointObserver: BreakpointObserver, private auth: AuthService, public cartService: ShoppingCartService, public pageSer: PageFilterServieceService) {

  }

  closeSearch() {
    this.isOpen = false;
  }

  openSearch() {
    this.isOpen = true;
  }

  get cartItems() {
    if (!this.isProductThere()) {
      return this.cartService.cart = this.card;
    }
  }

  get cartItemsToCheckout() {
    if (!this.isProductThere()) {
      this.cartService.cart = this.card;
      return this.card.map(({id, toOrder, file, productName, author, }) => ({id, toOrder, file, productName, author, }));
    }
  }

  get calcTotalItemsInCart() {
    if (!this.isProductThere()) {
      let total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.card.map(product => product.toOrder).length; i++) {
        if (isNaN(this.card.map(product => product.toOrder)[i])) {
          continue;
        }
        total += Number(this.card.map(product => product.toOrder)[i]);
      }
      return total;
    }
  }

  isProductThere() {
    return this.card === null;
  }

  open(menu) {
    menu.openMenu();
  }

  deleteProduct(id: number, product: any) {
    this.cartService.deleteProductFromCart(id);
    product.toOrder = 1;
  }


  onKeyPress(event: any) {
    // tslint:disable-next-line:triple-equals
    if (event != 0) {
      this.openSearch();
    } else {
      this.closeSearch();
    }

  }


  clear(value: string) {
    this.closeSearch();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const token2 = this.tokenStorageService.getToken();
      const decodedToken = jwt_decode(token2);

      this.showAdminBoard = decodedToken.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = decodedToken.roles.includes('ROLE_MODERATOR');
    }
  }

  logout() {
    this.tokenStorageService.logout();
    window.location.reload();
  }
}
