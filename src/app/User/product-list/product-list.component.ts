import {ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../servieces/auth/auth.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AdDialogComponent} from '../../Order_Dialogs/Dialog_Admin_Change/1/ad-dialog/ad-dialog.component';
import {EditProductService} from '../servieces/Product/edit-product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';

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
  constructor(private changeDetectorRef: ChangeDetectorRef, public auth: AuthService, private matSnackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private editProductService: EditProductService) {
  }

  currentItemsToShow = [];
  isProductAdListLoaded = false;
  products = [];
  ld = false;
  @ViewChild('paginatorADP') paginator: MatPaginator;

  ngOnInit() {
    if (!this.isProductAdListLoaded) {
      this.auth.getAllProducts().subscribe(data => {
        this.products = data;
        this.isProductAdListLoaded = true;
        this.changeDetectorRef.detectChanges();
        this.ld = true;
        // tslint:disable-next-line:max-line-length
        this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
      });
    }
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
      this.matSnackBar.open('Produkt został usunięty', 'Zamknij', {
        verticalPosition: 'top'
      });
      this.changeDetectorRef.detectChanges();
      this.ld = false;
      this.currentItemsToShow = [];
      this.isProductAdListLoaded = false;
      this.auth.productListed = true;
      // tslint:disable-next-line:max-line-length
     //  this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
    });
  }

  ngDoCheck(): void {
    if (this.auth.productListed) {
      this.isProductAdListLoaded = false;
      if (!this.isProductAdListLoaded && this.ld) {
        this.auth.getAllProducts().subscribe(data => {
          this.products = data;
          this.isProductAdListLoaded = true;
          this.changeDetectorRef.detectChanges();
          // tslint:disable-next-line:max-line-length
          this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
        });
      }
      this.auth.productListed = false;
    }

  }

  onPageChange() {
    if ( this.isProductAdListLoaded) {
      this.changeDetectorRef.detectChanges();
      // tslint:disable-next-line:max-line-length
      this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);
    }
  }
}
