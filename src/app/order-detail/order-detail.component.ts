import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { Product } from '../model/product';
import { OrderService } from '../order.service';
// import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {
   @Input() products: Product[];
   @Output() checkoutTotal = new EventEmitter<number>();
  constructor(private orderService: OrderService) { }
  newProduct: Product;
  total = 0;

 // definition
  ngOnInit() {
    console.log(this.products);
   // this.getTotal();
  }
  addOne(product: Product): void {
    product.quantity++;
    this.total += product.price;
    // this.getTotal();
  }
  removeOne(product: Product): void {
    product.quantity--;
    this.total -= product.price;
    // this.getTotal();
  }
  removeProduct(product: Product): void {
    const indexOfProduct = this.products.indexOf(product);
    // this.products.splice(indexOfProduct, 1);
    this.products = this.products.filter(x => x.name !== product.name);
    this.total -= product.price * product.quantity;
    // this.getTotal();
  }

  

}
