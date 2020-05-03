import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  products = [];

  constructor() {

  }

  clear() {
    this.products = [];
  }


}
