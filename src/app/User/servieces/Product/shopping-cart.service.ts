import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Dialog1Component} from '../../../Order_Dialogs/Checkout_Dialog/1/dialog1/dialog1.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  orderedItems = [];
  cart = [];
  orderCompleted = false;

  constructor(private dialog: MatDialog) {

  }

  addProductToCard(product: any) {
    if (this.cart.includes(product)) {
      this.increaseCountByItem(product);
    } else {
      product.toOrder = product.count;
      this.cart.push(product);
      product.count = 1;
    }
  }

  increaseCountByItem(product: any) {
    if (product.count <= product.numberInStock - 1) {
      product.toOrder += product.count;
      product.count = 1;
    } else {
      product.toOrder += 1;
      product.count = 1;
    }
  }

  decrease(product: any) {
    if (product.toOrder > 1) {
      product.toOrder -= 1;
    }
  }

  deleteProductFromCart(id: number) {
    this.cart.splice(id, 1);
  }

  checkout(products: any) {
    // tslint:disable-next-line:variable-name
    const dialogRef_1 = this.dialog.open(Dialog1Component, {
      height: '600px',
      width: '600px',
    });
    this.orderedItems = products;
  }

  increaseCountOnProduct(product: any) {
    if (product.count <= product.numberInStock - 1) {
      product.count += 1;
    }
  }

  decreaseCountOnProduct(product: any) {
    if (product.count > 1) {
      product.count -= 1;
    }
  }


  increase(product: any) {
    if (product.toOrder <= product.numberInStock - 1) {
      product.toOrder += 1;
    }
  }


}

