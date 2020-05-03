export class Cart {
  id: string;
  productName: string;
  author: string;
  numberInStock: number;
  toOrder: number;
  count: number;
  category: string;
  bookType: string;
  file: string;

  // tslint:disable-next-line:max-line-length
  constructor(id: string, productName: string, author: string, numberInStock: number, toOrder: number, count: number, category: string, bookType: string, file: string) {
    this.id = id;
    this.productName = productName;
    this.author = author;
    this.numberInStock = numberInStock;
    this.toOrder = toOrder;
    this.count = count;
    this.category = category;
    this.bookType = bookType;
    this.file = file;
  }
}
