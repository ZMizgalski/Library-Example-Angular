import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Dialog2Component} from '../../2/dialog2/dialog2.component';
import {ShoppingCartService} from '../../../../User/servieces/Product/shopping-cart.service';


@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component implements OnInit {
  products = [];
  public cartService: ShoppingCartService;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(forwardRef(() => ShoppingCartService)) cartService,
              public dialog1: MatDialogRef<Dialog1Component>,
              private dialog: MatDialog) {
    this.cartService = cartService as ShoppingCartService;
    dialog1.disableClose = true;
  }

  ngOnInit() {
    this.cartService.orderedItems = this.cartService.cart;
  }

  checkout() {
    this.dialog.open(Dialog2Component, {
      height: '600px',
      width: ' 600px',
    });
    this.dialog1.close();
  }

  close() {
    // console.log(this.cartService.dialogCart);
    this.dialog1.close();
  }

  decrease(product: any) {
    if (product.toOrder > 1) {
      product.toOrder -= 1;
      this.cartService.orderedItems = this.cartService.cart;
    }
  }

  increase(product: any) {
    product.toOrder += 1;
    this.cartService.orderedItems = this.cartService.cart;
  }


  deleteProduct(id: number, product: any) {
    this.cartService.orderedItems.splice(id, 1);
    this.cartService.orderedItems = this.cartService.cart;
    product.toOrder = 1;

  }

}
