import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../servieces/auth/auth.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AdDialogComponent} from '../../Order_Dialogs/Dialog_Admin_Change/1/ad-dialog/ad-dialog.component';
import {EditProductService} from '../servieces/Product/edit-product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService, private matSnackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private editProductService: EditProductService) {
  }

  isProductAdListLoaded = false;
  products = [];

  ngOnInit() {
    this.isProductAdListLoaded = false;
    this.getProductList();
  }


  getProductList() {
    this.auth.getAllProducts().subscribe(data => {
      this.products = data;
      this.isProductAdListLoaded = true;
    });
  }

  edit(product: any) {
    this.dialog.open(AdDialogComponent, {
      height: '200px',
      width: '250px'
    });
    this.editProductService.products.push(product);
    product.count = product.numberInStock;
  }

  deleteProduct(id: string) {
    this.auth.deleteProduct(id).subscribe(s => {
      const scrollElem = document.querySelector('#moveTop');
      scrollElem.scrollIntoView();
      this.auth.productListed = true;
      this.matSnackBar.open('Produkt został usunięty', 'Zamknij', {
        verticalPosition: 'top'
      });
      this.isProductAdListLoaded = false;
    });
  }

  ngDoCheck(): void {
    if (this.auth.productListed) {
      this.isProductAdListLoaded = false;
      this.getProductList();
      this.auth.productListed = false;
    }

  }
}
